using System;
using NUnit.Framework;
using SeasonsLib;

namespace SeasonUnitTests
{
    [TestFixture]
    public class SeasonTellerTests
    {
        private SeasonTeller _seasonTeller;

        [SetUp]
        public void Setup()
        {
            _seasonTeller = new SeasonTeller();
        }

        [TestCase("February", "Spring")]
        [TestCase("MARCH", "Spring")]
        [TestCase("April", "Summer")]
        [TestCase("may", "Summer")]
        [TestCase("June", "Summer")]
        [TestCase("July", "Monsoon")]
        [TestCase("August", "Monsoon")]
        [TestCase("september", "Monsoon")]
        [TestCase("October", "Autumn")]
        [TestCase("november", "Autumn")]
        [TestCase("December", "Winter")]
        [TestCase("january", "Winter")]
        public void DisplaySeasonBy_ValidMonths_ReturnsExpectedSeason(string monthName, string expectedSeason)
        {
            string result = _seasonTeller.DisplaySeasonBy(monthName);
            Assert.That(result, Is.EqualTo(expectedSeason));
        }

        [TestCase("InvalidMonth")]
        [TestCase("123")]
        [TestCase("")]
        public void DisplaySeasonBy_InvalidMonths_ReturnsInvalidSeasonMessage(string monthName)
        {
            string result = _seasonTeller.DisplaySeasonBy(monthName);
            Assert.That(result, Is.EqualTo("Invalid Season"));
        }
    }
}