using NUnit.Framework;
using Moq;

namespace UnitTestingHandson
{
    public interface IEmployeeRepository
    {
        double GetSalary(int empId);
    }

    public class SalaryService
    {
        private readonly IEmployeeRepository _repository;
        public SalaryService(IEmployeeRepository repository) { _repository = repository; }

        public double CalculateBonus(int empId)
        {
            double salary = _repository.GetSalary(empId);
            return salary * 0.10;
        }
    }

    [TestFixture]
    public class SalaryServiceTests
    {
        // TestCase humein ek hi test mein alag-alag inputs check karne ki power deta hai
        // Form: [TestCase(Input_EmpId, Fake_Salary, Expected_Bonus)]
        [TestCase(1, 50000, 5000)]
        [TestCase(2, 95000, 9500)]
        [TestCase(3, 60000, 6000)]
        public void CalculateBonus_MultipleScenarios_ShouldReturnCorrectBonus(int empId, double fakeSalary, double expectedBonus)
        {
            // 1. ARRANGE
            var mockRepo = new Mock<IEmployeeRepository>();

            // Runtime par inputs ke mutabik dynamically setup hoga
            mockRepo.Setup(repo => repo.GetSalary(empId)).Returns(fakeSalary);
            var service = new SalaryService(mockRepo.Object);

            // 2. ACT
            double actualBonus = service.CalculateBonus(empId);

            // 3. ASSERT (Value Verification)
            Assert.That(actualBonus, Is.EqualTo(expectedBonus));

            // 4. BEHAVIOR VERIFICATION (Crucial for Assessments)
            // Ye check karega ki pure execution mein GetSalary() exactly ek hi baar call hua ya nahi
            mockRepo.Verify(repo => repo.GetSalary(empId), Times.Once);
        }
    }
}