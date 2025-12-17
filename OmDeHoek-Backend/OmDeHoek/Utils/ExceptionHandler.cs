using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.Exceptions;

namespace OmDeHoek.Utils;

public static class ExceptionHandler
{
    public static ActionResult HandleException(Exception e)
    {
        ConsoleUtils.LogException(e);
        if (e is IServiceException returnableException)
        {
            return returnableException.ToActionResult();
        }
        return new ObjectResult("An unexpected error occurred.")
        {
            StatusCode = 500,
            Value = new 
            {
                errorMessage = e.Message,
            }
        };
    }
}