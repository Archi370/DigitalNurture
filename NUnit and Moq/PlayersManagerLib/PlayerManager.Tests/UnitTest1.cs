using System;
using NUnit.Framework;
using Moq;
using PlayersManagerLib;

namespace PlayerManager.Tests
{
    [TestFixture]
    public class PlayerManagerTests
    {
        private Mock<IPlayerMapper> _mockMapper;

        [SetUp]
        public void Setup()
        {
            _mockMapper = new Mock<IPlayerMapper>();
        }

        [TestCase("Anushka")]
        public void RegisterNewPlayer_UniqueName_ReturnsPlayerWithValidAttributes(string name)
        {
            // Database bol rha hai name nahi exist karta (Unique path)
            _mockMapper.Setup(m => m.IsPlayerNameExistsInDb(name)).Returns(false);

            Player player = Player.RegisterNewPlayer(name, _mockMapper.Object);

            Assert.That(player, Is.Not.Null);
            Assert.That(player.Name, Is.EqualTo(name));
            Assert.That(player.Age, Is.EqualTo(23));
            Assert.That(player.Country, Is.EqualTo("India"));
            Assert.That(player.NoOfMatches, Is.EqualTo(30));
        }

        [TestCase("DuplicatePlayer")]
        public void RegisterNewPlayer_NameAlreadyExists_ThrowsArgumentException(string name)
        {
            // Database bol rha hai name pehle se hai (Exception path)
            _mockMapper.Setup(m => m.IsPlayerNameExistsInDb(name)).Returns(true);

            var ex = Assert.Throws<ArgumentException>(() => Player.RegisterNewPlayer(name, _mockMapper.Object));
            Assert.That(ex.Message, Is.EqualTo("Player name already exists."));
        }
    }
}