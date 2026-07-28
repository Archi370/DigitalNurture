using System;
using NUnit.Framework;
using Moq;
using ConverterLib;
using CurrencyConverterApp;

namespace ConverterUnitTests
{
    [TestFixture]
    public class ConverterTests
    {
        private Converter _converter;
        private Mock<IDollarToEuroExchangeRateFeed> _mockExchangeRateFeed;

        [SetUp]
        public void Setup()
        {
            // Creating a mock object of the interface dependency using Moq
            _mockExchangeRateFeed = new Mock<IDollarToEuroExchangeRateFeed>();
            
            // Injecting the mocked object into the converter constructor
            _converter = new Converter(_mockExchangeRateFeed.Object);
        }

        // Test 1: Celsius To Kelvin Conversion
        [TestCase(0, 273.15)]
        [TestCase(100, 373.15)]
        [TestCase(-273.15, 0)]
        public void CelsiusToKelvin_ValidInputs_ReturnsCorrectValue(double celsius, double expected)
        {
            double result = _converter.CelsiusToKelvin(celsius);
            Assert.That(result, Is.EqualTo(expected).Within(0.001));
        }

        // Test 2: Kilogram To Pound Conversion
        [TestCase(1, 2.205)]
        [TestCase(0, 0)]
        public void KilogramToPound_ValidInputs_ReturnsCorrectValue(double kg, double expected)
        {
            double result = _converter.KilogramToPound(kg);
            Assert.That(result, Is.EqualTo(expected).Within(0.001));
        }

        // Test 3: Kilometer To Mile Conversion
        [TestCase(1.609, 1.0)]
        [TestCase(0, 0)]
        public void KilometerToMile_ValidInputs_ReturnsCorrectValue(double km, double expected)
        {
            double result = _converter.KilometerToMile(km);
            Assert.That(result, Is.EqualTo(expected).Within(0.001));
        }

        // Test 4: Liter To Gallon Conversion
        [TestCase(3.785, 1.0)]
        [TestCase(0, 0)]
        public void LiterToGallon_ValidInputs_ReturnsCorrectValue(double liter, double expected)
        {
            double result = _converter.LiterToGallon(liter);
            Assert.That(result, Is.EqualTo(expected).Within(0.001));
        }

        // Test 5: USD To Euro using Moq to fake the Live Exchange Feed
        [TestCase(100, 0.85, 85.0)]
        [TestCase(50, 0.90, 45.0)]
        public void USDToEuro_MockedExchangeRate_ReturnsCorrectConvertedAmount(double dollar, double fakeRate, double expectedEuro)
        {
            // Setup Moq to return our dummy/fake rate when the method is called
            _mockExchangeRateFeed.Setup(feed => feed.GetActualUSDollarValue()).Returns(fakeRate);

            // Act
            double result = _converter.USDToEuro(dollar);

            // Assert
            Assert.That(result, Is.EqualTo(expectedEuro).Within(0.001));
            
            // Verify that the external exchange rate feed method was actually invoked exactly once
            _mockExchangeRateFeed.Verify(feed => feed.GetActualUSDollarValue(), Times.Once);
        }
    }
}