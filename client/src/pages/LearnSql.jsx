import React from 'react';

const sqlTopics = [
  {
    level: "Level 1: Basics (Fundamentals & Syntax)",
    topics: [
      { 
        name: "Relational Database Concepts", 
        desc: "A Relational Database is a type of database that stores and provides access to data points that are related to one another. Relational databases are based on the relational model, an intuitive, straightforward way of representing data in tables. In a relational database, each row in the table is a record with a unique ID called the key. The columns of the table hold attributes of the data, and each record usually has a value for each attribute, making it easy to establish the relationships among data points.",
        code: `-- Tables: Collections of rows (records) and columns (attributes).
-- Rows/Records: A single entry in a table (like a single user).
-- Columns/Fields: Specific data points (like name, age).

-- Example relational structure:
-- Table: Users
-- id | name    | email
-- 1  | Alice   | alice@mail.com
-- 2  | Bob     | bob@mail.com`
      },
      { 
        name: "Data Types", 
        desc: "Data types specify what kind of data can be stored in a column (e.g., numbers, text, dates). This helps the database optimize storage and ensures data integrity (e.g., you can't put letters in an integer column).",
        code: `/* Common Data Types */
-- INT: Whole numbers (e.g., 10, -5).
-- VARCHAR(n): Variable length string up to 'n' characters.
-- BOOLEAN: True/False (often stored as 1/0).
-- DATE: A date value (YYYY-MM-DD).
-- TIMESTAMP: Date and Time together.`
      },
      { 
        name: "DDL: Data Definition Language", 
        desc: "DDL statements are used to define or alter the database structure/schema. They deal with the structure of tables, indexes, and other database objects.",
        code: `-- CREATE: Make a new table
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    created_at TIMESTAMP
);

-- ALTER: Modify an existing table
ALTER TABLE Users ADD username VARCHAR(50);

-- DROP: Delete an entire table and its data
DROP TABLE Users;

-- TRUNCATE: Keep the table structure, but delete ALL rows
TRUNCATE TABLE Users;`
      },
      { 
        name: "DML: Data Manipulation Language", 
        desc: "DML statements are used for managing the data within the tables. You use these to add, update, or remove records.",
        code: `-- INSERT: Add new rows
INSERT INTO Users (id, name) VALUES (1, 'Alice');
INSERT INTO Users (id, name) VALUES (2, 'Bob'), (3, 'Charlie');

-- UPDATE: Modify existing rows
UPDATE Users 
SET name = 'Alice Smith' 
WHERE id = 1;

-- DELETE: Remove specific rows
DELETE FROM Users WHERE id = 3;`
      },
      { 
        name: "DQL: Data Query Language", 
        desc: "DQL is used to fetch data from the database. The SELECT statement is the core of DQL.",
        code: `-- SELECT specific columns
SELECT name, email FROM Users;

-- SELECT all columns (*)
SELECT * FROM Users;`
      },
      { 
        name: "Filtering", 
        desc: "The WHERE clause is used to filter records so that only those that fulfill a specified condition are returned.",
        code: `-- Filtering rows using WHERE
SELECT * FROM Users WHERE id = 1;
SELECT * FROM Users WHERE age > 18;

-- Handling NULL (missing data)
-- Use IS NULL or IS NOT NULL, never use '= NULL'
SELECT * FROM Users WHERE email IS NOT NULL;`
      },
      { 
        name: "Operators", 
        desc: "Operators are used to combine multiple conditions, check values within a list or range, or perform pattern matching on strings.",
        code: `-- AND/OR: Combining conditions
SELECT * FROM Users WHERE age > 18 AND status = 'active';

-- IN: Multiple possible values
SELECT * FROM Users WHERE role IN ('admin', 'editor');

-- BETWEEN: Value within a range
SELECT * FROM Users WHERE age BETWEEN 20 AND 30;

-- LIKE: Pattern matching (Wildcards: '%' for many chars, '_' for one char)
SELECT * FROM Users WHERE name LIKE 'A%'; -- Starts with A
SELECT * FROM Users WHERE name LIKE '%son'; -- Ends with son`
      },
      { 
        name: "Sorting & Pagination", 
        desc: "Sorting changes the output order of your queries without changing the data itself. Pagination limits the number of results, useful for web apps.",
        code: `-- ORDER BY: Sorting results
SELECT * FROM Users ORDER BY name ASC; -- Ascending (A-Z)
SELECT * FROM Users ORDER BY created_at DESC; -- Descending (Newest first)

-- LIMIT & OFFSET: Pagination
SELECT * FROM Users LIMIT 10; -- Give me only 10 rows
SELECT * FROM Users LIMIT 10 OFFSET 20; -- Skip first 20 rows, then give me 10`
      },
      { 
        name: "Aliasing", 
        desc: "Aliases are used to give a table, or a column in a table, a temporary name. This makes column names more readable in the output.",
        code: `-- Column Aliasing
SELECT name AS 'Full Name', dob AS 'Date of Birth' FROM Users;

-- Table Aliasing (very useful for JOINs)
SELECT u.name, u.email FROM Users AS u;`
      }
    ]
  },
  {
    level: "Level 2: Intermediate (Logic & Relationships)",
    topics: [
      { 
        name: "Aggregate Functions", 
        desc: "Functions that perform a calculation on a set of values and return a single summarizing value.",
        code: `-- COUNT: Count number of rows
SELECT COUNT(*) FROM Users;
SELECT COUNT(email) FROM Users; -- Ignores NULL emails

-- SUM & AVG: Math on numeric columns
SELECT SUM(salary) FROM Employees;
SELECT AVG(age) FROM Users;

-- MIN & MAX: Find extremes
SELECT MIN(price) FROM Products;
SELECT MAX(score) FROM Games;`
      },
      { 
        name: "Grouping Data", 
        desc: "GROUP BY groups rows that have the same values into summary rows. HAVING is the 'WHERE' clause but specifically for grouped/aggregated data.",
        code: `-- GROUP BY: Aggregate operations per group
SELECT department, COUNT(*) AS employee_count
FROM Employees
GROUP BY department;

-- HAVING: Filtering after grouping
SELECT department, COUNT(*) AS employee_count
FROM Employees
GROUP BY department
HAVING COUNT(*) > 5; -- Only departments with > 5 employees`
      },
      { 
        name: "Joins", 
        desc: "A JOIN clause is used to combine rows from two or more tables, based on a related column between them (usually Primary Key -> Foreign Key).",
        code: `-- INNER JOIN: Only returns rows with matching data in BOTH tables
SELECT Users.name, Orders.total
FROM Users
INNER JOIN Orders ON Users.id = Orders.user_id;

-- LEFT JOIN: Returns ALL rows from the left table, and matching rows from the right
SELECT u.name, o.total
FROM Users u
LEFT JOIN Orders o ON u.id = o.user_id;
-- If a user has no orders, o.total will be NULL.

-- CROSS JOIN: Returns the Cartesian product (every combination)
SELECT * FROM Colors CROSS JOIN Sizes;`
      },
      { 
        name: "Set Operations", 
        desc: "Set operators combine the result sets of two or more queries into a single column result set. The queries must have the same number of columns and compatible datatypes.",
        code: `-- UNION: Combines queries and removes duplicates
SELECT email FROM Customers
UNION
SELECT email FROM Suppliers;

-- UNION ALL: Combines but keeps duplicates
SELECT email FROM Customers
UNION ALL
SELECT email FROM Suppliers;

-- INTERSECT: Returns only rows that appear in BOTH queries
-- EXCEPT/MINUS: Returns rows from query 1 that are NOT in query 2`
      },
      { 
        name: "Database Constraints", 
        desc: "Rules enforced on data columns to ensure reliability and integrity. If an action violates a constraint, the action is aborted.",
        code: `CREATE TABLE Products (
    -- PRIMARY KEY: Uniquely identifies each row (Not Null + Unique)
    id INT PRIMARY KEY,
    
    -- NOT NULL: Column cannot have a NULL value
    name VARCHAR(100) NOT NULL,
    
    -- UNIQUE: All values in the column must be different
    SKU VARCHAR(50) UNIQUE,
    
    -- CHECK: Validates a condition
    price DECIMAL CHECK (price > 0),
    
    -- FOREIGN KEY: Links to a Primary Key in another table
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);`
      },
      { 
        name: "Basic Subqueries", 
        desc: "A subquery is a query nested inside another query. It can be used to pass a condition or fetch a value dynamically.",
        code: `-- Subquery in WHERE clause to find employees earning above average
SELECT name, salary 
FROM Employees 
WHERE salary > (
    SELECT AVG(salary) FROM Employees
);

-- Subquery using IN
SELECT name FROM Users 
WHERE id IN (
    SELECT user_id FROM Orders WHERE total > 1000
);`
      },
      { 
        name: "Conditional Logic", 
        desc: "The CASE expression acts like an IF-THEN-ELSE statement in SQL, allowing dynamic output based on conditions.",
        code: `-- Creating categories dynamically based on data
SELECT name, price,
CASE
    WHEN price < 50 THEN 'Cheap'
    WHEN price BETWEEN 50 AND 200 THEN 'Moderate'
    ELSE 'Expensive'
END AS price_category
FROM Products;`
      },
      { 
        name: "Built-in Functions", 
        desc: "Databases have built-in functions to format, alter, or compute data on the fly (strings, math, type casting).",
        code: `-- String manipulation
SELECT UPPER(name) FROM Users;
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM Users;

-- Type Casting (changing data types)
SELECT CAST(price AS VARCHAR) FROM Products;
-- Postgres shortcut: SELECT price::VARCHAR;`
      }
    ]
  },
  {
    level: "Level 3: Advanced (Complex Querying)",
    topics: [
      { 
        name: "Advanced Subqueries", 
        desc: "A Correlated Subquery is an inner query that is evaluated once for each row processed by the outer query—meaning it depends on the outer query's data.",
        code: `-- Correlated Subquery: Find employees earning more than the average of THEIR specific department
SELECT e1.name, e1.salary, e1.department_id
FROM Employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM Employees e2
    WHERE e1.department_id = e2.department_id -- Links inner query to outer query
);`
      },
      { 
        name: "CTEs (Common Table Expressions)", 
        desc: "A CTE is a temporary, named result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. It makes queries vastly more readable.",
        code: `-- Using WITH to define a CTE
WITH HighValueCustomers AS (
    SELECT user_id, SUM(total) as total_spent
    FROM Orders
    GROUP BY user_id
    HAVING SUM(total) > 5000
)
-- Using the CTE just like a normal table
SELECT u.name, hvc.total_spent
FROM Users u
INNER JOIN HighValueCustomers hvc ON u.id = hvc.user_id;`
      },
      { 
        name: "Recursive CTEs", 
        desc: "A Recursive CTE references itself. It is commonly used for querying hierarchical data such as organizational charts or file systems.",
        code: `-- Creating an org chart hierarchy
WITH RECURSIVE EmployeePaths AS (
    -- Base case: Top level boss (no manager)
    SELECT id, name, manager_id, 1 as level
    FROM Employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive step: Join to previous iteration
    SELECT e.id, e.name, e.manager_id, ep.level + 1
    FROM Employees e
    INNER JOIN EmployeePaths ep ON e.manager_id = ep.id
)
SELECT * FROM EmployeePaths;`
      },
      { 
        name: "Window Functions", 
        desc: "Window functions perform calculations across a set of table rows that are somehow related to the current row, but unlike GROUP BY, they do NOT collapse rows into a single summary row.",
        code: `-- Calculate moving average over rows
SELECT name, department, salary,
       AVG(salary) OVER(PARTITION BY department) as dept_avg_salary
FROM Employees;
-- 'OVER' indicates a window function. 
-- 'PARTITION BY' sets the boundaries (the window) for the calculation.`
      },
      { 
        name: "Ranking Functions", 
        desc: "Used inside Window Functions to rank rows based on specific conditions.",
        code: `-- ROW_NUMBER: Unique sequential int (1, 2, 3...)
-- RANK: Skips numbers on ties (1, 2, 2, 4...)
-- DENSE_RANK: Doesn't skip numbers on ties (1, 2, 2, 3...)

SELECT name, score,
       RANK() OVER(ORDER BY score DESC) as rank_position
FROM GameScores;`
      },
      { 
        name: "Value/Offset Functions", 
        desc: "Access data from a subsequent or preceding row in the same result set, allowing you to compare current rows with previous/next rows without a self-join.",
        code: `-- LAG: Look back at previous row
-- LEAD: Look forward to next row
SELECT date, daily_sales,
       LAG(daily_sales, 1) OVER(ORDER BY date) as previous_day_sales,
       daily_sales - LAG(daily_sales, 1) OVER(ORDER BY date) as difference
FROM Sales;`
      },
      { 
        name: "Views & Materialized Views", 
        desc: "A View is a virtual table based on the result of a SQL statement. A Materialized View is a view whose results are actually saved to disk for faster reading, but must be refreshed manually.",
        code: `-- Creating a standard view (Stored query, runs every time you select from it)
CREATE VIEW ActiveUsers AS
SELECT name, email FROM Users WHERE status = 'active';

SELECT * FROM ActiveUsers; -- Uses view like a table

-- Materialized View (PostgreSQL example)
CREATE MATERIALIZED VIEW MonthlySales AS ...
REFRESH MATERIALIZED VIEW MonthlySales; -- Must refresh data`
      },
      { 
        name: "Working with Unstructured Data", 
        desc: "Modern SQL databases support parsing and querying JSON or XML data directly inside relational tables.",
        code: `-- Querying JSON data (PostgreSQL example)
-- Let's say we have a JSONB column named 'attributes'
SELECT id, name, 
       attributes->>'color' AS product_color,     -- Extracts value as text
       attributes->>'weight' AS product_weight
FROM Products
WHERE attributes->>'color' = 'red';`
      }
    ]
  },
  {
    level: "Level 4: Expert & SRE Level (Performance & Architecture)",
    topics: [
      { 
        name: "Indexes", 
        desc: "An index is a data structure (commonly a B-Tree) that improves the speed of data retrieval operations, at the cost of slower writes and more storage space.",
        code: `-- CREATE INDEX: Basic unqiue or non-unique index
CREATE INDEX idx_user_email ON Users(email);

-- Composite Index: Indexing multiple columns together
CREATE INDEX idx_user_status_age ON Users(status, age);

-- Note: Over-indexing slows down INSERT, UPDATE, and DELETE.`
      },
      { 
        name: "Query Execution Plans", 
        desc: "Tools to see exactly how the database engine is executing a query. Crucial for debugging slow queries to see if they are doing expensive table scans instead of using indexes.",
        code: `-- EXPLAIN: Shows the query plan
EXPLAIN SELECT * FROM Users WHERE email = 'test@test.com';

-- EXPLAIN ANALYZE (Postgres only): Actually runs the query and shows real times
EXPLAIN ANALYZE SELECT * FROM Users WHERE email = 'test@test.com';`
      },
      { 
        name: "Transactions & ACID Properties", 
        desc: "A transaction is a single unit of work. ACID stands for Atomicity (all or nothing), Consistency (data is valid), Isolation (concurrent safe), and Durability (saved permanently).",
        code: `-- Standard Transaction Block
BEGIN; -- Start transaction

UPDATE Accounts SET balance = balance - 100 WHERE id = 1;
UPDATE Accounts SET balance = balance + 100 WHERE id = 2;

COMMIT; -- Save changes permanently
-- Or ROLLBACK if something went wrong`
      },
      { 
        name: "Isolation Levels & MVCC", 
        desc: "Isolation levels dictate how transactions interact when running concurrently. MVCC (Multi-Version Concurrency Control) is an underlying engine mechanism where readers don't block writers, and writers don't block readers.",
        code: `-- Isolation Levels (from least safe/fastest to most safe/slowest):
-- 1. READ UNCOMMITTED (Allows dirty reads)
-- 2. READ COMMITTED (Default in PG. No dirty reads, but allows non-repeatable reads)
-- 3. REPEATABLE READ (Prevents phantom reads in Postgres)
-- 4. SERIALIZABLE (Highest safety, acts as if tx ran sequentially)

SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;`
      },
      { 
        name: "Normalization vs Denormalization", 
        desc: "Normalization organizes data to reduce redundancy (1NF, 2NF, 3NF). Denormalization intentionally adds redundancy back in to speed up read performance (trading off write speed and database size).",
        code: `-- Normalization Example:
-- Splitting one big 'Orders' table (with customer_name, customer_address) 
-- into 'Orders', 'Customers', and 'Addresses' tables to avoid repeating the user's address.

-- Denormalization Example:
-- Doing a cron job each night to calculate and store aggregated values directly into a table 
-- to avoid doing expensive JOINs and COUNTs on every user request.`
      },
      { 
        name: "Partitioning & Sharding", 
        desc: "When a table has billions of rows, scanning it is slow. Partitioning splits a large table into smaller physical pieces on the SAME server. Sharding splits data across MULTIPLE servers.",
        code: `-- Table Partitioning (PostgreSQL Date Partitioning)
CREATE TABLE logs (
   id serial,
   log_date date,
   message text
) PARTITION BY RANGE (log_date);

CREATE TABLE logs_2023 PARTITION OF logs FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');`
      },
      { 
        name: "WAL & PITR", 
        desc: "WAL (Write-Ahead Logging) means changes are written to a log file before they are written to the main database file (Ensures Durability). PITR (Point-In-Time Recovery) allows a DBA to restore the DB to exactly 'Tuesday at 2:05 PM' by applying WALs to a base backup.",
        code: `-- Conceptual: WAL is used internally for crash recovery.
-- Configuration parameters for WAL usually reside in the database config file (e.g. postgresql.conf)
-- such as:
-- wal_level = replica
-- max_wal_senders = 10
-- archive_mode = on`
      }
    ]
  }
];

