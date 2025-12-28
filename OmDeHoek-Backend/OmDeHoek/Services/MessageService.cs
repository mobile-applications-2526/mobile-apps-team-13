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

            if (!Enum.TryParse(message.Severity, out MessageSeverity severity))
                throw new InvalidInputException(
                    "Message severity has to be one of the following: \"Informational\",\"Warning\", \"Critical\"",
                    "Severity");

            var newMessage = new Message
            {
                Buurt = buurt,
                CreatedAt = DateTime.UtcNow,
                Content = message.Content,
                User = user,
                Severity = severity,
                BuurtSectorCode = buurt.StatistischeSectorCode,
                UserId = userId,
                Title = message.Title
            };
            
            // voor notifications
            var ontvangendeBuurten = new HashSet<string> { buurt.StatistischeSectorCode };
            
            if (!message.NeighborhoodOnly)
            {
                var deelgemeente = await uow.DeelgemeenteRepository.GetByNis6Async(buurt.Nis6DeelGemeente);
                if (deelgemeente is null)
                    throw new ResourceNotFoundException($"Borough with Nis6 {buurt.Nis6DeelGemeente} does not exist",
                        "deelgemeenteId");
                foreach (var b in deelgemeente.Buurten)
                {
                    
                    ontvangendeBuurten.Add(b.StatistischeSectorCode);
                }
                
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

    public async Task<List<MessageDto>> GetFeedMessages(string token, int page, int pageSize, string? postcode, string? buurtSectorCode)
    {
        var userId = tokenService.GetUserIdFromToken(token);

        var user = await uow.UserRepository.GetByIdAsync(userId);

        if (user is null) throw new UnauthorizedException("User not found", "User");

        if (page < 0) throw new InvalidInputException("Page must be greater than or equal to 0", "Page");
        if (pageSize <= 0) throw new InvalidInputException("PageSize must be greater than 0", "PageSize");

        if (postcode is not null)
        {
            var postcodeGemeente = (await uow.GemeenteRepository.SearchByPostCodeAsync(postcode)).FirstOrDefault();
            if (postcodeGemeente is null) throw new ResourceNotFoundException($"No gemeente found with postcode {postcode}", "Postcode");
        }
        
        if (buurtSectorCode is not null)
        {
            var buurt = await uow.BuurtRepository.GetByStatistischeSectorCodeAsync(buurtSectorCode);
            if (buurt is null) throw new ResourceNotFoundException($"No buurt found with sector code {buurtSectorCode}", "BuurtSectorCode");
        }
        
        var messages = await uow.MessageRepository.GetFeedMessagesAsync(page, pageSize, userId, postcode, buurtSectorCode);
        
        return messages.Select(m => new MessageDto(m)).ToList();
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
            if (message is null) throw new ResourceNotFoundException($"Message with Id {response.MessageId} does not exist.", "MessageId");
            
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
            if (message is null) throw new ResourceNotFoundException($"Message with Id {messageId} does not exist.", "MessageId");

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
}