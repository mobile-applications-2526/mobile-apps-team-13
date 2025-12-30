using OmDeHoek.Model;
using OmDeHoek.Model.Commands.Message;
using OmDeHoek.Model.DTO.Message;
using OmDeHoek.Model.Entities;
using OmDeHoek.Model.Enums;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Services;

public class MessageService(
    UnitOfWork uow,
    TokenService tokenService
)
{
    public async Task<MessageDto> PostMessage(string token, PostMessage message)
    {
        await uow.StartTransaction();
        try
        {
            var userId = tokenService.GetUserIdFromToken(token);

            var user = await uow.UserRepository.GetByIdAsync(userId);

            if (user is null) throw new UnauthorizedException("User not found", "User");

            var buurt = await uow.BuurtRepository.GetByStatistischeSectorCodeAsync(message.NeighborhoodCode);
            if (buurt is null)
                throw new ResourceNotFoundException($"Neighborhood with Id {message.NeighborhoodCode} does not exist.",
                    "NeighborhoodCode");

            var newMessage = new Message
            {
                Buurt = buurt,
                CreatedAt = DateTime.UtcNow,
                Content = message.Content,
                User = user,
                Severity = message.Severity,
                BuurtSectorCode = buurt.StatistischeSectorCode,
                UserId = userId,
                Title = message.Title
            };

            // voor notifications
            var ontvangendeBuurten = new HashSet<string> {buurt.StatistischeSectorCode};

            if (!message.NeighborhoodOnly)
            {
                var deelgemeente = await uow.DeelgemeenteRepository.GetByNis6Async(buurt.Nis6DeelGemeente);
                if (deelgemeente is null)
                    throw new ResourceNotFoundException($"Borough with Nis6 {buurt.Nis6DeelGemeente} does not exist",
                        "deelgemeenteId");
                foreach (var b in deelgemeente.Buurten) ontvangendeBuurten.Add(b.StatistischeSectorCode);

                newMessage.Nis6DeelGemeente = deelgemeente.Nis6Code;
                newMessage.DeelGemeente = deelgemeente;
            }

            // voor notifications
            /*
            var eventName = severity switch
            {
                MessageSeverity.Informational => "ReceiveInformationalMessage",
                MessageSeverity.Warning => "ReceiveWarningMessage",
                MessageSeverity.Critical => "ReceiveCriticalMessage",
                _ => throw new InvalidInputException("Invalid message severity", "Severity")
            };
            */

            var savedMessage = await uow.MessageRepository.Insert(newMessage);

            await uow.Save();
            await uow.CommitTransaction();

            return new MessageDto(savedMessage);
        }
        catch (Exception ex)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    public async Task<List<MessageDto>> GetFeedMessages(
        string token, 
        int page, 
        int pageSize, 
        string? postcode,
        string? buurtSectorCode,
        bool includeInformational,
        bool includeWarning,
        bool includeCritical
        )
    {
        var userId = tokenService.GetUserIdFromToken(token);

        var user = await uow.UserRepository.GetByIdAsync(userId);

        if (user is null) throw new UnauthorizedException("User not found", "User");

        if (page < 0) throw new InvalidInputException("Page must be greater than or equal to 0", "Page");
        if (pageSize <= 0) throw new InvalidInputException("PageSize must be greater than 0", "PageSize");

        if (postcode is not null)
        {
            var postcodeGemeente = (await uow.GemeenteRepository.SearchByPostCodeAsync(postcode)).FirstOrDefault();
            if (postcodeGemeente is null)
                throw new ResourceNotFoundException($"No gemeente found with postcode {postcode}", "Postcode");
        }

        if (buurtSectorCode is not null)
        {
            var buurt = await uow.BuurtRepository.GetByStatistischeSectorCodeAsync(buurtSectorCode);
            if (buurt is null)
                throw new ResourceNotFoundException($"No buurt found with sector code {buurtSectorCode}",
                    "BuurtSectorCode");
        }
        
        List<MessageSeverity> allowedSeverities = new();
        if (includeInformational) allowedSeverities.Add(MessageSeverity.Informational);
        if (includeWarning) allowedSeverities.Add(MessageSeverity.Warning);
        if (includeCritical) allowedSeverities.Add(MessageSeverity.Critical);

        var messages =
            await uow.MessageRepository.GetFeedMessagesAsync(page, pageSize, userId, postcode, buurtSectorCode, allowedSeverities);

        return messages.Select(m => new MessageDto(m, m.LikedBy.Any(lb => lb.UserId == userId && lb.IsLiked))).ToList();
    }

    public async Task<MessageReactionDto> RespondToMessage(string token, RespondToMessage response)
    {
        try
        {
            await uow.StartTransaction();
            var userId = tokenService.GetUserIdFromToken(token);
            var user = await uow.UserRepository.GetByIdAsync(userId);
            if (user is null) throw new UnauthorizedException("User not found", "User");

            var message = await uow.MessageRepository.GetById(response.MessageId);
            if (message is null)
                throw new ResourceNotFoundException($"Message with Id {response.MessageId} does not exist.",
                    "MessageId");

            var reaction = new MessageReaction
            {
                MessageId = response.MessageId,
                UserId = userId,
                Reaction = response.Content,
                CreatedAt = DateTime.UtcNow
            };

            var savedReaction = await uow.MessageReactionRepository.Insert(reaction);
            await uow.Save();
            await uow.CommitTransaction();
            return new MessageReactionDto(savedReaction);
        }
        catch (Exception e)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    public async Task<MessageDto> LikeMessage(string token, Guid messageId)
    {
        try
        {
            await uow.StartTransaction();
            var userId = tokenService.GetUserIdFromToken(token);
            var user = await uow.UserRepository.GetByIdAsync(userId);
            if (user is null) throw new UnauthorizedException("User not found", "User");

            var message = await uow.MessageRepository.GetById(messageId);
            if (message is null)
                throw new ResourceNotFoundException($"Message with Id {messageId} does not exist.", "MessageId");

            var existingLike = await uow.UserLikedPostRepository.GetUserLikeStatusAsync(userId, messageId);
            if (existingLike is null)
            {
                var like = new UserLikedPost
                {
                    UserId = userId,
                    PostId = messageId,
                    IsLiked = true
                };

                await uow.UserLikedPostRepository.Insert(like);
                await uow.Save();
                await uow.CommitTransaction();
                return new MessageDto(message);
            }

            existingLike.IsLiked = !existingLike.IsLiked;
            uow.UserLikedPostRepository.Update(existingLike);
            await uow.Save();
            await uow.CommitTransaction();
            return new MessageDto(message);
        }
        catch (Exception e)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }
    
    public async Task<List<MessageDto>> GetMessagesByUser(string token, int pageSize = 20, int page = 0)
    {
        var userId = tokenService.GetUserIdFromToken(token);

        var user = await uow.UserRepository.GetByIdAsync(userId);

        if (user is null) throw new UnauthorizedException("User not found", "User");

        var messages = await uow.MessageRepository.GetMessagesByUserIdAsync(userId, page, pageSize);

        return messages.Select(m => new MessageDto(m, m.LikedBy.Any(lb => lb.UserId == userId && lb.IsLiked))).ToList();
    }
    
    public async Task<MessageDto> GetMessageById(Guid messageId, string token){
        
        var userId = tokenService.GetUserIdFromToken(token);

        var message = await uow.MessageRepository.GetMessageByIdAsync(messageId);

        if (message is null)
            throw new ResourceNotFoundException($"Message with Id {messageId} does not exist.", "MessageId");

        return new MessageDto(message, message.LikedBy.Any(lb => lb.UserId == userId && lb.IsLiked));
    }

    public async Task<MessageDto> UpdateMessage(string token, UpdateMessage updateMessage)
    {
        var userId = tokenService.GetUserIdFromToken(token);
        var message = await uow.MessageRepository.GetById(updateMessage.Id);
        
        if (message is null)
            throw new ResourceNotFoundException($"Message with Id {updateMessage.Id} does not exist.", "MessageId");
        if (message.UserId != userId)
            throw new ForbiddenActionException("User is not the owner of the message", "User");

        try
        {
            await uow.StartTransaction();
            
            message.Content = string.IsNullOrWhiteSpace(updateMessage.Content) ? message.Content : updateMessage.Content;
            message.Title = string.IsNullOrWhiteSpace(updateMessage.Title) ? message.Title : updateMessage.Title;
            message.Severity = updateMessage.Severity ?? message.Severity;
            
            uow.MessageRepository.Update(message);
            
            await uow.Save();
            await uow.CommitTransaction();
            
            return new MessageDto(message);
        }
        catch (Exception)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }

    public async Task DeleteMessage(string token, Guid messageId)
    {
        var userId = tokenService.GetUserIdFromToken(token);
        var message = await uow.MessageRepository.GetById(messageId);
        
        if (message is null)
            throw new ResourceNotFoundException($"Message with Id {messageId} does not exist.", "MessageId");
        if (message.UserId != userId)
            throw new ForbiddenActionException("User is not the owner of the message", "User");

        try
        {
            await uow.StartTransaction();
            
            uow.MessageRepository.Delete(message);
            
            await uow.Save();
            await uow.CommitTransaction();
        }
        catch (Exception)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }
}