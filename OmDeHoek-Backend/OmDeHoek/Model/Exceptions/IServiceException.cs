using Microsoft.AspNetCore.Mvc;

namespace OmDeHoek.Model.Exceptions;

public interface IServiceException
{
    public string Message { get; }
    public string ToString();
    public ActionResult ToActionResult();
}