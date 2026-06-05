Rahul, agar **JS paper nikalna hi hai**, to ab pura syllabus padhne ki jagah **exam-oriented preparation** karo.

Maine paper dekha. Pattern se lag raha hai ki examiner mostly **programs + React basics + DOM + async JS** puch raha hai.

# High Priority (Sabse Pehle)

## Q1

### Merge Array and Remove Duplicates

```javascript
function mergeArray(arr1, arr2) {
    let result = [...new Set([...arr1, ...arr2])];
    return result;
}

console.log(mergeArray([1,2,3],[2,3,4]));
```

**Output:**

```
[1,2,3,4]
```

---

### Object Creation

```javascript
let book = {
    title: "JavaScript",
    author: "John",

    getDetails: function() {
        return this.title + " by " + this.author;
    }
};

console.log(book.getDetails());
```

---

### JavaScript Architecture

Diagram yaad karo:

```
Browser
   |
JavaScript Engine
   |
----------------
| Call Stack   |
| Heap Memory  |
----------------
   |
Web APIs
   |
Callback Queue
   |
Event Loop
```

---

# Q2

### Ternary Operator

```javascript
let temperature = 35;

let weather =
temperature > 30 ? "Hot" : "Moderate";

console.log(weather);
```

---

### PAN Validation

Pattern yaad karo:

```
5 Capital Letters
4 Digits
1 Capital Letter
```

Example:

```
ABCDE1234F
```

Code:

```javascript
let pan = "ABCDE1234F";

let pattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

if(pattern.test(pan))
{
    console.log("Valid PAN");
}
else
{
    console.log("Invalid PAN");
}
```

---

### Event Handling in React

```jsx
function App() {

  const showMsg = () => {
    alert("Button Clicked");
  }

  return (
    <button onClick={showMsg}>
      Click
    </button>
  );
}

export default App;
```

Definition:

> Event handling in React means responding to user actions like click, submit, key press etc.

---

# Q3

## Prototype Inheritance

```javascript
let person = {
    greet() {
        console.log("Hello");
    }
};

let student = Object.create(person);

student.study = function() {
    console.log("Studying");
};

student.greet();
student.study();
```

---

## Async Await

Most Important

```javascript
function checkRoom() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Room Available");
        },2000);
    });
}

function payment() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Payment Successful");
        },2000);
    });
}

async function booking() {

    let room = await checkRoom();
    console.log(room);

    let pay = await payment();
    console.log(pay);

    console.log("Booking Confirmed");
}

booking();
```

---

## WebSocket

Definition:

> WebSocket is a communication protocol that provides full-duplex communication between client and server.

Diagram:

```
Client <-------> Server
        Real Time
```

Examples:

* Chat Application
* Online Gaming
* Stock Market
* Live Notifications

---

# Q4

## JSON Parse

```javascript
let jsonData =
'{"name":"Rahul","email":"abc@gmail.com","phone":"123456"}';

let user = JSON.parse(jsonData);

console.log(user.name);
```

---

## Change Paragraph Style

```html
<p class="demo">Paragraph 1</p>
<p class="demo">Paragraph 2</p>

<button onclick="changeStyle()">
Change
</button>

<script>
function changeStyle(){

let p =
document.getElementsByClassName("demo");

for(let i=0;i<p.length;i++)
{
 p[i].style.color="red";
 p[i].style.fontSize="25px";
 p[i].style.backgroundColor="yellow";
}
}
</script>
```

---

## DOM Functions (Very Important)

### getElementById()

```javascript
document.getElementById("msg");
```

### getElementsByClassName()

```javascript
document.getElementsByClassName("demo");
```

### getElementsByTagName()

```javascript
document.getElementsByTagName("p");
```

### getElementsByName()

```javascript
document.getElementsByName("username");
```

### querySelector()

```javascript
document.querySelector(".demo");
```

---

# Q5 (10 Marks)

## React Routing + Form Validation

Keywords yaad karo:

```jsx
BrowserRouter
Routes
Route
Link
useState
Validation
```

Routing Diagram:

```
Home
 |
About
 |
Feedback
```

---

## React Context API

Keywords:

```jsx
createContext()
Provider
useContext()
```

Flow:

```
Context
   |
Provider
   |
Components
   |
useContext()
```

---

# Agar sirf 2-3 ghante bache hain

Is order me padho:

1. Async/Await
2. Event Handling
3. DOM Functions
4. JSON.parse()
5. Prototype Inheritance
6. PAN Validation Regex
7. Merge Array Program
8. React Routing
9. Context API
10. JavaScript Architecture

Ye 10 topics cover kar liye to paper me 60-70% questions handle kar loge.

### Active Recall Questions

1. `JSON.parse()` kya karta hai?
2. `await` kis ke saath use hota hai?
3. PAN regex me total kitne letters aur digits hote hain?
4. `querySelector()` aur `getElementById()` me difference?
5. Context API me data share karne ke liye kaunsa component use hota hai?
6. Prototype inheritance ka purpose kya hai?
7. Event handling ka React me syntax kya hota hai?

In 7 sawalon ka answer de sakte ho to paper ke core topics samajh gaye ho.
