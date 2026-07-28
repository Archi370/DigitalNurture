using System;

class Logger
{
    private static readonly Lazy<Logger> instance = new Lazy<Logger>(() => new Logger());

    private Logger() { }

    public static Logger GetInstance()
    {
        return instance.Value;
    }

    public void Log(string message)
    {
        Console.WriteLine(message);
    }
}

class Program
{
    static void Main()
    {
        Logger logger1 = Logger.GetInstance();
        Logger logger2 = Logger.GetInstance();

        logger1.Log("First log");
        logger2.Log("Second log");

        Console.WriteLine(object.ReferenceEquals(logger1, logger2));
    }
}