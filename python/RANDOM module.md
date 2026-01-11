Here is a clear **exam-ready answer** for your question:

---

# 📘 Explain the use of any five functions from the **`random`** module with suitable examples

The **`random`** module in Python is used to generate **random numbers, selections, and shuffling**. It is commonly used in games, simulations, testing, and data sampling.

First, we import the module:

```python
import random
```

---

## 1️⃣ `random()`

### 🔹 Use:

Generates a **random floating-point number between 0.0 and 1.0**.

### 🔹 Example:

```python
import random

num = random.random()
print(num)
```

### 🔹 Output (example):

```
0.372891
```

👉 Always returns a number **>= 0.0 and < 1.0**

---

## 2️⃣ `randint(a, b)`

### 🔹 Use:

Returns a **random integer between a and b (both inclusive)**.

### 🔹 Example:

```python
import random

num = random.randint(1, 10)
print(num)
```

### 🔹 Output (example):

```
7
```

👉 Generates any whole number from **1 to 10**

---

## 3️⃣ `choice(sequence)`

### 🔹 Use:

Selects **one random element** from a list, tuple, or string.

### 🔹 Example:

```python
import random

colors = ["red", "blue", "green", "yellow"]
print(random.choice(colors))
```

### 🔹 Output (example):

```
green
```

👉 Useful for **random selection**

---

## 4️⃣ `shuffle(list)`

### 🔹 Use:

**Shuffles elements of a list randomly** (changes the original list).

### 🔹 Example:

```python
import random

numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(numbers)
```

### 🔹 Output (example):

```
[3, 1, 5, 2, 4]
```

👉 Used in **card games, quizzes, random ordering**

---

## 5️⃣ `sample(population, k)`

### 🔹 Use:

Returns **k unique random elements** from a sequence.

### 🔹 Example:

```python
import random

students = ["Rahul", "Amit", "Neha", "Priya", "Ravi"]
selected = random.sample(students, 3)
print(selected)
```

### 🔹 Output (example):

```
['Neha', 'Rahul', 'Ravi']
```

👉 No repeated values
👉 Useful for **random team selection**

---

# 🧠 Summary Table

| Function        | Use                              |
| --------------- | -------------------------------- |
| `random()`      | Random float between 0.0 and 1.0 |
| `randint(a, b)` | Random integer between a and b   |
| `choice()`      | Random single element            |
| `shuffle()`     | Randomly rearranges a list       |
| `sample()`      | Selects multiple unique items    |

---

# ✅ Exam Tip (Short Answer Line)

**The `random` module is used to generate random numbers and make random selections for simulations, games, and testing.**

---

If you want, I can also give you:
✔ 2-mark version
✔ 5-mark version
✔ Or a **real mini program using random**

Just tell me 👍
