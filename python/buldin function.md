Here is a **simple, exam-ready Python program** that **swaps every odd–even position character** in a string.

👉 Example:
Input: `abcdef`
Output: `badcfe`

---

## ✅ Python Program: Swap Odd–Even Characters

```python
# Accept input string
s = input("Enter a string: ")

result = ""

# Loop through string in steps of 2
for i in range(0, len(s), 2):
    if i + 1 < len(s):
        # Swap characters
        result = result + s[i+1] + s[i]
    else:
        # If last character has no pair
        result = result + s[i]

print("Output:", result)
```

---

## ▶ Sample Input

```
Enter a string: abcdef
```

## ▶ Output

```
Output: badcfe
```

---

# 🧠 How It Works (Simple Explanation)

### 1️⃣ Loop with Step = 2

```python
for i in range(0, len(s), 2):
```

👉 Moves through the string **two characters at a time**.

---

### 2️⃣ Swap Logic

```python
result = result + s[i+1] + s[i]
```

👉 If characters are:

```
a b → b a
c d → d c
e f → f e
```

---

### 3️⃣ Handle Last Character (if string length is odd)

```python
else:
    result = result + s[i]
```

👉 If there is **no pair**, last character is added as it is.

---

# 📝 Short Exam Answer

**This program swaps characters at odd and even positions in a string by traversing the string in steps of two and exchanging each adjacent pair of characters.**

---

If you want, I can also give:
✔ One-line solution using slicing
✔ 2-mark short version
✔ Or a version using list conversion
---
Here is a **clear, exam-ready Python program** that solves your question exactly.

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

# 🧠 Simple Explanation

### 1️⃣ Create Set

```python
S1 = set()
```

👉 A set stores **unique elements only**.

---

### 2️⃣ Add User Input

```python
S1.add(element)
```

👉 Adds each input to the set.

---

### 3️⃣ Display Set & Length

```python
print(S1)
print(len(S1))
```

👉 Shows elements and number of items.

---

### 4️⃣ Count Digits, Lowercase, Uppercase

```python
item.isdigit()   # checks 0–9
item.islower()   # checks a–z
item.isupper()   # checks A–Z
```

---

## 📝 Short Exam Answer

**This program creates a set using user input, displays its elements and length, and counts digits, lowercase letters, and uppercase letters using `isdigit()`, `islower()`, and `isupper()` methods.**

---

If you want, I can also provide:
✔ A version that **validates input strictly** (only 0–9, A–Z, a–z allowed)
✔ Or a **2-mark short code version**
