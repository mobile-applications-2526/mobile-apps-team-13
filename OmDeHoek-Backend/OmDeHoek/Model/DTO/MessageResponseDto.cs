namespace OmDeHoek.Model.DTO;

public class MessageResponseDto
{
    public string Message { get; set; } = string.Empty;
    
    public MessageResponseDto(string message)
    {
        Message = message;
    }
    
    public MessageResponseDto(){}
}