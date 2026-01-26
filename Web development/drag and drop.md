Here is a simple **HTML5 program** that demonstrates the use of the **`draggable` attribute** to enable **drag-and-drop functionality**.

---

### ✅ HTML5 Code (Drag and Drop)

```html
<!DOCTYPE html>
<html>
<head>
    <title>HTML5 Drag and Drop</title>
    <style>
        #dragItem {
            width: 120px;
            padding: 10px;
            background-color: lightblue;
            text-align: center;
            cursor: grab;
        }

        #dropZone {
            width: 200px;
            height: 150px;
            border: 2px dashed black;
            margin-top: 20px;
            padding: 10px;
            text-align: center;
        }
    </style>

    <script>
        function allowDrop(event) {
            event.preventDefault();   // Allow dropping
        }

        function drag(event) {
            event.dataTransfer.setData("text", event.target.id);
        }

        function drop(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));
        }
    </script>
</head>
<body>

    <h2>HTML5 Drag and Drop Example</h2>

    <!-- Draggable element -->
    <div id="dragItem" draggable="true" ondragstart="drag(event)">
        Drag Me
    </div>

    <!-- Drop target -->
    <div id="dropZone" ondragover="allowDrop(event)" ondrop="drop(event)">
        Drop Here
    </div>

</body>
</html>
```

---

### 🧠 Explanation (Exam Ready)

| Attribute / Event  | Purpose                               |
| ------------------ | ------------------------------------- |
| `draggable="true"` | Makes the element draggable           |
| `ondragstart`      | Fires when dragging starts            |
| `ondragover`       | Allows the dragged item to be dropped |
| `ondrop`           | Handles the drop action               |

---

If you want:
👉 **Shorter code** for writing in exam
👉 Or **theory explanation in Hindi / Marathi**
👉 Or **example with images / list items**

Just tell me your
exam format. 📘
