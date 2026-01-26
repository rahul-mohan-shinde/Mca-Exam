Here is a **simple, exam-ready solution** to:

## **Design a responsive three-column layout that collapses into a single column on mobile**

---

## ✅ HTML + CSS Code

```html
<!DOCTYPE html>
<html>
<head>
    <title>Responsive 3 Column Layout</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
        }

        .container {
            width: 100%;
            display: flex;
        }

        .column {
            width: 33.33%;
            padding: 15px;
            border: 1px solid #ccc;
            text-align: center;
        }

        /* Mobile View */
        @media (max-width: 600px) {
            .container {
                flex-direction: column;
            }

            .column {
                width: 100%;
            }
        }
    </style>
</head>
<body>

    <h2>Responsive Three Column Layout</h2>

    <div class="container">
        <div class="column">Column 1</div>
        <div class="column">Column 2</div>
        <div class="column">Column 3</div>
    </div>

</body>
</html>
```

---

## 🧠 How It Works (Short Explanation)

* On **desktop / large screens**:
  → Three columns appear side-by-side using `flex` and `width: 33.33%`

* On **mobile (screen ≤ 600px)**:
  → `flex-direction: column` makes all columns stack vertically
  → Each column becomes `width: 100%`

---

## ✍ Exam Conclusion Line

> **Using CSS media queries, the three-column layout adjusts automatically for smaller screens by changing the layout into a single column, making the design responsive for mobile devices.**
---
---

If you want:
👉 **Float-based version (without flex)**
👉 **Bootstrap grid version**
👉 **Only CSS (theory answer)**


Bas bolo, Rahul 😊
---
Here is the **exact CSS code using media queries** to achieve:

👉 **100% width on small screens (< 600px)**
👉 **50% width on larger screens (≥ 600px)**

---

## ✅ CSS Code

```css
div {
    width: 50%;
    margin: auto;
}

/* For small screens */
@media (max-width: 600px) {
    div {
        width: 100%;
    }
}
```

---

## 🧠 How It Works

* **Default (Desktop / Large screens)** → `width: 50%`
* **When screen width ≤ 600px (Mobile)** → `width: 100%`
* Media query overrides the default style on smaller devices.

---

## ✍ Exam Conclusion Line

> **Using media queries, the div automatically changes its width based on screen size, making the layout responsive for both mobile and larger screens.**

---

If you want:
👉 **HTML + CSS full example**
👉 **Bootstrap version**
👉 Or **short 2–3 line answer for theory paper**

Bas bolo, Rahul 😊

