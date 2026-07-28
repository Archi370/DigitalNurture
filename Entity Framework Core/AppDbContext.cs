using Microsoft.EntityFrameworkCore;

namespace EFCoreHandson
{
    public class AppDbContext : DbContext 
    { 
        public DbSet<Product> Products { get; set; } 
        public DbSet<Category> Categories { get; set; } 
        public DbSet<ProductDetail> ProductDetails { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        { 
            optionsBuilder.UseSqlServer("Server=(local);Initial Catalog=RetailInventoryDb;Integrated Security=True;TrustServerCertificate=True;"); 
        } 

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            // Lab 11: One-to-One structural mapping
            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductDetail)
                .WithOne(pd => pd.Product)
                .HasForeignKey<ProductDetail>(pd => pd.ProductId);

            // Lab 9: Database initialization seeding configuration
            modelBuilder.Entity<Category>().HasData( 
                new Category { CategoryId = 1, Name = "Electronics" }, 
                new Category { CategoryId = 2, Name = "Groceries" }
            ); 

            modelBuilder.Entity<Product>().HasData( 
                new Product { ProductId = 1, Name = "Gaming Laptop", Price = 95000.00m, StockQuantity = 10, CategoryId = 1 }, 
                new Product { ProductId = 2, Name = "Wireless Mouse", Price = 1500.00m, StockQuantity = 50, CategoryId = 1 }
            ); 
        }
    }
}
