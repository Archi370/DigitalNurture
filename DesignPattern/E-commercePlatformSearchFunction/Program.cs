using System;

namespace EcommerceSearch
{
    public class Product : IComparable<Product>
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }

        public Product(int productId, string productName, string category)
        {
            ProductId = productId;
            ProductName = productName;
            Category = category;
        }

        public int CompareTo(Product? other)
        {
            if (other == null) return 1;
            return this.ProductId.CompareTo(other.ProductId);
        }

        public override string ToString()
        {
            return $"[ID: {ProductId}] {ProductName} ({Category})";
        }
    }

    public class SearchAlgorithms
    {
        public static Product? LinearSearch(Product[] catalog, int targetId)
        {
            for (int i = 0; i < catalog.Length; i++)
            {
                if (catalog[i].ProductId == targetId)
                {
                    return catalog[i];
                }
            }
            return null;
        }

        public static Product? BinarySearch(Product[] sortedCatalog, int targetId)
        {
            int left = 0;
            int right = sortedCatalog.Length - 1;

            while (left <= right)
            {
                int mid = left + (right - left) / 2;

                if (sortedCatalog[mid].ProductId == targetId)
                {
                    return sortedCatalog[mid];
                }
                
                if (sortedCatalog[mid].ProductId < targetId)
                {
                    left = mid + 1;
                }
                else
                {
                    right = mid - 1;
                }
            }

            return null;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Product[] unsortedCatalog = new Product[]
            {
                new Product(502, "Ergonomic Mouse", "Electronics"),
                new Product(109, "Standing Desk", "Furniture"),
                new Product(844, "Mechanical Keyboard", "Electronics"),
                new Product(320, "Ceramic Coffee Mug", "Kitchen"),
                new Product(215, "Noise-Cancelling Headphones", "Audio")
            };

            Product[] sortedCatalog = (Product[])unsortedCatalog.Clone();
            Array.Sort(sortedCatalog);

            int searchTarget = 320;
            Console.WriteLine($"Looking up Product ID: {searchTarget}...\n");

            Console.WriteLine("--- Testing Linear Search (Unsorted Array) ---");
            Product? linearResult = SearchAlgorithms.LinearSearch(unsortedCatalog, searchTarget);
            Console.WriteLine(linearResult != null ? $"Success: {linearResult}" : "Product not found.");

            Console.WriteLine("\n----------------------------------------------\n");

            Console.WriteLine("--- Testing Binary Search (Sorted Array) ---");
            Product? binaryResult = SearchAlgorithms.BinarySearch(sortedCatalog, searchTarget);
            Console.WriteLine(binaryResult != null ? $"Success: {binaryResult}" : "Product not found.");
        }
    }
}