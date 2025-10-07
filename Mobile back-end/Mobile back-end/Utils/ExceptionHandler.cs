using Microsoft.AspNetCore.Mvc;
using Mobile_back_end.Model.Exceptions;

namespace Mobile_back_end.Utils;

public static class ExceptionHandler
{
    public static ActionResult HandleException(Exception e)
    {
        ConsoleUtils.LogException(e);
        if (e is IServiceException returnableException)
        {
            return returnableException.ToActionResult();
        }
        return new ObjectResult("An unexpected error occurred.") { StatusCode = 500 };
    }
}