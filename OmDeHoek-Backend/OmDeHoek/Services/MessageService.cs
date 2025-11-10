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

            if (user is null)
            {
                throw new UnauthorizedException("User not found", "User");
            }

            var buurt = await uow.BuurtRepository.GetByStatistischeSectorCodeAsync(message.BuurtCode);
            if (buurt is null)
            {
                throw new ResourceNotFoundException($"Buurt met Id {message.BuurtCode} bestaat niet", "buurtId");
            }

            if (!Enum.TryParse(message.Severity, out MessageSeverity severity))
            {
                throw new InvalidInputException(
                    "Message severity has to be one of the following: \"Informational\",\"Warning\", \"Critical\"",
                    "Severity");
            }

            var newMessage = new Message()
            {
                Buurt = buurt,
                CreatedAt = DateTime.UtcNow,
                Content = message.Content,
                User = user,
                Severity = severity,
                BuurtSectorCode = buurt.StatistischeSectorCode,
                UserId = userId
            };

            var ontvangendeBuurten = new HashSet<string> { buurt.StatistischeSectorCode };
            if (!message.BuurtOnly)
            {
                var deelgemeente = await uow.DeelgemeenteRepository.GetByNis6Async(buurt.Nis6DeelGemeente);
                if (deelgemeente is null)
                {
                    throw new ResourceNotFoundException($"Deelgemeente met Nis6 {buurt.Nis6DeelGemeente} bestaat niet", "deelgemeenteId");
                }
                foreach (Buurt b in deelgemeente.Buurten)
                {
                    ontvangendeBuurten.Add(b.StatistischeSectorCode);
                }
            }

            var eventName = severity switch
            {
                MessageSeverity.Informational => "ReceiveInformationalMessage",
                MessageSeverity.Warning => "ReceiveWarningMessage",
                MessageSeverity.Critical => "ReceiveCriticalMessage",
                _ => throw new InvalidInputException("Invalid message severity", "Severity")
            };

            var savedMessage = await uow.MessageRepository.Insert(newMessage);
            await uow.CommitTransaction();

            return new MessageDto(savedMessage);
        }
        catch (Exception ex)
        {
            await uow.RollbackTransaction();
            throw;
        }
    }
}