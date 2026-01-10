Write a function to accept string from user and it will return reverse
each word of string
---
Here is a **clear exam-ready Python function** that **reverses each word of a string** (word order same, letters inside each word reversed).

---

## ✅ Program: Reverse Each Word in a String

```python
def reverse_each_word(s):
    words = s.split()          # split string into words
    result = []

    for word in words:
        result.append(word[::-1])   # reverse each word

    return " ".join(result)    # join back into a string


# Taking input from user
text = input("Enter a string: ")
output = reverse_each_word(text)
print("Output:", output)
```

---

## ▶ Sample Input

```
Enter a string: Python is easy
```

## ▶ Output

```
Output: nohtyP si ysae
```

---

# 🧠 How It Works (Simple Explanation)

### 1️⃣ `split()`

```python
words = s.split()
```

👉 String ko **words ki list** me todta hai
Example: `"Python is easy"` → `["Python", "is", "easy"]`

---

### 2️⃣ Reverse Each Word

```python
word[::-1]
```

👉 Word ko **ulta karta hai**
Example: `"Python"` → `"nohtyP"`

---

### 3️⃣ Join Back

```python
" ".join(result)
```

👉 Sab reversed words ko **space ke saath jodta hai**

---

# 📝 Short Exam Line

👉 This function accepts a string, splits it into words, reverses each word individually, and returns the modified string.

---

If you want, I can also give:
✔ 2-mark short answer
✔ Version without using slicing
✔ Or program to reverse **word order also**
