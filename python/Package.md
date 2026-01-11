Here is a **proper 5-mark, exam-ready answer** for:

**“What is Package? Explain the different ways to import modules or packages.”**

---

## 📦 What is a Package?

In Python, a **package** is a **folder (directory)** that contains multiple **modules (Python files)** and sometimes **sub-packages**.
It is used to **organize related modules** in a structured way, making large programs easy to manage, reuse, and maintain.

👉 Simple words:
**Module = single .py file**
**Package = collection of related modules in a folder**

### Example Structure:

```
mathpack/          ← Package
│
├── add.py         ← Module
├── sub.py         ← Module
└── __init__.py
```

---

## 🎯 Why Use Packages?

✔ Organizes large projects
✔ Avoids name conflicts
✔ Improves reusability
✔ Makes code modular and readable

---

# 📥 Different Ways to Import Modules or Packages

Python provides several ways to import modules and packages:

---

## 1️⃣ `import module`

### 🔹 Use:

Imports the **entire module**

```python
import math
print(math.sqrt(16))
```

### 🧠 Meaning:

You must use **module name with function**

```
math.sqrt()
```

---

## 2️⃣ `from module import function`

### 🔹 Use:

Imports **specific functions or variables**

```python
from math import sqrt
print(sqrt(16))
```

### 🧠 Meaning:

No need to write `math.sqrt()`

---

## 3️⃣ `from module import *`

### 🔹 Use:

Imports **all functions and variables** from module

```python
from math import *
print(sqrt(25))
print(pow(2, 3))
```

⚠ Not recommended for large programs (can cause name conflicts)

---

## 4️⃣ `import module as alias`

### 🔹 Use:

Gives a **short name (alias)** to module

```python
import math as m
print(m.sqrt(36))
```

### 🧠 Meaning:

Useful for long module names

---

## 5️⃣ Importing from a **Package**

Assume package structure:

```
bank/
│
├── deposit.py
└── withdraw.py
```

### 🔹 Import a module from package

```python
import bank.deposit
bank.deposit.add_money()
```

---

## 6️⃣ `from package import module`

```python
from bank import deposit
deposit.add_money()
```

---

## 7️⃣ `from package.module import function`

```python
from bank.deposit import add_money
add_money()
```

---

# 🧾 Summary Table

| Import Method                     | Example                              | Use                        |
| --------------------------------- | ------------------------------------ | -------------------------- |
| `import module`                   | `import math`                        | Import whole module        |
| `from module import name`         | `from math import sqrt`              | Import specific item       |
| `from module import *`            | `from math import *`                 | Import all                 |
| `import module as alias`          | `import math as m`                   | Short name                 |
| `import package.module`           | `import bank.deposit`                | Import module from package |
| `from package import module`      | `from bank import deposit`           | Direct access              |
| `from package.module import name` | `from bank.deposit import add_money` | Import function            |

---

# 📝 Conclusion (Exam Line)

**A package in Python is a collection of related modules organized in a directory. Python provides multiple ways to import modules and packages such as `import module`, `from module import name`, aliasing, and importing from packages, making code modular and reusable.**

---

If you want, I can also give:
✔ 2-mark short version
✔ Diagram-based explanation
✔ Or a small program using your own package
