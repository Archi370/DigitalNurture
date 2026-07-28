using System.Collections.Generic;

namespace WebApiHandson
{
    public interface IProductService
    {
        IEnumerable<Product> GetAllProducts();
        Product GetProductById(int id);
        Product AddProduct(Product product);
        bool UpdateProduct(int id, Product product); // Naya rule
        bool DeleteProduct(int id);                  // Naya rule
    }
}