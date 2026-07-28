using System;
using NUnit.Framework;
using UtilLib;

namespace UtilUnitTests
{
    [TestFixture]
    public class UrlHostNameParserTests
    {
        private UrlHostNameParser _parser;

        [SetUp]
        public void Setup()
        {
            _parser = new UrlHostNameParser();
        }

        // Test Scenario 1: Valid HTTP and HTTPS URLs extracting correct hostnames
        [TestCase("http://www.google.com/search", "www.google.com")]
        [TestCase("https://github.com/anushkadas-coder", "github.com")]
        [TestCase("https://bing.com", "bing.com")]
        [TestCase("http://localhost:8080/index.html", "localhost:8080")]
        public void ParseHostName_ValidUrl_ReturnsCorrectHostName(string url, string expectedHost)
        {
            // Act
            string result = _parser.ParseHostName(url);

            // Assert
            Assert.That(result, Is.EqualTo(expectedHost));
        }

        // Test Scenario 2: Invalid protocols throwing FormatException
        [TestCase("ftp://files.server.com/downloads")]
        [TestCase("mailto:test@example.com")]
        [TestCase("www.no-protocol.com")]
        public void ParseHostName_InvalidProtocolOrFormat_ThrowsFormatException(string url)
        {
            // Assert & Act
            var ex = Assert.Throws<FormatException>(() => _parser.ParseHostName(url));
            
            Assert.That(ex.Message, Is.EqualTo("Url is not in correct format"));
        }
    }
}