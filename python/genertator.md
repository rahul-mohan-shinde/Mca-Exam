 Write a generator function my - range (start, stop, step) which will
accept three arguments as start, stop, and step and generate a given
range.
---
Perfect 👍
Main tumhe **generator function `my_range(start, stop, step)`** bana kar **simple Hindi me samjhaata hoon**.

---

# 🎯 PROBLEM

👉 Hame Python ka **`range()` jaisa khud ka function** banana hai
👉 Jo **start, stop, step** lega
👉 Aur **generator** ka use karke values ek-ek karke dega

---

# ✅ GENERATOR FUNCTION: `my_range()`

```python
# Generator function
def my_range(start, stop, step):
    while start < stop:
        yield start        # value return karta hai without stopping function
        start = start + step
```

---

# ▶ USE OF FUNCTION

```python
for i in my_range(1, 10, 2):
    print(i)
```

---

# 📌 OUTPUT

```
1
3
5
7
9
```

---

# 🧠 LINE BY LINE SAMJHO

---

## 1️⃣ Generator Function Kya Hota Hai?

👉 Normal function me `return` hota hai
👉 Generator me **`yield`** hota hai

📌 `yield`:

* Value return karta hai
* Function ko **pause** karta hai
* Next call par wahi se continue karta hai

---

## 2️⃣ Function Definition

```python
def my_range(start, stop, step):
```

👉 3 parameters:

* `start` → kahan se shuru
* `stop` → kahan tak (stop include nahi)
* `step` → kitna jump

---

## 3️⃣ While Loop

```python
while start < stop:
```

👉 Jab tak `start` **stop se chhota** hai, tab tak loop chale

---

## 4️⃣ Yield Statement

```python
yield start
```

👉 Current value ko output me bhejta hai
👉 Function ko **terminate nahi karta**, sirf pause karta hai

---

## 5️⃣ Step Increase

```python
start = start + step
```

👉 Next value ke liye increment

---

# 🔁 WORKING FLOW (Example)

Call:

```python
my_range(1, 10, 2)
```

Flow:

```
start = 1 → yield 1
start = 3 → yield 3
start = 5 → yield 5
start = 7 → yield 7
start = 9 → yield 9
start = 11 → stop (condition false)
```

---

# 📝 SHORT EXAM ANSWER

👉 **Generator function** wo function hota hai jo `yield` ka use karke values ko ek-ek karke return karta hai, bina memory me poori list banaye.

---

# ⚡ EXTRA: Negative Step Version (Advanced)

```python
def my_range(start, stop, step):
    if step > 0:
        while start < stop:
            yield start
            start += step
    else:
        while start > stop:
            yield start
            start += step
```

Example:

```python
for i in my_range(10, 0, -2):
    print(i)
```

Output:

```
10
8
6
4
2
```

---

Agar chaho to main:
✔ 2-mark short answer
✔ Generator vs Normal function difference
✔ Or exam ke aur Python programs

bhi kara sakta hoon 😊
---
Here is the **direct exam answer**:

---

### ✅ Program: Generator Function `my_range(start, stop, step)`

```python
def my_range(start, stop, step):
    while start < stop:
        yield start
        start = start + step


# Using the generator
for i in my_range(1, 10, 2):
    print(i)
```

---

### ▶ Output:

```
1
3
5
7
9
```

---

### 📝 Short Explanation:

`my_range()` is a **generator function** that uses `yield` to return values one by one between `start` and `stop` with a given `step`, similar to Python’s built-in `range()` function.

---

If you want, I can also give:
✔ 2-mark short answer
✔ Or version with negative step
