Theek hai 👍
Main tumhe **Python + MongoDB (PyMongo)** ka **complete program** dunga **aur har step ka simple explanation** bhi, taaki tum samajh sako.

---

# 🔹 STEP–0: MongoDB se Python connect karna

```python
from pymongo import MongoClient

# MongoDB server se connect
client = MongoClient("mongodb://localhost:27017/")

# Database select / create
db = client["filmDB"]

# Collection select / create
movies = db["movies"]
```

### 🧠 Explanation:

* `MongoClient()` → MongoDB server se connection
* `filmDB` → database ka naam
* `movies` → collection (table)

---

# 1️⃣ Insert 5 Documents (Movies ka data add karna)

```python
movies.insert_many([
    {"title": "Devra", "writer": "A. Kumar", "year": 2008, "actor": "Rajnikant", "director": "R. Kapoor"},
    {"title": "Robot", "writer": "Shankar", "year": 2010, "actor": "Rajnikant", "director": "Shankar"},
    {"title": "Inception", "writer": "Nolan", "year": 2010, "actor": "DiCaprio", "director": "Christopher Nolan"},
    {"title": "Avatar", "writer": "Cameron", "year": 2009, "actor": "Worthington", "director": "James Cameron"},
    {"title": "Bahubali", "writer": "Vijayendra", "year": 2015, "actor": "Prabhas", "director": "R. Rajamouli"}
])
```

### 🧠 Explanation:

* `insert_many()` → ek saath **5 movies** ka data database me daalta hai
* Har `{}` ek movie ka record hai

---

# 2️⃣ Get all movies released before 2010

```python
print("Movies released before 2010:")
for movie in movies.find({"year": {"$lt": 2010}}):
    print(movie)
```

### 🧠 Explanation:

* `$lt` = less than
  👉 Sirf wo movies dikhenge jinka **year 2010 se chhota** hai

---

# 3️⃣ Sort the movies according to director

```python
print("Movies sorted by director:")
for movie in movies.find().sort("director", 1):
    print(movie)
```

### 🧠 Explanation:

* `sort("director", 1)` → director ke naam ke **A–Z order me** movies dikhata hai
* `1` = ascending order

---

# 4️⃣ Get all movies with actor = "Rajnikant"

```python
print("Movies with actor Rajnikant:")
for movie in movies.find({"actor": "Rajnikant"}):
    print(movie)
```

### 🧠 Explanation:

👉 Sirf wo movies dikhenge jisme **actor Rajnikant** hai

---

# 5️⃣ Get all documents where director includes "R. Kapoor"

```python
print("Movies directed by R. Kapoor:")
for movie in movies.find({"director": "R. Kapoor"}):
    print(movie)
```

### 🧠 Explanation:

👉 Jinke **director ka naam "R. Kapoor"** hai, sirf wahi movies milengi

---

# 6️⃣ Update writer of movie "Devra"

```python
movies.update_one(
    {"title": "Devra"},
    {"$set": {"writer": "Updated Writer"}}
)
print("Writer of movie 'Devra' updated.")
```

### 🧠 Explanation:

* `{ "title": "Devra" }` → Devra movie ko dhundhta hai
* `$set` → uska **writer change** karta hai

---

# 7️⃣ Delete movie "Devra"

```python
movies.delete_one({"title": "Devra"})
print("Movie 'Devra' deleted.")
```

### 🧠 Explanation:

👉 Jis movie ka title **Devra** hai, usko **database se hata deta hai**

---

# ✅ PURE QUESTION KA SUMMARY

Is Python program me tumne ye seekha:

| Step   | Kya seekha                   |
| ------ | ---------------------------- |
| Insert | Movies ka data add karna     |
| Find   | Condition ke base par search |
| Sort   | Order me data dikhana        |
| Update | Data change karna            |
| Delete | Data remove karna            |

---

# ✍️ EXAM ME LIKHNE KE LIYE (SHORT ANSWER)

> **Is program me Python (PyMongo) ke through MongoDB ke movies collection par insert, find, sort, update aur delete operations perform kiye gaye hain. Ye real application me database handling ko demonstrate karta hai.**

---

Agar tum chaho to next step me main:
👉 **Same program ko “handwritten exam format” me short bana doon**
👉 Ya **har command ka diagram / flow samjha doon**
bhi kar sakta hoon 😊
