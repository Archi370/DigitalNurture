-- 1-5: Basics
SELECT * FROM Users; SELECT name FROM Users; SELECT * FROM Events WHERE city='Kolkata';
SELECT title FROM Events ORDER BY start_date; SELECT DISTINCT city FROM Users;
-- 6-15: Aggregations
SELECT COUNT(*) FROM Events; SELECT AVG(price) FROM Resources; SELECT MAX(price) FROM Resources;
SELECT city, COUNT(*) FROM Users GROUP BY city; SELECT status, COUNT(*) FROM Events GROUP BY status;
-- 16-25: Joins & Complex
SELECT u.name, r.registration_id FROM Users u JOIN Registrations r ON u.user_id = r.user_id;
SELECT e.title FROM Events e LEFT JOIN Feedback f ON e.event_id = f.event_id WHERE f.rating IS NULL;
-- (Add remaining 10 complex queries here involving HAVING and SUBQUERIES)