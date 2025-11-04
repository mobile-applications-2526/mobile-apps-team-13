namespace OmDeHoek.Model.Commands.Message;

public class PostMessage
{
    public string Content { get; set; } = string.Empty;
    public string Severity { get; set; } = string.Empty;
    public string BuurtCode { get; set; } = string.Empty;
    public bool BuurtOnly { get; set; } = true;
}