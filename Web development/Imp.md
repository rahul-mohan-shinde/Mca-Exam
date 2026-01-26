Samjha Rahul… **time bilkul nahi hai** 😌
Toh ab hum **smart तरीके se PASS** pe focus karte hain — *minimum effort, maximum marks*.

Main tumhe **ready-to-write short code answers** de raha hoon jo directly paper me likh sakte ho.

---

## ✅ Q1 (b) – CSS3: Any 5 Pseudo Classes

```html
<style>
a:hover { color:red; }          /* Hover */
button:active { color:blue; }  /* Active */
input:focus { border:2px solid green; } /* Focus */
li:first-child { font-weight:bold; } /* First child */
li:nth-child(2) { color:orange; } /* Nth child */
</style>
```

---

## ✅ Q1 (c) – HTML5 Drag & Drop (draggable)

```html
<div id="box" draggable="true" ondragstart="drag(event)">Drag Me</div>
<div id="drop" ondragover="allowDrop(event)" ondrop="drop(event)">Drop Here</div>

<script>
function allowDrop(e){ e.preventDefault(); }
function drag(e){ e.dataTransfer.setData("text", e.target.id); }
function drop(e){
 e.preventDefault();
 var data = e.dataTransfer.getData("text");
 e.target.appendChild(document.getElementById(data));
}
</script>
```

---

## ✅ Q1 (d) – Gradient Text (Blue → Purple)

```html
<style>
h1{
 background: linear-gradient(to right, blue, purple);
 -webkit-background-clip:text;
 color: transparent;
}
</style>
<h1>Gradient Text</h1>
```

---

## ✅ Q2 (d) – Media Query (100% on small, 50% on large)

```css
div{ width:50%; }

@media (max-width:600px){
 div{ width:100%; }
}
```

---

## ✅ Q3 (b) – Simple Blog Page (Create & Read)

```html
<form method="post">
<input type="text" name="post">
<button>Add</button>
</form>

<?php
if(isset($_POST['post'])){
 file_put_contents("blog.txt", $_POST['post']."\n", FILE_APPEND);
}
echo nl2br(file_get_contents("blog.txt"));
?>
```

---

## ✅ Q4 – SQL Queries

```sql
CREATE TABLE users(
id INT PRIMARY KEY,
username VARCHAR(50),
email VARCHAR(50),
password VARCHAR(20)
);

UPDATE users SET email='smith@gmail.com' WHERE username='Smith';

INSERT INTO users VALUES(6,'Tom','tom@gmail.com','pass111');

DELETE FROM users WHERE username='Clark';

SELECT * FROM users ORDER BY username ASC;
```

---

## 🔥 Exam Writing Strategy (30 seconds rule)

हर answer ऐसे लिखो:
1️⃣ **Heading / Question ka naam**
2️⃣ **2–3 lines explanation**
3️⃣ **Code block**

👉 पूरा सही नहीं भी हुआ, structure दिखा = marks मिलेंगे.

---

## 💪 Rahul, Real Talk

Tum panic me ho, par:
✔ Tumne PYQs dekhe
✔ Tumhe code ka basic idea hai
✔ Tum short answers likh सकते हो

👉 **इतना pass होने के लिए काफी है.**

---

Agar चाहो तो अभी भी बोल सकते हो:
👉 **“Q1 pura likh ke de do”**
👉 **“Sirf SQL wala strong kara do”**
👉 **“CodeIgniter ka login ka short code chahiye”**

Main bina time waste kiye **exact exam-ready answer** de dunga. 💯
