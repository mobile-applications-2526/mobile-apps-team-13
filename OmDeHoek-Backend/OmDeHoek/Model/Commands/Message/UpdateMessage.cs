using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.Commands.Message;

public record UpdateMessage(Guid Id, string Title, string Content, MessageSeverity? Severity = null);