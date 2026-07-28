using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using EFCoreHandson;

Console.WriteLine("=== EF Core Retail Inventory System (Full Automation) ===");

using (var context = new AppDbContext())
{
    // === LAB 4: Inserting Data ===
    if (!context.Products.Any())
    {
        Console.WriteLine("\n[Lab 4] Database empty. Inserting initial items...");
        context.Products.AddRange(
            new Product { Name = "Gaming Laptop", Price = 95000.00m, StockQuantity = 10, CategoryId = 1 },
            new Product { Name = "Wireless Mouse", Price = 1500.00m, StockQuantity = 50, CategoryId = 1 },
            new Product { Name = "Mechanical Keyboard", Price = 4500.00m, StockQuantity = 25, CategoryId = 1 }
        );
        context.SaveChanges();
        Console.WriteLine("Initial data inserted!");
    }

    // === LAB 5: Retrieving Data ===
    Console.WriteLine("\n[Lab 5] Current Inventory Records:");
    Console.WriteLine("--------------------------------------------------");
    foreach (var p in context.Products.ToList())
    {
        Console.WriteLine($"ID: {p.ProductId} | Name: {p.Name} | Price: {p.Price} | Stock: {p.StockQuantity}");
    }
    Console.WriteLine("--------------------------------------------------");

    // === LAB 6: Updating and Deleting Records ===
    Console.WriteLine("\n[Lab 6] Performing Update and Delete Operations...");
    var productToUpdate = context.Products.FirstOrDefault(p => p.ProductId == 2);
    if (productToUpdate != null)
    {
        productToUpdate.StockQuantity = 65; 
        Console.WriteLine($"-> Updated Stock for {productToUpdate.Name} to 65.");
    }

    var productToDelete = context.Products.FirstOrDefault(p => p.ProductId == 3);
    if (productToDelete != null)
    {
        context.Products.Remove(productToDelete); 
        Console.WriteLine($"-> Removed {productToDelete.Name} from inventory.");
    }
    context.SaveChanges();
    Console.WriteLine("✅ Changes successfully pushed to SQL Server!");

    // === LAB 7: Writing Queries with LINQ ===
    Console.WriteLine("\n[Lab 7] Running Premium Filter Query (Price > 5000):");
    var premiumProducts = context.Products.Where(p => p.Price > 5000).ToList();
    Console.WriteLine("--------------------------------------------------");
    foreach (var p in premiumProducts)
    {
        Console.WriteLine($"PREMIUM ITEM -> Name: {p.Name} | Price: {p.Price}");
    }
    Console.WriteLine("--------------------------------------------------");

    // =========================================================================
    // ADVANCED MODULE EXTENSIONS (LABS 10 - 15)
    // =========================================================================

    // === LAB 10: Eager and Explicit Loading ===
    Console.WriteLine("\n[Lab 10] Executing Relational Loading Strategies...");
    var eagerProducts = context.Products.Include(p => p.Category).ToList();
    Console.WriteLine($"-> [Eager] Loaded {eagerProducts.Count} elements with their Category navigation structures.");

    var singleItem = context.Products.FirstOrDefault();
    if (singleItem != null)
    {
        context.Entry(singleItem).Reference(p => p.Category).Load();
        Console.WriteLine($"-> [Explicit] Successfully verified runtime load token for {singleItem.Name}.");
    }

    // === LAB 12: Navigating Circular References via DTO Projection ===
    Console.WriteLine("\n[Lab 12] Transforming structures into safe DTO objects:");
    var reportingDTOs = context.Products
        .Select(p => new { p.Name, CategoryName = p.Category.Name })
        .ToList();
    foreach(var dto in reportingDTOs)
    {
        Console.WriteLine($"   DTO Record -> Product: {dto.Name} | Category: {dto.CategoryName}");
    }

    // === LAB 13: Query Tracking Isolation ===
    Console.WriteLine("\n[Lab 13] Optimizing memory engine with AsNoTracking read operations...");
    var optimizedData = context.Products.AsNoTracking().Where(p => p.Price > 1000).ToList();
    Console.WriteLine($"-> Extracted {optimizedData.Count} read-only rows bypassing EF memory cache.");

    // === LAB 15: Handling Concurrency Conflicts ===
    Console.WriteLine("\n[Lab 15] Running Transaction Safe Concurrency Handler...");
    try
    {
        var targetProduct = context.Products.FirstOrDefault(p => p.ProductId == 1);
        if (targetProduct != null)
        {
            targetProduct.Price = 94000.00m; // Simulating local modification state
            context.SaveChanges();
            Console.WriteLine("-> Concurrency status clean. Version stamp successfully updated.");
        }
    }
    catch (DbUpdateConcurrencyException)
    {
        Console.WriteLine("⚠️ Concurrency Conflict Detected! State modified by an external background thread operation.");
    }
}

Console.WriteLine("\nPress any key to exit...");
Console.ReadKey();
