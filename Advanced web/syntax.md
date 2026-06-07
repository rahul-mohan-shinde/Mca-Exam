Ye list ke hisab se exam me mostly **programs** aayenge. Main har topic ka **short exam-ready code** de raha hoon. Inme se 80–90% chance hai ki isi type ke programs puchhe jayen.

# 1. One Way Data Binding

### app.component.ts

```ts
export class AppComponent {
  name = "Rahul";
}
```

### app.component.html

```html
<h2>{{name}}</h2>
```

**Output:** Rahul

---

# 2. Two Way Data Binding

### app.module.ts

```ts
import { FormsModule } from '@angular/forms';

imports: [FormsModule]
```

### app.component.ts

```ts
export class AppComponent {
  name = "";
}
```

### app.component.html

```html
<input [(ngModel)]="name">
<p>{{name}}</p>
```

---

# 3. *ngFor Directive

### app.component.ts

```ts
export class AppComponent {
  fruits = ["Apple","Mango","Banana"];
}
```

### app.component.html

```html
<ul>
  <li *ngFor="let f of fruits">
    {{f}}
  </li>
</ul>
```

---

# 4. *ngIf Directive

### app.component.ts

```ts
export class AppComponent {
  show = true;
}
```

### app.component.html

```html
<h2 *ngIf="show">Welcome</h2>
```

---

# 5. Angular Pipes

### app.component.ts

```ts
export class AppComponent {
  name="rahul";
  today=new Date();
}
```

### app.component.html

```html
{{name | uppercase}}
<br>
{{today | date}}
```

---

# 6. Service & Dependency Injection

### data.service.ts

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class DataService {

  getMessage(){
    return "Hello from Service";
  }

}
```

### app.component.ts

```ts
import { DataService } from './data.service';

export class AppComponent {

  msg="";

  constructor(private ds:DataService){
    this.msg=this.ds.getMessage();
  }

}
```

### app.component.html

```html
{{msg}}
```

---

# 7. Fetch Data from API

### app.module.ts

```ts
import { HttpClientModule } from '@angular/common/http';

imports:[HttpClientModule]
```

### app.component.ts

```ts
import { HttpClient } from '@angular/common/http';

export class AppComponent {

  users:any=[];

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/users')
    .subscribe(data=>{
      this.users=data;
    });
  }
}
```

### app.component.html

```html
<ul>
 <li *ngFor="let u of users">
   {{u.name}}
 </li>
</ul>
```

---

# 8. Filter Example

### app.component.ts

```ts
export class AppComponent {

  nums=[10,20,30,40];

  result=this.nums.filter(x=>x>20);

}
```

### Output

```ts
[30,40]
```

---

# 9. Promise Example

### app.component.ts

```ts
export class AppComponent {

  ngOnInit(){

    let p=new Promise((resolve)=>{
      setTimeout(()=>{
        resolve("Data Loaded");
      },2000);
    });

    p.then(data=>{
      console.log(data);
    });

  }

}
```

---

# 10. Form Validation (Login Form)

### app.module.ts

```ts
import { FormsModule } from '@angular/forms';

imports:[FormsModule]
```

### app.component.html

```html
<form #f="ngForm">

<input
type="email"
name="email"
ngModel
required>

<input
type="password"
name="password"
ngModel
required
minlength="6">

<button [disabled]="!f.valid">
Login
</button>

</form>
```

---

# Next.js Dynamic Route

### pages/posts/[id].js

```js
import { useRouter } from 'next/router';

export default function Post() {

 const router = useRouter();
 const { id } = router.query;

 return (
  <h1>Post ID : {id}</h1>
 );

}
```

URL:

```txt
/posts/1
/posts/2
/posts/3
```

---

# Next.js Navigation

### index.js

```js
import Link from 'next/link';

export default function Home(){
 return(
  <>
   <Link href="/about">About</Link>
   <br/>
   <Link href="/profile">Profile</Link>
  </>
 );
}
```

### about.js

```js
export default function About(){
 return <h1>About Page</h1>;
}
```

### profile.js

```js
export default function Profile(){
 return <h1>Profile Page</h1>;
}
```

# 10-Minute Exam Revision

Yaad rakho:

1. `{{ }}` → One Way Binding
2. `[(ngModel)]` → Two Way Binding
3. `*ngFor` → Loop
4. `*ngIf` → Condition
5. `| uppercase` → Pipe
6. Service + Constructor Injection → DI
7. `HttpClient.get()` → API Fetching
8. `filter()` → Data Filtering
9. `Promise.then()` → Async Data
10. `required`, `minlength` → Validation
11. `[id].js` → Dynamic Route
12. `<Link>` → Navigation

Agar examiner program likhne bole aur exact yaad na ho, to upar wale codes likh dena. Inse marks mil jayenge.
