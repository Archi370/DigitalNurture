using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebApiHandson.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAll() => Ok(_productService.GetAllProducts());

        [HttpGet("{id}")]
        public ActionResult<Product> GetById(int id)
        {
            var product = _productService.GetProductById(id);
            if (product == null) return NotFound(new { Message = "Product nahi mila!" });
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> Create([FromBody] Product newProduct)
        {
            var createdProduct = _productService.AddProduct(newProduct);
            return CreatedAtAction(nameof(GetById), new { id = createdProduct.Id }, createdProduct);
        }

        // 4. PUT: api/products/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Product updatedProduct)
        {
            var success = _productService.UpdateProduct(id, updatedProduct);
            if (!success) return NotFound(new { Message = "Update karne ke liye product nahi mila!" });
            return NoContent();
        }

        // 5. DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _productService.DeleteProduct(id);
            if (!success) return NotFound(new { Message = "Delete karne ke liye product nahi mila!" });
            return Ok(new { Message = "Product successfully delete ho gaya hai!" });
        }
    }
}