namespace OmDeHoek.Model.Commands.Message;

public class RespondToMessage
{
    public Guid MessageId { get; set; }
    public string Content { get; set; }
    
    public RespondToMessage(Guid messageId, string content)
    {
        MessageId = messageId;
        Content = content;
    }
    
    public RespondToMessage()
    {
        
    }
}