using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MicroservicesAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SecureController : ControllerBase
    {
        [HttpGet("data")]
        [Authorize] // Question 2: Base Token authorization interceptor
        public IActionResult GetSecureData()
        {
            return Ok("This is protected data. Token verification validation successful!");
        }
    }
}