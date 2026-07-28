using System;
using System.Collections.Generic;
using NUnit.Framework;
using CollectionsLib;

namespace CollectionUnitTests
{
    [TestFixture]
    public class EmployeeManagerTests
    {
        private EmployeeManager _manager;

        [SetUp]
        public void Setup()
        {
            _manager = new EmployeeManager();
        }

        // Test Scenario 1: Check if all 4 initial employees are returned correctly
        [Test]
        public void GetEmployees_ReturnsAllInitialEmployees()
        {
            // Act
            List<Employee> result = _manager.GetEmployees();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(4));
            Assert.That(result[0].EmpName, Is.EqualTo("John"));
            Assert.That(result[1].EmpName, Is.EqualTo("Mary"));
            Assert.That(result[2].EmpName, Is.EqualTo("Steve"));
            Assert.That(result[3].EmpName, Is.EqualTo("Allen"));
        }

        // Test Scenario 2: Check if filtering employees who joined in previous years works
        [Test]
        public void GetEmployeesWhoJoinedInPreviousYears_ReturnsCorrectFilteredEmployees()
        {
            // Act
            List<Employee> result = _manager.GetEmployeesWhoJoinedInPreviousYears();

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(4)); // Since all 4 hardcoded employees joined 2, 5, or 7 years ago
            
            // Verifying specific properties to ensure accuracy
            Assert.That(result[0].EmpId, Is.EqualTo(100));
            Assert.That(result[3].Salary, Is.EqualTo(50000));
        }
    }
}