using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EFCoreHandson
{
    public class Category 
    { 
        public int CategoryId { get; set; } 
        public string Name { get; set; } 
        public List<Product> Products { get; set; } 
    } 

    public class Product 
    { 
        public int ProductId { get; set; } 
        public string Name { get; set; } 
        public decimal Price { get; set; } 
        
        // Lab 8: Inventory tracking schema field
        public int StockQuantity { get; set; } 

        // Lab 10 & 11: Relationships fields
        public int CategoryId { get; set; } 
        public Category Category { get; set; } 
        public ProductDetail ProductDetail { get; set; }
        public List<Tag> Tags { get; set; }

        // Lab 15: Concurrency detection token
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }

    public class ProductDetail 
    { 
        public int ProductDetailId { get; set; } 
        public string WarrantyInfo { get; set; } 
        public int ProductId { get; set; } 
        public Product Product { get; set; } 
    }

    public class Tag 
    { 
        public int Id { get; set; } 
        public string Name { get; set; } 
        public List<Product> Products { get; set; } 
    }
}
