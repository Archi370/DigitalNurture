using System;

interface IDocument
{
    void Open();
}

class WordDocument : IDocument
{
    public void Open()
    {
        Console.WriteLine("Opening Word Document");
    }
}

class PdfDocument : IDocument
{
    public void Open()
    {
        Console.WriteLine("Opening PDF Document");
    }
}

class ExcelDocument : IDocument
{
    public void Open()
    {
        Console.WriteLine("Opening Excel Document");
    }
}

abstract class DocumentFactory
{
    public abstract IDocument CreateDocument();
}

class WordFactory : DocumentFactory
{
    public override IDocument CreateDocument()
    {
        return new WordDocument();
    }
}

class PdfFactory : DocumentFactory
{
    public override IDocument CreateDocument()
    {
        return new PdfDocument();
    }
}

class ExcelFactory : DocumentFactory
{
    public override IDocument CreateDocument()
    {
        return new ExcelDocument();
    }
}

class FactoryTest
{
    static void Main()
    {
        DocumentFactory factory;

        factory = new WordFactory();
        IDocument doc1 = factory.CreateDocument();
        doc1.Open();

        factory = new PdfFactory();
        IDocument doc2 = factory.CreateDocument();
        doc2.Open();

        factory = new ExcelFactory();
        IDocument doc3 = factory.CreateDocument();
        doc3.Open();
    }
}