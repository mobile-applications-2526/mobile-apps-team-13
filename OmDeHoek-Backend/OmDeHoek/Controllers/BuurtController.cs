using Microsoft.AspNetCore.Mvc;
using OmDeHoek.Model.Enums;
using OmDeHoek.Services;
using OmDeHoek.Utils;

namespace OmDeHoek.Controllers;

// api path: api/buurt
[ApiController]
[Route("api/[controller]")]
public class BuurtController(BuurtService buurtService) : ControllerBase
{
}