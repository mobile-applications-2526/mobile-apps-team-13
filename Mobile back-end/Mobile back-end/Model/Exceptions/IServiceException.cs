using Microsoft.AspNetCore.Mvc;

namespace Mobile_back_end.Model.Exceptions;

public interface IServiceException
{
    public string Message { get;  }
    public string ToString();
    public ActionResult ToActionResult();
}