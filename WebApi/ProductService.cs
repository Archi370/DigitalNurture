using System.Collections.Generic;
using System.Linq;

namespace WebApiHandson
{
    public class ProductService : IProductService
    {
        private static List<Product> _products = new List<Product>
        {
            new Product { Id = 1, Name = "Wireless Mouse", Price = 1500, Stock = 50 },
            new Product { Id = 2, Name = "Mechanical Keyboard", Price = 4500, Stock = 25 }
        };

        public IEnumerable<Product> GetAllProducts() => _products;

        public Product GetProductById(int id) => _products.FirstOrDefault(p => p.Id == id);

        public Product AddProduct(Product product)
        {
            product.Id = _products.Any() ? _products.Max(p => p.Id) + 1 : 1;
            _products.Add(product);
            return product;
        }

        public bool UpdateProduct(int id, Product product)
        {
            var existing = _products.FirstOrDefault(p => p.Id == id);
            if (existing == null) return false;

            existing.Name = product.Name;
            existing.Price = product.Price;
            existing.Stock = product.Stock;
            return true;
        }

        public bool DeleteProduct(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);
            if (product == null) return false;

            _products.Remove(product);
            return true;
        }
    }
}