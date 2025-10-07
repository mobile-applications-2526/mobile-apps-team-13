using Microsoft.AspNetCore.Mvc;

namespace Mobile_back_end.Model.Exceptions;

public class DbUpdateException : Exception, IServiceException
{
    public string EntityType { get; set; } = string.Empty;
    public DbUpdateException(string message, string entityType) : base(message)
    {
        EntityType = entityType;
    }
    public DbUpdateException(string message, string entityType, Exception innerException) : base(message, innerException)
    {
        EntityType = entityType;
    }
    public DbUpdateException() : base("An error occurred while updating the database.")
    {
    }

    public override string ToString()
    {
        return $"DbUpdateException: {Message}, \nEntityType: {EntityType}, \nStackTrace: {StackTrace}";
    }

    public ActionResult ToActionResult()
    {
        var problemDetails = new ProblemDetails
        {
            Title = "Database Update Error",
            Detail = Message,
            Status = 500,
            Type = "https://httpstatuses.com/500"
        };
        problemDetails.Extensions["EntityType"] = EntityType;
        return new ObjectResult(problemDetails)
        {
            StatusCode = 500
        };
    }
}