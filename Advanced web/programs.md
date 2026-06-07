Yehi sabse important baat hai. Theory samajh aa gayi, lekin **paper me program aaya aur syntax bhool gaye to problem hogi.**

Achhi baat ye hai ki tumhare paper pattern me **har topic ke 1-2 standard programs hi ghum phir kar aate hain.**

Agar abhi sirf ye 5 programs kar liye to kaafi coverage ho jayegi:

# 1. Promise Program ⭐⭐⭐⭐⭐

```js
const myPromise = new Promise((resolve, reject) => {
  let success = true;

  if(success)
    resolve("Success");
  else
    reject("Failed");
});

myPromise
 .then(result => console.log(result))
 .catch(error => console.log(error))
 .finally(() => console.log("Completed"));
```

### Yaad Kaise Rakho?

```text
Promise
 ↓
then()
 ↓
catch()
 ↓
finally()
```

---

# 2. Reverse String (Arrow Function) ⭐⭐⭐⭐

```js
const reverseString = str =>
 str.split('').reverse().join('');

console.log(reverseString("HELLO"));
```

### Logic

```text
HELLO
↓ split
H E L L O
↓ reverse
O L L E H
↓ join
OLLEH
```

---

# 3. Prime Number Program ⭐⭐⭐⭐

```ts
let num = 13;
let prime = true;

for(let i=2;i<num;i++){
  if(num%i===0){
    prime=false;
    break;
  }
}

if(prime)
 console.log("Prime");
else
 console.log("Not Prime");
```

### Logic

```text
13 ko 2,3,4,5... se divide karo
Kahin divide hua?
Yes → Not Prime
No → Prime
```

---

# 4. Employee Service Program ⭐⭐⭐⭐⭐

Ye bahut important hai.

### employee.service.ts

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  getEmployees(){
    return [
      {id:1,name:'Rahul'},
      {id:2,name:'Amit'}
    ];
  }
}
```

### component.ts

```ts
constructor(
 private empService: EmployeeService
){}

employees = this.empService.getEmployees();
```

### Exam Me Kya Likhna Hai?

* Service Create
* `@Injectable`
* `providedIn:'root'`
* `getEmployees()`

Bas.

---

# 5. Reactive Form Program ⭐⭐⭐⭐⭐

Ye almost pakka question hai.

```ts
import {
 FormGroup,
 FormControl,
 Validators
} from '@angular/forms';

employeeForm = new FormGroup({

 name: new FormControl(
   '',
   Validators.required
 ),

 email: new FormControl(
   '',
   Validators.email
 )

});
```

### Samajho

```text
FormGroup
 ↓
Name Field
Email Field

Validators
 ↓
required
email
```

---

# Agar Kal Exam Ho

To main ye yaad karunga:

### Theory

* Service
* Dependency Injection
* Reactive Forms
* Promise
* Pipes
* Dynamic Routing

### Programs

1. Promise
2. Reverse String
3. Prime Number
4. Employee Service
5. Reactive Form

**In 5 programs ke bahar kuch aaya to bhi inke concepts use karke likh sakte ho.**

Ab batao:

👉 **Reactive Form Program** line-by-line samjhen ya **Employee Service Program** line-by-line samjhen? Ye dono sabse important hain.
