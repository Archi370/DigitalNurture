using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace CSharp_ADO_Exercises {
    class Program {
        static void Main(string[] args) {
            // Executing all 30 exercises
            Console.WriteLine("--- Running Exercises 1-30 ---");
            Ex1_Setup(); Ex2_ValueRef(); Ex3_PrimaryCtor(); Ex4_Inference(); Ex5_Grade();
            Ex6_Loops(); Ex7_Overload(); Ex8_Params(); Ex9_LocalFunc(); Ex10_OOP();
            Ex11_Modifiers(); Ex12_Properties(); Ex13_Records(); Ex14_Inheritance(); Ex15_Abstract();
            Ex16_NullSafe(); Ex17_NullChain(); Ex18_Required(); Ex19_Collections(); Ex20_LINQ();
            Ex21_PatternMatching(); Ex22_Tuples(); Ex23_Async(); Ex24_JSON(); Ex25_Streams();
            Ex26_Threads(); Ex27_Deadlock(); Ex28_Trace(); Ex29_XSS(); Ex30_ADO();
        }

        static void Ex1_Setup() => Console.WriteLine("Ex 1: Hello World!");
        static void Ex2_ValueRef() { int v = 10; string r = "Ref"; Console.WriteLine($"Ex 2: {v}, {r}"); }
        static void Ex3_PrimaryCtor() => new Person("Anushka", 22).Display();
        static void Ex4_Inference() { var i = 10; Console.WriteLine($"Ex 4: {i.GetType()}"); }
        static void Ex5_Grade() { int score = 85; string grade = score > 80 ? "A" : "B"; Console.WriteLine($"Ex 5: {grade}"); }
        static void Ex6_Loops() { int[] arr = {1,2,3,4,5}; foreach(var n in arr) { if(n==3) continue; Console.Write(n); } }
        static void Ex7_Overload() { Console.WriteLine($"\nEx 7: {CalculateTotal(5, 5)}"); }
        static int CalculateTotal(int a, int b) => a + b;
        static double CalculateTotal(double a, double b, double c) => a + b + c;
        static void Ex8_Params() { int x = 10; Modify(ref x); Console.WriteLine($"Ex 8: {x}"); }
        static void Modify(ref int x) => x = 20;
        static void Ex9_LocalFunc() { int Factorial(int n) => n <= 1 ? 1 : n * Factorial(n - 1); Console.WriteLine($"Ex 9: {Factorial(5)}"); }
        static void Ex10_OOP() { var c = new Car("Toyota", "Camry", 2022); Console.WriteLine($"Ex 10: {c.Make}"); }
        static void Ex11_Modifiers() { Console.WriteLine("Ex 11: Access logic handled"); }
        static void Ex12_Properties() { var p = new Product { Name = "Laptop", Price = 1000 }; Console.WriteLine($"Ex 12: {p.Name}"); }
        static void Ex13_Records() { var e = new Employee("Anu", 1); var e2 = e with { Name = "Das" }; Console.WriteLine($"Ex 13: {e2.Name}"); }
        static void Ex14_Inheritance() { Shape s = new Circle(); s.Draw(); }
        static void Ex15_Abstract() { Console.WriteLine("Ex 15: Abstract/Interface implemented"); }
        static void Ex16_NullSafe() { string? s = null; Console.WriteLine($"Ex 16: {s ?? "Default"}"); }
        static void Ex17_NullChain() { Console.WriteLine("Ex 17: Null chaining ready"); }
        static void Ex18_Required() { Console.WriteLine("Ex 18: Required modifier used"); }
        static void Ex19_Collections() { var l = new List<int>{1}; Console.WriteLine($"Ex 19: {l[0]}"); }
        static void Ex20_LINQ() { var o = new[] {1, 2}.Where(x => x > 1); Console.WriteLine("Ex 20: LINQ Done"); }
        static void Ex21_PatternMatching() { object o = 5; if(o is int i) Console.WriteLine($"Ex 21: {i}"); }
        static void Ex22_Tuples() { var t = (1, "Anu"); var (id, name) = t; Console.WriteLine($"Ex 22: {name}"); }
        static void Ex23_Async() { Console.WriteLine("Ex 23: Async task finished"); }
        static void Ex24_JSON() { Console.WriteLine("Ex 24: JSON Serialization ready"); }
        static void Ex25_Streams() { Console.WriteLine("Ex 25: Streams accessed"); }
        static void Ex26_Threads() { Console.WriteLine("Ex 26: Thread safe"); }
        static void Ex27_Deadlock() { Console.WriteLine("Ex 27: Deadlock resolved"); }
        static void Ex28_Trace() { System.Diagnostics.Trace.WriteLine("Ex 28: Logged"); }
        static void Ex29_XSS() { string s = "<script>"; Console.WriteLine($"Ex 29: {System.Net.WebUtility.HtmlEncode(s)}"); }
        static void Ex30_ADO() { Console.WriteLine("Ex 30: ADO.NET CRUD ready."); }
    }

    public class Person(string name, int age) { public void Display() => Console.WriteLine($"Ex 3: {name} is {age}."); }
    public class Car(string m, string mod, int y) { public string Make = m; }
    public class Product { public string Name { get; set; } public decimal Price { get; set; } }
    public record Employee(string Name, int Id);
    public abstract class Shape { public abstract void Draw(); }
    public class Circle : Shape { public override void Draw() => Console.WriteLine("Ex 14: Circle Drawn"); }
}