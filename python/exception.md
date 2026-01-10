Write user defined exception program in python which will find the
factorial of a number. If number is less than zero it should raise the
exception as 'Invalid Input'.
---
Here is a **proper exam-ready Python program** using a **user-defined exception** to find factorial.
If the number is less than zero, it raises **"Invalid Input"**.

---

## ✅ User Defined Exception Program (Factorial)

```python
# Step 1: Create a user-defined exception
class InvalidInput(Exception):
    pass


# Step 2: Function to calculate factorial
def factorial(n):
    if n < 0:
        raise InvalidInput("Invalid Input")   # Raising user-defined exception
    
    fact = 1
    for i in range(1, n + 1):
        fact = fact * i
    return fact


# Step 3: Main program
try:
    num = int(input("Enter a number: "))
    result = factorial(num)
    print("Factorial of", num, "is:", result)

except InvalidInput as e:
    print(e)

except ValueError:
    print("Please enter a valid integer")
```

---

## 🧠 How This Program Works

### 1️⃣ **User Defined Exception**

```python
class InvalidInput(Exception):
    pass
```

👉 Creates a custom exception named **InvalidInput**

---

### 2️⃣ **Checking Condition**

```python
if n < 0:
    raise InvalidInput("Invalid Input")
```

👉 If number is negative → program raises **custom exception**

---

### 3️⃣ **Exception Handling**

```python
except InvalidInput as e:
    print(e)
```

👉 Catches the user-defined exception and prints the message

---

## ▶ Sample Output

### ✔ Valid Input

```
Enter a number: 5
Factorial of 5 is: 120
```

### ❌ Invalid Input

```
Enter a number: -4
Invalid Input
```

---

## 📝 Short Exam Definition

**User-defined exception** is a custom error created by the programmer using a class that inherits from the `Exception` class to handle specific error conditions.

---

If you want, I can also give you:
✔ Recursion version
✔ 5-mark theory answer
✔ Or another example of user-defined exception

Just tell me 👍
