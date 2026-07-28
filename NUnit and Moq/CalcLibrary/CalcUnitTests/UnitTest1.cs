using System;
using NUnit.Framework;
using CalcLibrary;

namespace CalcUnitTests
{
    [TestFixture]
    public class CalculatorTests
    {
        private SimpleCalculator _calculator;

        [SetUp]
        public void Setup()
        {
            _calculator = new SimpleCalculator();
        }

        [TestCase(10, 5, 15)]
        [TestCase(-3, -7, -10)]
        [TestCase(0, 0, 0)]
        public void Addition_ValidInputs_ReturnsExpectedSum(double a, double b, double expected)
        {
            double result = _calculator.Addition(a, b);
            Assert.That(result, Is.EqualTo(expected));
            Assert.That(_calculator.GetResult, Is.EqualTo(expected));
        }

        [TestCase(10, 5, 5)]
        [TestCase(-3, -7, 4)]
        public void Subtraction_ValidInputs_ReturnsExpectedDifference(double a, double b, double expected)
        {
            double result = _calculator.Subtraction(a, b);
            Assert.That(result, Is.EqualTo(expected));
        }

        [TestCase(10, 5, 50)]
        [TestCase(-3, 4, -12)]
        [TestCase(5, 0, 0)]
        public void Multiplication_ValidInputs_ReturnsExpectedProduct(double a, double b, double expected)
        {
            double result = _calculator.Multiplication(a, b);
            Assert.That(result, Is.EqualTo(expected));
        }

        [TestCase(10, 2, 5)]
        [TestCase(-12, 3, -4)]
        public void Division_ValidInputs_ReturnsExpectedQuotient(double a, double b, double expected)
        {
            double result = _calculator.Division(a, b);
            Assert.That(result, Is.EqualTo(expected));
        }

        [Test]
        public void Division_ByZero_ThrowsArgumentException()
        {
            var ex = Assert.Throws<ArgumentException>(() => _calculator.Division(10, 0));
            Assert.That(ex.Message, Is.EqualTo("Second Parameter Can't be Zero"));
        }

        [Test]
        public void AllClear_WhenCalled_ResetsResultToZero()
        {
            _calculator.Addition(10, 5);
            _calculator.AllClear();
            Assert.That(_calculator.GetResult, Is.EqualTo(0));
        }
    }
}