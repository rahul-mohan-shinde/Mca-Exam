Here is a **simple, exam-ready Python program** using **list comprehension** to create a separate list of digits from a mixed list.

---

## ✅ Program: Separate Digits from List

```python
# Original list
data = ['a', 'b', 2, 43, 'Hi', 900, 'xyz']

# List comprehension to extract only digits (numbers)
digits = [x for x in data if isinstance(x, int)]

print("Output list:", digits)
```

---

## ▶ Output

```
Output list: [2, 43, 900]
```

---

# 🧠 Explanation (Simple)

### 1️⃣ Original List

```python
data = ['a', 'b', 2, 43, 'Hi', 900, 'xyz']
```

👉 Contains **alphabets + numbers**

---

### 2️⃣ List Comprehension

```python
digits = [x for x in data if isinstance(x, int)]
```

👉 Meaning:

* **x for x in data** → each element one by one
* **if isinstance(x, int)** → check if element is a number
* If true → add to new list

---

# 📝 Short Exam Answer

**This program uses list comprehension and `isinstance()` to filter only integer values from a mixed list containing alphabets and digits.**

---

If you want, I can also give:
✔ Version using `str.isdigit()`
✔ Or separate alphabets into another list
✔ Or 2-mark short version
---
Achha 👍
Main **tumhe code + logic + yaad rakhne ka trick** sab simple me samjhaata hoon.

Tumhara question:

> **Mixed list se sirf digits (numbers) ki list banana using list comprehension**

---

# ✅ CODE (Final Answer)

```python
data = ['a', 'b', 2, 43, 'Hi', 900, 'xyz']

digits = [x for x in data if isinstance(x, int)]

print(digits)
```

**Output:**

```
[2, 43, 900]
```

---

# 🧠 LINE-BY-LINE SAMJHO

### 1️⃣ Original List

```python
data = ['a', 'b', 2, 43, 'Hi', 900, 'xyz']
```

👉 Isme **letters + words + numbers** sab mix hai

---

### 2️⃣ List Comprehension Structure

General formula:

```
[new_item for item in list if condition]
```

Tumhare case me:

```python
[x for x in data if isinstance(x, int)]
```

🔍 Matlab:

* `x` → list ka har element
* `for x in data` → data list ke sab items ek-ek karke
* `if isinstance(x, int)` → **sirf numbers ko allow karo**

👉 Jo number hoga → new list me jayega
👉 Jo string hoga → skip ho jayega

---

# 🧩 FLOW (Working Samjho)

Data:

```
['a', 'b', 2, 43, 'Hi', 900, 'xyz']
```

Check one by one:

```
'a'    → string → skip
'b'    → string → skip
2      → int → add
43     → int → add
'Hi'   → string → skip
900    → int → add
'xyz'  → string → skip
```

Result:

```
[2, 43, 900]
```

---

# 🧠 YAAD RAKHNE KA TRICK (EXAM HACK)

## 🔑 LIST COMPREHENSION FORMULA

👉 **“WHAT – FROM WHERE – CONDITION”**

```
[WHAT for ITEM in LIST if CONDITION]
```

Tumhara:

```
[x for x in data if isinstance(x, int)]
```

---

## 🔁 EK LINE KA RULE

👉 **"If mixed list ho → `isinstance(x, int)` use karo for digits"**

---

# 📝 SHORT EXAM EXPLANATION (LIKHO)

> This program uses list comprehension to filter only integer values from a mixed list. The condition `isinstance(x, int)` checks whether each element is a digit, and only those elements are added to the new list.

---

# 💡 BONUS (ALPHABETS BHI NIKALNA HO)

```python
letters = [x for x in data if isinstance(x, str)]
print(letters)
```

Output:

```
['a', 'b', 'Hi', 'xyz']
```

---

# 🎯 QUICK MEMORY CHEAT

📌 **Digits chahiye → `int`**
📌 **Text chahiye → `str`**
📌 **Pattern → `[x for x in list if condition]`**

---

Agar chaho to next mai:

✅ **List comprehension ke 5 common patterns**
✅ **Tuples / dictionary comprehension**
✅ **Exam ke 5 similar questions practice**

bhi kara sakta hoon 😊
