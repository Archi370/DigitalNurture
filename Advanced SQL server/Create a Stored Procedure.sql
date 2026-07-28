CREATE DATABASE EmployeeManagement;

USE EmployeeManagement;

CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(50)
);

CREATE TABLE Employees (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DepartmentID INT,
    Salary DECIMAL(10,2),
    JoinDate DATE,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

INSERT INTO Departments VALUES
(1,'Human Resources'),
(2,'Information Technology'),
(3,'Finance'),
(4,'Marketing');

INSERT INTO Employees (FirstName, LastName, DepartmentID, Salary, JoinDate) VALUES
('Rahul','Sharma',2,65000.00,'2022-01-15'),
('Priya','Das',1,55000.00,'2021-07-10'),
('Amit','Roy',3,70000.00,'2020-05-20'),
('Sneha','Paul',2,75000.00,'2023-02-12'),
('Arjun','Sen',4,60000.00,'2021-09-05');

DELIMITER $$

CREATE PROCEDURE sp_GetEmployeesByDepartment(IN p_DepartmentID INT)
BEGIN
    SELECT *
    FROM Employees
    WHERE DepartmentID = p_DepartmentID;
END $$

CREATE PROCEDURE sp_InsertEmployee(
    IN p_FirstName VARCHAR(50),
    IN p_LastName VARCHAR(50),
    IN p_DepartmentID INT,
    IN p_Salary DECIMAL(10,2),
    IN p_JoinDate DATE
)
BEGIN
    INSERT INTO Employees
    (FirstName, LastName, DepartmentID, Salary, JoinDate)
    VALUES
    (p_FirstName, p_LastName, p_DepartmentID, p_Salary, p_JoinDate);
END $$

DELIMITER ;

CALL sp_GetEmployeesByDepartment(2);

CALL sp_InsertEmployee(
    'Ananya',
    'Ghosh',
    3,
    68000.00,
    '2024-06-15'
);

SELECT * FROM Employees;