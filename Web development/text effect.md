Here is a simple **HTML + CSS3 example** that applies a **gradient text effect** on a heading, smoothly transitioning from **blue to purple**.

---

### ✅ HTML5 + CSS3 Code

```html
<!DOCTYPE html>
<html>
<head>
    <title>Gradient Text</title>
    <style>
        h1 {
            font-size: 48px;
            font-family: Arial, sans-serif;

            /* Gradient background */
            background: linear-gradient(to right, blue, purple);

            /* Clip background to text */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            /* For better compatibility */
            background-clip: text;
            color: transparent;
        }
    </style>
</head>
<body>

    <h1>Gradient Text Effect</h1>

</body>
</html>
```

---

### 🧠 Explanation (Exam Ready)

* `linear-gradient(to right, blue, purple)` creates a smooth color transition.
* `background-clip: text` applies the background only to the text.
* `color: transparent` makes the actual text color invisible so the gradient shows through.

---

If you want:
👉 **Animated gradient text**
👉 **Shorter exam version**
👉 Or explanation in **Hindi / Marathi**

Ju
st tell me 😊
