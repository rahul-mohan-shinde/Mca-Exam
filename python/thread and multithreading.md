Here is a **clear, exam-ready explanation of *Thread*** in Python with a simple example.

---

# 🧵 Thread (Multithreading)

## 🔹 What is a Thread?

A **thread** is the **smallest unit of execution** inside a program.
Multiple threads can run **at the same time within one process**.

👉 Simple words:
**Thread = ek hi program ke andar multiple kaam ek saath karna**

Example:

* One thread → downloading file
* Another thread → playing music
* Same program, parallel work

---

## 🎯 Why Use Threads?

✔ Faster execution
✔ Better CPU utilization
✔ Useful for tasks like:

* File downloading
* Web scraping
* Games
* GUI applications
* Background processing

---

# 📦 Python Thread Module

Python me threads ke liye module hai: **`threading`**

```python
import threading
```

---

# ✅ Example: Simple Thread Program

```python
import threading

# Function to be executed by thread
def display():
    print("Thread is running")

# Create thread
t = threading.Thread(target=display)

# Start thread
t.start()
```

### ▶ Output:

```
Thread is running
```

---

# 🧠 How It Works

### 1️⃣ Function

```python
def display():
```

👉 Ye kaam thread karega

### 2️⃣ Thread Create

```python
t = threading.Thread(target=display)
```

👉 Naya thread banaya

### 3️⃣ Start Thread

```python
t.start()
```

👉 Thread execute hona shuru

---

# 🔁 Example: Multiple Threads

```python
import threading

def task1():
    print("Task 1 running")

def task2():
    print("Task 2 running")

t1 = threading.Thread(target=task1)
t2 = threading.Thread(target=task2)

t1.start()
t2.start()
```

### ▶ Output:

```
Task 1 running
Task 2 running
```

👉 Dono tasks **parallel** chal rahe hain

---

# 🧩 Thread vs Process

| Feature       | Thread       | Process        |
| ------------- | ------------ | -------------- |
| Memory        | Shared       | Separate       |
| Speed         | Faster       | Slower         |
| Communication | Easy         | Hard           |
| Example       | Browser tabs | Different apps |

---

# 📝 Exam Short Answers

### ✔ Definition:

**A thread is the smallest unit of execution in a program that allows multiple tasks to run concurrently within the same process.**

### ✔ Use:

**Threads are used to improve performance and execute multiple operations at the same time.**

---

If you want, I can also explain:

✔ Multithreading with `sleep()`
✔ `join()` method
✔ Thread synchronization (Lock)
✔ Or give a **real-world example (download + print at same time)**

Just tell me 👍
---
Here is a **correct, exam-ready multithreaded Python program** that:

✔ Uses **two threads**
✔ One prints **square**
✔ Another prints **cube**
✔ Uses **thread synchronization (Lock)**

---

## ✅ Multithreaded Program with Synchronization

```python
import threading

# Creating a Lock object for synchronization
lock = threading.Lock()

# Function to print square
def print_square(num):
    with lock:   # Acquire lock
        print("Square of", num, "is:", num * num)

# Function to print cube
def print_cube(num):
    with lock:   # Acquire lock
        print("Cube of", num, "is:", num * num * num)

# Main Program
number = int(input("Enter a number: "))

# Creating threads
t1 = threading.Thread(target=print_square, args=(number,))
t2 = threading.Thread(target=print_cube, args=(number,))

# Starting threads
t1.start()
t2.start()

# Waiting for both threads to finish
t1.join()
t2.join()

print("Done")
```

---

## ▶ Sample Output

**Input:**

```
Enter a number: 4
```

**Output:**

```
Square of 4 is: 16
Cube of 4 is: 64
Done
```

---

# 🧠 Explanation (Simple Words)

## 1️⃣ Lock (Thread Synchronization)

```python
lock = threading.Lock()
```

👉 Lock ensures that **only one thread runs at a time** inside the critical section
👉 Prevents **data conflict / mixed output**

---

## 2️⃣ Square Thread

```python
def print_square(num):
    with lock:
        print("Square of", num, "is:", num * num)
```

👉 `with lock:` means:

* Thread **takes lock**
* Executes code
* **Releases lock automatically**

---

## 3️⃣ Cube Thread

```python
def print_cube(num):
    with lock:
        print("Cube of", num, "is:", num * num * num)
```

👉 Same lock used → **synchronized execution**

---

## 4️⃣ Thread Creation

```python
t1 = threading.Thread(target=print_square, args=(number,))
t2 = threading.Thread(target=print_cube, args=(number,))
```

👉 Two threads:

* `t1` → square
* `t2` → cube

---

## 5️⃣ Start and Join

```python
t1.start()
t2.start()

t1.join()
t2.join()
```

👉 `start()` → threads run
👉 `join()` → main program waits until both finish

---

# 📝 Short Exam Answer

**Multithreading** allows multiple threads to execute concurrently.
**Thread synchronization** using `Lock` ensures that only one thread accesses shared resources at a time, avoiding conflicts.

---

If you want, I can also give:

✔ Version with `time.sleep()` to show parallelism
✔ Without synchronization (to show problem)
✔ Or a 2-mark short program

Just tell me 😊
