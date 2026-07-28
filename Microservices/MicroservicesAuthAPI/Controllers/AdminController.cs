using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MicroservicesAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        [HttpGet("dashboard")]
        [Authorize(Roles = "Admin")] // Question 3: Strictly locked for Admin role
        public IActionResult GetAdminDashboard()
        {
            return Ok("Welcome to the secure admin dashboard. High-privilege clearance granted.");
        }
    }
}