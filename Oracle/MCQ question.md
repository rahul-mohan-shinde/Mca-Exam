### Oracle SQL & PL/SQL Test – Correct MCQ Answers

**1. What operator tests column for absence of data?**

* A) NOT
* B) Exist
* C) Not Null
* ✅ D) **None of the above** (Correct operator is **IS NULL**)

---

**2. Write a query to fetch details of employees whose EmpLname ends with an alphabet 'A' and contains five alphabets.**

* A) `SELECT * FROM EmployeeInfo WHERE EmpLname LIKE '%a';`
* B) `SELECT * FROM EmployeeInfo WHERE EmpLname LIKE '_____a';`
* ✅ C) `SELECT * FROM EmployeeInfo WHERE EmpLname LIKE '____a';`
* D) `SELECT * FROM EmployeeInfo WHERE EmpLname LIKE '%a%';`

---

**3. Which data manipulation command is used to combine the records from one or more tables?**

* A) SELECT
* B) PROJECT
* C) PRODUCT
* ✅ D) **JOIN**

---

**4. What does the following code do?**
`DELETE FROM STUDENTS WHERE AGE = 16;`
`ROLLBACK;`

* ✅ A) **Performs undo operation**
* B) Deletes rows where age = 16 permanently
* C) Deletes entire table
* D) None of the above

---

**5. Which query displays the first and last record from the Employee table?**

* A) `SELECT MIN(empno), MAX(empno) FROM employee;`
* ✅ B) `SELECT * FROM employee WHERE empno=(SELECT MIN(empno) FROM employees) OR empno=(SELECT MAX(empno) FROM employees);`
* C) `SELECT * FROM employee WHERE empno=(SELECT MIN(empno) FROM employees) AND empno=(SELECT MAX(empno) FROM employees);`

---

**6. How many join types are there?**

* A) 2
* B) 3
* ✅ C) **4**
* D) 5

---

**7. Query to fetch the number of employees working in the HR department**

* A) `SELECT COUNT(*) FROM EmployeeInfo WHERE COUNT(Department)='HR';`
* ✅ B) `SELECT COUNT(*) FROM EmployeeInfo WHERE Department='HR';`
* C) `SELECT COUNT(*) FROM EmployeeInfo WHERE Department=HR;`

---

**8. Exclude employees with first names "Sanjay" and "Sonia".**

* A) `IN`
* B) `ANY`
* ✅ C) `NOT IN`
* D) `=`

---

**9. What is the full form of SQL?**

* A) Structured Query List
* ✅ B) **Structured Query Language**
* C) Sample Query Language
* D) None of the above

---

**10. What does this statement do?**
`ALTER TABLE STUDENT ADD(ADDRESS VARCHAR2(20));`

* ✅ A) **Adds Address column**
* B) Checks Address column
* C) Error message

---

**11. Different types of SQL commands**

* A) DDL, DML, TCL, DCL, DTL
* ✅ B) **DDL, DML, TCL, DCL, DQL**
* C) DDL, DML, TCL, DNL

---

**12. To join N tables, minimum joins required**

* A) N
* ✅ B) **N−1**
* C) N+1
* D) N+2

---

**13. Which are DDL statements?**

* ✅ A) **Create, Drop, Truncate**
* B) Create, Alter, Delete, Rename
* C) Insert, Update, Delete
* D) Create, Alter, Grant

---

**14. Delete and Drop statements work the same.**

* A) Yes
* ✅ B) **No**

---

**15. Correct syntax to create a new table with data and structure from another table**

* ✅ A) `CREATE TABLE table_name AS SELECT ...;`
* B) `CREATE TABLE table_name IN SELECT ...;`
* C) `CREATE TABLE table_name AS columns FROM table_name;`
* D) `CREATE TABLE table_name IN columns FROM table_name;`

---

**16. Retrieve the first four characters of EmpLname**

* ✅ A) `SELECT SUBSTRING(EmpLname,1,4) FROM EmployeeInfo;`
* B) `SELECT INSTRING(EmpLname,1,4) FROM EmployeeInfo;`
* C) `SELECT LENGTH(EmpLname)>=4 FROM EmployeeInfo;`

---

**17. Which is a legal SQL expression?**

* ✅ A) `SELECT NULL FROM SALES;`
* B) `SELFCT NAME FROM SALES;`
* C) `SELECT * FROM SALES WHEN PRICE=NULL;`
* D) `SELECT # FROM SALES;`

---

**18. Fetch EmpIds present in both EmployeeDetails and EmployeeSalary**

* A) `NOT IN`
* ✅ B) `IN`
* C) `> ANY`
* D) `IN =`

---

**19. Delete and Drop statements work the same.**

* A) True
* ✅ B) **False**

---

**20. How many Primary Keys can a table have?**

* ✅ A) **1**
* B) 2
* C) Depends on column
* D) 3
* | 4  | `DELETE ... ROLLBACK;`                             | **Performs undo operation**                                                                                                                   |
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
