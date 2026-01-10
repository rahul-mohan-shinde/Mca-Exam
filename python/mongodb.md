Theek hai 👍
Main **isi question ko code ke saath**, aur **har step ka simple explanation** dunga, taaki tumhe clear ho jaye.

---

# 🟢 STEP 0: Database aur Collection banao

```js
use collegeDB
```

👉 `collegeDB` naam ka database use/create kar rahe hain.

```js
db.createCollection("Student_info")
```

👉 `Student_info` naam ka collection (table) bana diya.

---

# 1️⃣ Insert 5 Documents (Students ka data daalna)

```js
db.Student_info.insertMany([
  { RollNo: 1, Name: "Rahul", Course: "MCA", TotalMarks: 450, Percentage: 75 },
  { RollNo: 2, Name: "Amit", Course: "BCA", TotalMarks: 480, Percentage: 80 },
  { RollNo: 3, Name: "Neha", Course: "MCA", TotalMarks: 420, Percentage: 70 },
  { RollNo: 4, Name: "Pooja", Course: "MBA", TotalMarks: 460, Percentage: 76 },
  { RollNo: 5, Name: "Karan", Course: "MCA", TotalMarks: 390, Percentage: 65 }
])
```

🔎 **Explanation:**

* `insertMany()` → ek saath **5 students ka data add** kar raha hai.
* Har `{ }` ek student ka record hai.

---

# 2️⃣ Find students getting percentage between 70 to 80

```js
db.Student_info.find({ Percentage: { $gte: 70, $lte: 80 } })
```

🔎 **Explanation:**

* `$gte: 70` → percentage **70 se bada ya barabar**
* `$lte: 80` → percentage **80 se chhota ya barabar**
  👉 Sirf 70–80% wale students dikhenge.

---

# 3️⃣ Update Roll No for students named "Rahul"

```js
db.Student_info.updateOne(
  { Name: "Rahul" },
  { $set: { RollNo: 10 } }
)
```

🔎 **Explanation:**

* `{ Name: "Rahul" }` → Rahul ko dhundhta hai
* `$set` → uska **RollNo change** karta hai
  👉 Ab Rahul ka Roll No = 10 ho jayega.

---

# 4️⃣ Display top 5 students according to percentage

```js
db.Student_info.find().sort({ Percentage: -1 }).limit(5)
```

🔎 **Explanation:**

* `sort({ Percentage: -1 })` → **descending order** (high to low)
* `limit(5)` → sirf **top 5 students** dikhao.

---

# 5️⃣ Display students having highest percentage

```js
db.Student_info.find().sort({ Percentage: -1 }).limit(1)
```

🔎 **Explanation:**

* Pehle sabko **highest percentage ke order me sort** karta hai
* `limit(1)` → sirf **topper student** dikhata hai.

---

# 6️⃣ Find all students of course MCA

```js
db.Student_info.find({ Course: "MCA" })
```

🔎 **Explanation:**

* `{ Course: "MCA" }` → sirf **MCA wale students** filter karta hai.

---

# 7️⃣ Sort all students in descending order of percentage

```js
db.Student_info.find().sort({ Percentage: -1 })
```

🔎 **Explanation:**

* `-1` → **descending order**
  👉 Students **highest % se lowest %** tak dikhenge.

---

# ✅ PURE QUESTION KA SUMMARY

Tumne MongoDB me ye seekha:

| Operation | Code ka kaam              |
| --------- | ------------------------- |
| Insert    | Data add karna            |
| Find      | Data search / filter      |
| Update    | Data change karna         |
| Sort      | Order me lagana           |
| Limit     | Sirf kuch records dikhana |

---

# ✍️ EXAM ME LIKHNE KE LIYE (SHORT)

> **Is program me Student_info collection create karke insert, find, update aur sort operations perform kiye gaye hain. Ye MongoDB ke basic database operations ko demonstrate karta hai.**

---

Agar tum chaho, next step me main:
👉 **same program handwritten exam style me**
👉 ya **Python + MongoDB version bhi code ke saath**
samjha sakta hoon 😊
