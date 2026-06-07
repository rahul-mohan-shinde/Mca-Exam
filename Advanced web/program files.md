Haan. Agar paper me **programs aane wale hain**, to theory ke saath ye programs zaroor yaad karo. Main exam-oriented shortest working programs de raha hoon.

# 1. Node.js Event Emitter Program

```js
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('greet', () => {
    console.log('Hello Rahul');
});

emitter.emit('greet');
```

### Output

```
Hello Rahul
```

### Yaad Rakho

* `on()` → event register
* `emit()` → event call

---

# 2. Node.js File Read Program

```js
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

### Use

Asynchronous file reading.

---

# 3. Node.js File Write Program

```js
const fs = require('fs');

fs.writeFile('data.txt', 'Hello World', (err) => {
    if (err) throw err;
    console.log('File Saved');
});
```

### Output

```
File Saved
```

---

# 4. Path Module Program

```js
const path = require('path');

console.log(path.basename('/home/user/file.txt'));
```

### Output

```
file.txt
```

---

# 5. Angular Service Program

## employee.service.ts

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees = ['Rahul', 'Amit', 'Rohit'];

  getEmployees() {
    return this.employees;
  }
}
```

## component.ts

```ts
constructor(private empService: EmployeeService){}

employees = this.empService.getEmployees();
```

### Viva Line

Service is used to share data and business logic between components.

---

# 6. Dependency Injection Program

```ts
constructor(private empService: EmployeeService) {}
```

### Explanation

Angular automatically provides the service object.

Yehi Dependency Injection hai.

---

# 7. Reactive Form Program

```ts
import { FormGroup, FormControl } from '@angular/forms';

profileForm = new FormGroup({
  name: new FormControl(''),
  email: new FormControl('')
});
```

### HTML

```html
<form [formGroup]="profileForm">
  <input formControlName="name">
  <input formControlName="email">
</form>
```

---

# 8. Validation Program

```ts
import { Validators } from '@angular/forms';

profileForm = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', Validators.email)
});
```

### Validation Types

```ts
Validators.required
Validators.email
Validators.minLength(5)
Validators.maxLength(20)
```

---

# 9. Promise Program

```js
let promise = new Promise((resolve, reject) => {
    resolve("Success");
});

promise
.then(result => console.log(result))
.catch(error => console.log(error))
.finally(() => console.log("Completed"));
```

### Output

```
Success
Completed
```

### Yaad Rakho

* `.then()` → success
* `.catch()` → error
* `.finally()` → always execute

---

# 10. Next.js Dynamic Route

## Folder

```
pages/product/[id].js
```

## Code

```js
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();

  return <h1>Product ID: {router.query.id}</h1>;
}
```

### URL

```
/product/101
```

### Output

```
Product ID: 101
```

---

# 11. Next.js API Route

## pages/api/hello.js

```js
export default function handler(req, res) {
  res.status(200).json({
    message: "Hello World"
  });
}
```

### URL

```
localhost:3000/api/hello
```

---

# 12. CSS Module Program

## styles/Home.module.css

```css
.title {
  color: blue;
}
```

## Home.js

```js
import styles from '../styles/Home.module.css';

export default function Home() {
  return <h1 className={styles.title}>Hello</h1>;
}
```

---

## Last-Minute Program List (Most Important)

Paper se pehle bas ye 6 programs dekh lo:

1. Event Emitter
2. File Read/Write
3. Angular Service
4. Dependency Injection
5. Reactive Form + Validation
6. Promise (.then .catch .finally)
7. Dynamic Route (Next.js)

### Active Recall

1. Event Emitter me `on()` aur `emit()` ka kya kaam hai?
2. Service aur Dependency Injection me difference kya hai?
3. Reactive Form me `FormGroup` aur `FormControl` kya hote hain?
4. Promise me `.finally()` kab execute hota hai?
5. Dynamic Route me `[id]` ka matlab kya hai?

In 5 questions ke answers bina dekhe de do. Agar ye aa gaye, to exam me programs wale questions kaafi had tak handle kar loge.
