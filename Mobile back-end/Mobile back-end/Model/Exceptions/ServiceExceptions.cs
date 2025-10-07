using Microsoft.AspNetCore.Mvc;
using Mobile_back_end.Utils;

namespace Mobile_back_end.Model.Exceptions;

public abstract class ServiceExceptions : Exception, IServiceException
{
    public string Field { get; set; }
    public int StatusCode { get; set; }
    public ServiceExceptions(string message, string field, int statusCode) : base(message)
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
            Extensions = { { "field", this.Field } }
        };
        return new ObjectResult(problemDetails) { StatusCode = this.StatusCode };
    }
}

public class UnauthorizedException : ServiceExceptions
{
    public UnauthorizedException(string message, string field) : base(message, field, 401)
    {
    }
}

public class ForbiddenActionException : ServiceExceptions
{
    public ForbiddenActionException(string message, string field) : base(message, field, 403)
    {
    }
}

public class MissingDataException : ServiceExceptions
{
    public MissingDataException(string message, string field): base(message, field, 400)
    {
    }
}

public class InvalidInputException : ServiceExceptions
{
    public InvalidInputException(string message, string field) : base(message, field, 422)
    {
    }
}

public class ResourceNotFoundException : ServiceExceptions
{
    public ResourceNotFoundException(string message, string field) : base(message, field, 404)
    {
    }
}

public class CantCreateException : ServiceExceptions
{
    public CantCreateException(string message, string field) : base(message, field, 500)
    {
    }
}

public class ServiceException : ServiceExceptions
{
    public ServiceException(string message, string field, int statusCode) : base(message, field, statusCode)
    {
    }
}

public class DuplicateFieldException : ServiceExceptions
{
    public DuplicateFieldException(string message, string field) : base(message, field, 409)
    {
    }
}