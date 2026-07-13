Here are the correct answers in order:

| #  | Question                                           | Correct Answer                                                                                                                                |
| -- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Operator tests column for absence of data          | **None of the above** (`IS NULL`)                                                                                                             |
| 2  | EmpLname ends with 'A' and contains five alphabets | **`SELECT * FROM EmployeeInfo WHERE EmpLname LIKE '____A';`** (4 underscores + A) *(Option 3, despite spacing)*                               |
| 3  | Combines records from one or more tables           | **JOIN**                                                                                                                                      |
| 4  | `DELETE ... ROLLBACK;`                             | **Performs undo operation**                                                                                                                   |
| 5  | First and last record from Employee table          | **`SELECT * FROM employee WHERE empno=(SELECT MIN(empno) FROM employee) OR empno=(SELECT MAX(empno) FROM employee);`**                        |
| 6  | Number of join types                               | **4**                                                                                                                                         |
| 7  | Number of employees in HR                          | **`SELECT COUNT(*) FROM EmployeeInfo WHERE Department='HR';`**                                                                                |
| 8  | Excluding Sanjay and Sonia                         | **`SELECT * FROM EmployeeInfo WHERE EmpFname NOT IN ('Sanjay','Sonia');`**                                                                    |
| 9  | Full form of SQL                                   | **Structured Query Language**                                                                                                                 |
| 10 | `ALTER TABLE STUDENT ADD(ADDRESS VARCHAR2(20));`   | **Add column Address in table**                                                                                                               |
| 11 | Types of SQL commands                              | **DDL, DML, TCL, DCL, DQL**                                                                                                                   |
| 12 | Join N tables requires                             | **N−1**                                                                                                                                       |
| 13 | DDL statements                                     | **Create, Drop, Truncate**                                                                                                                    |
| 14 | Delete and Drop work same                          | **No**                                                                                                                                        |
| 15 | Create table with structure + data                 | **`CREATE TABLE table_name AS SELECT ...;`**                                                                                                  |
| 16 | First four characters of EmpLname                  | **`SELECT SUBSTRING(EmpLname,1,4) FROM EmployeeInfo;`** *(Oracle normally uses `SUBSTR`, but among the options this is the intended answer.)* |
| 17 | Legal SQL expression                               | **`SELECT NULL FROM SALES;`**                                                                                                                 |
| 18 | EmpIds present in both tables                      | **`SELECT EmpId FROM EmployeeDetails WHERE EmpId IN (SELECT EmpId FROM EmployeeSalary);`**                                                    |
| 19 | Delete and Drop work same                          | **False**                                                                                                                                     |
| 20 | Primary keys in one table                          | **1**                                                                                                                                         |

### Score Tip

The only slightly tricky questions are:

* **Q1:** Correct SQL operator is `IS NULL`, so choose **None of the above**.
* **Q6:** Most Oracle exams consider **4 join types** (INNER, LEFT, RIGHT, FULL).
* **Q16:** Oracle's actual function is `SUBSTR()`, but since it's not listed, select **`SUBSTRING(...)`**.

These answers should help you score full marks on this page.
