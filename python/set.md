Here is a **complete, exam-ready Python program** for your question, followed by a **simple explanation**.

---

## ✅ Program: Create a Set and Analyze Its Elements

```python
# Accept number of elements
n = int(input("Enter number of elements: "))

myset = set()

# Taking input elements
for i in range(n):
    element = input("Enter element (0-9 / A-Z / a-z): ")
    myset.add(element)

# i) Display set elements
print("\nSet Elements:", myset)

# ii) Length of set
print("Length of set:", len(myset))

# iii) Count digits, lowercase, uppercase
digit_count = 0
lowercase_count = 0
uppercase_count = 0

for item in myset:
    if item.isdigit():
        digit_count += 1
    elif item.islower():
        lowercase_count += 1
    elif item.isupper():
        uppercase_count += 1

print("Number of digits:", digit_count)
print("Number of lowercase letters:", lowercase_count)
print("Number of uppercase letters:", uppercase_count)
```

---

## ▶ Sample Input

```
Enter number of elements: 7
Enter element (0-9 / A-Z / a-z): a
Enter element (0-9 / A-Z / a-z): B
Enter element (0-9 / A-Z / a-z): 5
Enter element (0-9 / A-Z / a-z): z
Enter element (0-9 / A-Z / a-z): 9
Enter element (0-9 / A-Z / a-z): M
Enter element (0-9 / A-Z / a-z): a
```

## ▶ Output

```
Set Elements: {'a', 'B', '5', 'z', '9', 'M'}
Length of set: 6
Number of digits: 2
Number of lowercase letters: 2
Number of uppercase letters: 2
```

---

# 🧠 Explanation (Simple)

### 1️⃣ Creating a Set

```python
myset = set()
```

👉 A set stores **unique values only** (duplicate automatically removed).

---

### 2️⃣ Taking Input

```python
myset.add(element)
```

👉 Each user input is added to the set.

---

### 3️⃣ Display Set & Length

```python
print(myset)
print(len(myset))
```

👉 Shows elements and total unique items.

---

### 4️⃣ Counting Digits, Lowercase & Uppercase

```python
if item.isdigit():
elif item.islower():
elif item.isupper():
```

| Method      | Meaning                |
| ----------- | ---------------------- |
| `isdigit()` | Checks digit (0–9)     |
| `islower()` | Checks lowercase (a–z) |
| `isupper()` | Checks uppercase (A–Z) |

---

# 📝 Short Exam Answer (2–3 Lines)

**This program creates a set using user input, displays the elements and length of the set, and counts digits, lowercase letters, and uppercase letters using built-in string methods such as `isdigit()`, `islower()`, and `isupper()`.**

---

If you want, I can also give:
✔ A **flowchart version**
✔ A **2-mark short code**
✔ Or a version that **validates only 0–9, A–Z, a–z** before adding to set
---
Here is a **complete, exam-ready Python program** for your question.

---

## ✅ Python Program: Create Set and Analyze Elements

```python
# Accept number of elements
h = int(input("Enter number of elements: "))

S1 = set()

# Taking input from user
for i in range(h):
    element = input("Enter element (0-9 / A-Z / a-z): ")
    S1.add(element)

# i) Display set elements and length
print("\nSet Elements:", S1)
print("Length of set S1:", len(S1))

# ii) Count digits, lowercase letters, uppercase letters
digit_count = 0
lowercase_count = 0
uppercase_count = 0

for item in S1:
    if item.isdigit():
        digit_count += 1
    elif item.islower():
        lowercase_count += 1
    elif item.isupper():
        uppercase_count += 1

print("Number of digits:", digit_count)
print("Number of lowercase letters:", lowercase_count)
print("Number of uppercase letters:", uppercase_count)
```

---

## ▶ Sample Input

```
Enter number of elements: 6
Enter element (0-9 / A-Z / a-z): a
Enter element (0-9 / A-Z / a-z): B
Enter element (0-9 / A-Z / a-z): 3
Enter element (0-9 / A-Z / a-z): z
Enter element (0-9 / A-Z / a-z): 7
Enter element (0-9 / A-Z / a-z): A
```

## ▶ Sample Output

```
Set Elements: {'a', 'B', '3', 'z', '7', 'A'}
Length of set S1: 6
Number of digits: 2
Number of lowercase letters: 2
Number of uppercase letters: 2
```

---

## 🧠 Explanation (Simple)

### 1️⃣ Creating a Set

```python
S1 = set()
```

👉 A set stores **unique values only** (duplicates removed automatically).

---

### 2️⃣ Taking Input

```python
S1.add(element)
```

👉 Each user input is added to the set.

---

### 3️⃣ Display Elements & Length

```python
print(S1)
print(len(S1))
```

👉 Shows all unique elements and total count.

---

### 4️⃣ Counting Types of Characters

```python
if item.isdigit():
elif item.islower():
elif item.isupper():
```

| Method      | Meaning                        |
| ----------- | ------------------------------ |
| `isdigit()` | Checks digits (0–9)            |
| `islower()` | Checks lowercase letters (a–z) |
| `isupper()` | Checks uppercase letters (A–Z) |

---

## 📝 Short Exam Answer (2–3 Lines)

**This program creates a set from user input, displays its elements and length, and counts digits, lowercase letters, and uppercase letters using `isdigit()`, `islower()`, and `isupper()` methods.**

---

If you want, I can also provide:
✔ A version that **validates input strictly (only 0–9, A–Z, a–z allowed)**
✔ Or a **flowchart / 2-mark short version**
