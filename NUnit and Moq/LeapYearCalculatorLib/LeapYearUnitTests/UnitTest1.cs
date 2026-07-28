using System;
using NUnit.Framework;
using LeapYearCalculatorLib;

namespace LeapYearUnitTests
{
    [TestFixture]
    public class LeapYearCalculatorTests
    {
        private LeapYearCalculator _calculator;

        [SetUp]
        public void Setup()
        {
            _calculator = new LeapYearCalculator();
        }

        // Test Scenario 1: Out of range years returning -1
        [TestCase(1752, -1)]
        [TestCase(10000, -1)]
        [TestCase(1500, -1)]
        public void IsLeapYear_YearOutOfRange_ReturnsMinusOne(int year, int expected)
        {
            int result = _calculator.IsLeapYear(year);
            Assert.That(result, Is.EqualTo(expected));
        }

        // Test Scenario 2: Valid Leap Years returning 1
        [TestCase(2020, 1)]
        [TestCase(2024, 1)]
        [TestCase(2000, 1)] 
        [TestCase(2400, 1)]
        public void IsLeapYear_ValidLeapYear_ReturnsOne(int year, int expected)
        {
            int result = _calculator.IsLeapYear(year);
            Assert.That(result, Is.EqualTo(expected));
        }

        // Test Scenario 3: Non-Leap Years returning 0
        [TestCase(2021, 0)]
        [TestCase(2023, 0)]
        [TestCase(1800, 0)] 
        [TestCase(1900, 0)]
        public void IsLeapYear_NotLeapYear_ReturnsZero(int year, int expected)
        {
            int result = _calculator.IsLeapYear(year);
            Assert.That(result, Is.EqualTo(expected));
        }
    }
}