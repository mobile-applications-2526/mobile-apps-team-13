using OmDeHoek.Model.Enums;

namespace OmDeHoek.Model.Commands.Message;

public class PostMessage
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public MessageSeverity Severity { get; set; }
    public string NeighborhoodCode { get; set; } = string.Empty;
    public bool NeighborhoodOnly { get; set; } = true;
}