CREATE DATABASE OnlineRetailStore;
USE OnlineRetailStore;

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2)
);

INSERT INTO Products VALUES
(1,'iPhone 15','Electronics',89999.00),
(2,'Samsung Galaxy S24','Electronics',84999.00),
(3,'MacBook Air M3','Electronics',129999.00),
(4,'Dell XPS 13','Electronics',129999.00),
(5,'Sony Headphones','Electronics',19999.00),
(6,'Dining Table','Furniture',35000.00),
(7,'Office Chair','Furniture',12000.00),
(8,'Wooden Bed','Furniture',45000.00),
(9,'Luxury Sofa','Furniture',45000.00),
(10,'Bookshelf','Furniture',18000.00),
(11,'Men T-Shirt','Clothing',1200.00),
(12,'Women Jacket','Clothing',3200.00),
(13,'Jeans','Clothing',2500.00),
(14,'Sneakers','Clothing',3200.00),
(15,'Hoodie','Clothing',2800.00);

SELECT *
FROM (
    SELECT
        ProductID,
        ProductName,
        Category,
        Price,
        ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC) AS RowNum,
        RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS RankNum,
        DENSE_RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS DenseRankNum
    FROM Products
) AS RankedProducts
WHERE RowNum <= 3;