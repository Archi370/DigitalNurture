using System;

class Forecast
{
    static double PredictFutureValue(double currentValue, double growthRate, int periods)
    {
        if (periods == 0)
            return currentValue;
        return PredictFutureValue(currentValue * (1 + growthRate), growthRate, periods - 1);
    }

    static void Main()
    {
        double currentValue = 1000;
        double growthRate = 0.05;
        int periods = 5;

        double futureValue = PredictFutureValue(currentValue, growthRate, periods);
        Console.WriteLine(futureValue);
    }
}