using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Utils;

namespace OmDeHoek.Model.Exceptions;

public class ServiceException : Exception, IServiceException
{
    private string Field { get; set; }
    private int StatusCode { get; set; }

    protected ServiceException(string message, string field, int statusCode) : base(message)
    {
        Field = field;
        StatusCode = statusCode;
        ConsoleUtils.LogException(this);
    }

    public override string ToString()
    {
        return $"{this.GetType().Name}: {Message}, \nField: {Field}, \nStatusCode: {StatusCode}";
    }

    public ActionResult ToActionResult()
    {
        var problemDetails = new ProblemDetails
        {
            Title = this.GetType().Name,
            Detail = this.Message,
            Status = this.StatusCode,
            Extensions = { { "field", this.Field }, {"message", this.Message} }
        };
        return new ObjectResult(problemDetails) { StatusCode = this.StatusCode };
    }
}

public class UnauthorizedException(string message, string field) : ServiceException(message, field, 401);

public class ForbiddenActionException(string message, string field) : ServiceException(message, field, 403);

public class MissingDataException(string message, string field) : ServiceException(message, field, 400);

public class InvalidInputException(string message, string field) : ServiceException(message, field, 422);

public class ResourceNotFoundException(string message, string field) : ServiceException(message, field, 404);

public class CantCreateException(string message, string field) : ServiceException(message, field, 500);

public class DuplicateFieldException(string message, string field) : ServiceException(message, field, 409);