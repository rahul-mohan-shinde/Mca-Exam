Here is a **complete, exam-ready Python program** that creates a dictionary with 5 elements and performs all the required operations.

---

## ✅ Python Program: Dictionary Operations

```python
# Creating a dictionary with 5 key-value pairs
student = {
    1: "Rahul",
    2: "Amit",
    3: "Neha",
    4: "Priya",
    5: "Ravi"
}

print("Original Dictionary:", student)

# i) Display all the keys
print("\nAll Keys:")
print(student.keys())

# ii) Add new key-value pair
student[6] = "Sonal"
print("\nAfter Adding New Key-Value Pair:")
print(student)

# iii) Delete specific element from dictionary
del student[3]
print("\nAfter Deleting Key 3:")
print(student)

# iv) Modify value of a particular key
student[2] = "Ankit"
print("\nAfter Modifying Value of Key 2:")
print(student)
```

---

## ▶ Sample Output

```
Original Dictionary: {1: 'Rahul', 2: 'Amit', 3: 'Neha', 4: 'Priya', 5: 'Ravi'}

All Keys:
dict_keys([1, 2, 3, 4, 5])

After Adding New Key-Value Pair:
{1: 'Rahul', 2: 'Amit', 3: 'Neha', 4: 'Priya', 5: 'Ravi', 6: 'Sonal'}

After Deleting Key 3:
{1: 'Rahul', 2: 'Amit', 4: 'Priya', 5: 'Ravi', 6: 'Sonal'}

After Modifying Value of Key 2:
{1: 'Rahul', 2: 'Ankit', 4: 'Priya', 5: 'Ravi', 6: 'Sonal'}
```

---

# 🧠 Explanation (Simple)

### 🔹 Dictionary Creation

```python
student = {1:"Rahul", 2:"Amit", 3:"Neha", 4:"Priya", 5:"Ravi"}
```

👉 A dictionary stores data in **key : value** form.

---

## i) Display all the keys

```python
student.keys()
```

👉 Shows only the keys of the dictionary.

---

## ii) Add new key-value pair

```python
student[6] = "Sonal"
```

👉 Adds a new entry to the dictionary.

---

## iii) Delete specific element

```python
del student[3]
```

👉 Removes the element whose key is `3`.

---

## iv) Modify value of a particular key

```python
student[2] = "Ankit"
```

👉 Changes the value of key `2` from `"Amit"` to `"Ankit"`.

---

# 📝 Short Exam Answer (2–3 Lines)

**This program creates a dictionary with five key–value pairs and demonstrates how to display keys using `keys()`, add a new pair by assignment, delete an element using `del`, and modify a value by updating the key.**

---

If you want, I can also give:
✔ **User-input version**
✔ **2-mark short code**
✔ Or a **flowchart explanation**
