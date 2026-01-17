Below is a **clear, exam-ready answer (5–10 marks)** written in **simple language with examples**.

---

## Techniques for Making Images Responsive

Responsive images automatically **adjust their size and resolution** based on **screen size, device type, and resolution**, ensuring better performance and user experience.

---

### **Techniques for Making Images Responsive**

### 1️⃣ Using CSS (`max-width`)

```css
img {
  max-width: 100%;
  height: auto;
}
```

**Effect:**
Image never overflows its container and scales with screen size.

---

### 2️⃣ Using Percentage Width

```css
img {
  width: 100%;
}
```

**Effect:**
Image adapts to the width of its parent element.

---

### 3️⃣ Using Viewport Units

```css
img {
  width: 50vw;
}
```

**Effect:**
Image size adjusts according to viewport width.

---

### 4️⃣ Using the `<picture>` Element

```html
<picture>
  <source media="(max-width:600px)" srcset="mobile.jpg">
  <img src="desktop.jpg">
</picture>
```

**Effect:**
Loads different images for different screen sizes.

---

### 5️⃣ Using `srcset` and `sizes` Attributes (MOST IMPORTANT)

---

## How **srcset** Attribute Works

`srcset` provides **multiple image files** with different resolutions or widths.
The browser chooses the **most appropriate image** based on device resolution and screen size.

### Example:

```html
<img src="small.jpg"
     srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w">
```

**Explanation:**

* `480w`, `800w`, `1200w` indicate image widths
* Browser selects the best image automatically

---

## How **sizes** Attribute Works

`sizes` tells the browser **how much space the image will occupy** on different screen sizes.

### Example:

```html
<img src="small.jpg"
     srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 100vw, 50vw">
```

**Explanation:**

* On screens ≤ 600px → image uses **100% viewport width**
* On larger screens → image uses **50% viewport width**
* Browser downloads the most suitable image

---

## Advantages of `srcset` and `sizes`

* Faster page loading
* Reduced bandwidth usage
* Better image quality on all devices
* Improved user experience

---

## **Conclusion**

Responsive images ensure **flexibility, performance, and accessibility**.
Using `srcset` and `sizes` allows browsers to **load the right image at the right time**.

---

### 🔑 Exam Tip

✔️ Write **CSS method + srcset + sizes**
✔️ Add **example with explanation**
✔️ Underline keywords like *responsive, performance, browser selection*

💯 This answer is **perfect for full marks**.