const LearnSql = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] font-sans text-gray-300 selection:bg-white/10 selection:text-white">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        <header className="mb-16 border-b border-white/5 pb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            SQL Documentation
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            A comprehensive reference guide for SQL and database concepts, from foundational syntax to advanced architecture.
          </p>
        </header>
        
        {sqlTopics.map((level, idx) => (
          <section key={idx} className="mb-20">
            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                {level.level.split(':')[0]}
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                {level.level.split(': ')[1]}
              </h2>
            </div>
            
            <div className="space-y-16">
              {level.topics.map((topic, tIdx) => (
                <div key={tIdx} className="group">
                  <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                    {topic.name}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {topic.desc}
                  </p>
                  
                  <div className="rounded-xl overflow-hidden border border-white/5 bg-[#111] bg-opacity-50">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                      <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">SQL Example</span>
                    </div>
                    <div className="p-5 overflow-x-auto">
                      <code className="text-[#4fd1d9] font-mono text-sm leading-relaxed block whitespace-pre">
                        {topic.code.split('\n').map((line, i) => (
                          <span key={i} className={`block ${line.trim().startsWith('--') || line.trim().startsWith('/*') || line.trim().startsWith('*') ? 'text-gray-600' : ''}`}>
                            {line}
                          </span>
                        ))}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LearnSql;
