using System;
using NUnit.Framework;
using Moq;
using CustomerCommLib;

namespace CustomerComm.Tests
{
    [TestFixture]
    public class CustomerCommTests
    {
        private Mock<IMailSender> _mockMailSender;
        private CustomerCommLib.CustomerComm _customerComm; // Fully qualified to resolve conflict

        [SetUp]
        public void Setup()
        {
            _mockMailSender = new Mock<IMailSender>();
            _customerComm = new CustomerCommLib.CustomerComm(_mockMailSender.Object);
        }

        [TestCase("cust123@abc.com", "Some Message")]
        public void SendMailToCustomer_ValidInputs_ReturnsTrue(string email, string message)
        {
            _mockMailSender.Setup(x => x.SendMail(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            bool result = _customerComm.SendMailToCustomer();

            Assert.That(result, Is.True);
        }
    }
}