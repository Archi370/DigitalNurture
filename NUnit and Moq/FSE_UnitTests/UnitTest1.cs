using System;
using NUnit.Framework;
using AccountsManagerLib;

namespace FSE_UnitTests
{
    [TestFixture]
    public class AccountsManagerTests
    {
        private AccountsManager _accountsManager;

        [SetUp]
        public void Setup()
        {
            _accountsManager = new AccountsManager();
        }

        [TestCase("", "secret@user11")]
        [TestCase("user_11", "")]
        [TestCase(null, "secret@user11")]
        public void ValidateUser_EmptyOrNullInputs_ThrowsFormatException(string userId, string password)
        {
            var ex = Assert.Throws<FormatException>(() => _accountsManager.ValidateUser(userId, password));
            Assert.AreEqual("Both user id and password are mandatory", ex.Message);
        }

        [TestCase("user_11", "secret@user11", "Welcome user_11!!!")]
        [TestCase("user_22", "secret@user22", "Welcome user_22!!!")]
        public void ValidateUser_ValidCredentials_ReturnsWelcomeMessage(string userId, string password, string expectedResult)
        {
            string result = _accountsManager.ValidateUser(userId, password);
            Assert.AreEqual(expectedResult, result);
        }

        [TestCase("wrong_user", "secret@user11")]
        [TestCase("user_11", "wrong_password")]
        [TestCase("invalid", "invalid")]
        public void ValidateUser_InvalidCredentials_ReturnsInvalidMessage(string userId, string password)
        {
            string result = _accountsManager.ValidateUser(userId, password);
            Assert.AreEqual("Invalid user id/password", result);
        }
    }
}