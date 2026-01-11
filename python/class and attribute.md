Here is a **clear, exam-ready Python program** for your question:

---

## ✅ Python Program: `BankDemo` Class

```python
class BankDemo:
    def __init__(self, bankaccount_no, name, balance):
        self.bankaccount_no = bankaccount_no
        self.name = name
        self.balance = balance

    # Method to deposit money
    def deposit(self, amount):
        if amount > 0:
            self.balance = self.balance + amount
            print("Amount Deposited:", amount)
        else:
            print("Invalid deposit amount")

    # Method to withdraw money
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance = self.balance - amount
            print("Amount Withdrawn:", amount)
        else:
            print("Insufficient Balance")

    # Method to check balance
    def checkbalance(self):
        print("Account Number:", self.bankaccount_no)
        print("Account Holder Name:", self.name)
        print("Current Balance:", self.balance)


# -------- Main Program --------
acc = BankDemo(101, "Rahul", 5000)

acc.checkbalance()
acc.deposit(2000)
acc.withdraw(3000)
acc.checkbalance()
```

---

## ▶ Sample Output

```
Account Number: 101
Account Holder Name: Rahul
Current Balance: 5000
Amount Deposited: 2000
Amount Withdrawn: 3000
Account Number: 101
Account Holder Name: Rahul
Current Balance: 4000
```

---

# 🧠 Simple Explanation

### 1️⃣ Class Definition

```python
class BankDemo:
```

👉 Bank account ka blueprint

---

### 2️⃣ Constructor (`__init__`)

```python
def __init__(self, bankaccount_no, name, balance):
```

👉 Account number, name, aur balance store karta hai

---

### 3️⃣ Deposit Method

```python
def deposit(self, amount):
```

👉 Balance me paisa add karta hai

---

### 4️⃣ Withdraw Method

```python
def withdraw(self, amount):
```

👉 Agar balance sufficient ho to paisa minus karta hai
👉 Warna: **"Insufficient Balance"**

---

### 5️⃣ Check Balance Method

```python
def checkbalance(self):
```

👉 Account details aur current balance print karta hai

---

## 📝 Short Exam Note

**This program defines a class `BankDemo` with attributes `bankaccount_no`, `name`, and `balance`, and provides methods to deposit money, withdraw money, and check account balance.**

---

Agar tum chaho to main:
✔ **User input version**
✔ **Exception handling add karke**
✔ **Multiple accounts ka program**

bhi bana kar de sakta hoon 😊
