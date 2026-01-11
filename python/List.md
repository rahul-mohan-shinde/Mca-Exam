Here is a **clear, exam-ready Python program** to **add two matrices using lists**, taking **elements from the user**.

---

## ✅ Program: Matrix Addition Using List

```python
# Accept number of rows and columns
rows = int(input("Enter number of rows: "))
cols = int(input("Enter number of columns: "))

# Initialize matrices
A = []
B = []
result = []

print("\nEnter elements of first matrix:")
for i in range(rows):
    row = []
    for j in range(cols):
        value = int(input(f"A[{i}][{j}]: "))
        row.append(value)
    A.append(row)

print("\nEnter elements of second matrix:")
for i in range(rows):
    row = []
    for j in range(cols):
        value = int(input(f"B[{i}][{j}]: "))
        row.append(value)
    B.append(row)

# Adding the two matrices
for i in range(rows):
    row = []
    for j in range(cols):
        row.append(A[i][j] + B[i][j])
    result.append(row)

# Display the result
print("\nResultant Matrix (A + B):")
for row in result:
    print(row)
```

---

## ▶ Sample Input

```
Enter number of rows: 2
Enter number of columns: 2

Enter elements of first matrix:
A[0][0]: 1
A[0][1]: 2
A[1][0]: 3
A[1][1]: 4

Enter elements of second matrix:
B[0][0]: 5
B[0][1]: 6
B[1][0]: 7
B[1][1]: 8
```

## ▶ Output

```
Resultant Matrix (A + B):
[6, 8]
[10, 12]
```

---

# 🧠 Explanation (Simple)

### 1️⃣ Matrix Creation Using Lists

```python
A = []
B = []
```

👉 Matrices are stored as **list of lists**.

---

### 2️⃣ Taking User Input

```python
for i in range(rows):
    for j in range(cols):
        value = int(input(...))
```

👉 User enters each element row-wise.

---

### 3️⃣ Matrix Addition

```python
row.append(A[i][j] + B[i][j])
```

👉 Each element of matrix A is added to the corresponding element of matrix B.

---

### 4️⃣ Display Result

```python
for row in result:
    print(row)
```

👉 Prints the final matrix.

---

# 📝 Short Exam Answer

**This program accepts elements of two matrices using lists and performs matrix addition by adding corresponding elements to produce the resultant matrix.**

---

If you want, I can also provide:
✔ Version using **list comprehension**
✔ 2-mark short program
✔ Or **matrix multiplication program**
---
Here is a **simple, exam-ready Python program** that performs all the required **list operations step-by-step**.

---

## ✅ Python Code for List Operations

```python
# i) Create a list of animals
animals = ["lion", "tiger", "cow", "elephant", "zebra"]
print("Original List:", animals)

# ii) Delete 'zebra' from the list
animals.remove("zebra")
print("After deleting zebra:", animals)

# iii) Print all alternate elements
print("Alternate elements:")
print(animals[::2])

# iv) Sort the list in descending order
animals.sort(reverse=True)
print("List in descending order:", animals)

# v) Add 'horse' to the list
animals.append("horse")
print("After adding horse:", animals)
```

---

## ▶ Output (Example)

```
Original List: ['lion', 'tiger', 'cow', 'elephant', 'zebra']
After deleting zebra: ['lion', 'tiger', 'cow', 'elephant']
Alternate elements:
['lion', 'cow']
List in descending order: ['tiger', 'lion', 'elephant', 'cow']
After adding horse: ['tiger', 'lion', 'elephant', 'cow', 'horse']
```

---

# 🧠 Short Explanation

### i) Create list

```python
animals = ["lion", "tiger", "cow", "elephant", "zebra"]
```

---

### ii) Delete `zebra`

```python
animals.remove("zebra")
```

---

### iii) Print alternate elements

```python
animals[::2]
```

👉 Takes every **second element**.

---

### iv) Sort in descending order

```python
animals.sort(reverse=True)
```

---

### v) Add `horse`

```python
animals.append("horse")
```

---

## 📝 One-Line Exam Answer

**This program demonstrates list creation, deletion of an element, accessing alternate elements using slicing, sorting in descending order, and adding a new element using list methods.**

---

If you want, I can also give:
✔ A **2-mark short version**
✔ Or a version with **user input**
