| Pipe      | Example      | Output       |
| --------- | ------------ | ------------ |
| uppercase | rahul        | RAHUL        |
| lowercase | RAHUL        | rahul        |
| titlecase | rahul shinde | Rahul Shinde |
| date      | new Date()   | 06-Jun-2026  |
| currency  | 5000         | ₹5000        |
---
Attribute matlab tag ki extra information.

Agar Angular me condition ke hisab se button disable karna ho?

Maan lo:

isDisabled = true;

To hum likhenge:

<button [attr.disabled]="isDisabled">
Submit
</button>

Angular check karega:

isDisabled = true

To button disable ho jayega.
---
Main Concept

Attribute Binding ka matlab:

👉 Angular component ki value ko HTML attribute se connect karna.

Syntax:

[attr.attribute-name]="value"

Ye line exam me likhni hai.
---
Attribute Binding
<button [attr.disabled]="isDisabled">
Save
</button>

Yeh HTML Attribute ko control karta hai.
---

| Property Binding                  | Attribute Binding                 |
| --------------------------------- | --------------------------------- |
| DOM Property bind karta hai       | HTML Attribute bind karta hai     |
| `[disabled]`                      | `[attr.disabled]`                 |
| Zyada use hota hai                | Special cases me use hota hai     |
| Component state control karta hai | HTML attributes control karta hai |
---

Angular Me

Maan lo app me 4 modules hain:

Home
Employee
Admin
Reports
Eager Loading

App start hote hi:

Home
Employee
Admin
Reports

Sab load.
---
Lazy Loading

App start:

Home

User Admin page par gaya:

Admin Module Load

User Reports page par gaya:

Reports Module Load

Tab load.
---
Fayda Kya Hai?

Socho app 100 MB ka hai.

Eager Loading:

Start me 100 MB load

Lazy Loading:

Start me 20 MB load
Baaki baad me

Isliye app jaldi khulta hai.
---
Event Loop (Node.js ka Dil ❤️)

Ab sawal:

Node.js single-threaded hai.

To phir ek saath itne saare requests kaise handle karta hai?

Answer:

👉 Event Loop
---
Q1(c) Path Module

Pehle problem samjho.

Maan lo tumhare computer me file hai:

C:\Users\Rahul\Documents\resume.pdf

Ab mujhe sirf:

file name chahiye → resume.pdf
extension chahiye → .pdf
folder chahiye → Documents

Ye sab manually string se nikalna mushkil ho sakta hai.

Isliye Node.js ne Path Module diya.
---

Example
const path = require('path');

console.log(
 path.basename('/users/rahul/resume.pdf')
);

Output:

resume.pdf
---

dirname()

Ab maan lo path hai:

/home/test/photo.jpg

Aur mujhe file nahi, uska folder chahiye.

Yani:

/home/test

To use karte hain:

path.dirname('/home/test/photo.jpg')
---
extname()

Ab maan lo file hai:

resume.pdf

Main puchu:

👉 Ye PDF hai ya JPG ya TXT kaise pata chalega?

File ke end me jo aata hai use Extension bolte hain.

Examples:

resume.pdf  → .pdf
photo.jpg   → .jpg
---
Ab join() Method

Ye exam me bhi aa sakta hai.

Maan lo tum alag alag path parts ko jodna chahte ho.

users
rahul
documents

Inko mila kar:

users/rahul/documents

Banana hai.

To use karte hain:

path.join('users','rahul','documents')

Output:

users/rahul/documents
---
Path Module

The Path module is a built-in Node.js module used for handling and manipulating file paths. It provides methods such as:

basename() – returns file name.
dirname() – returns directory path.
extname() – returns file extension.
join() – joins path segments.

It helps developers work with file and directory paths efficiently.
---
Step 2: Arrow Function

Same function ko short me likhte hain:

const add = (a,b) => {
   return a+b;
}

Aur aur short:

const add = (a,b) => a+b;

Dono same hain.

Easy Trick

Arrow Function me:

function
↓
hat gaya

=>
↓
aa gaya
---
Reverse program
Exam Code
const reverseString = str =>
    str.split('').reverse().join('');

console.log(reverseString("HELLO"));

Output:

OLLEH
---
Angular Kya Karta Hai?

Angular bolta hai:

"Tum service mat banao, main provide karunga."

Isi ko Dependency Injection bolte hain.
---
Real Life Example

Socho college me Library hai.

Students books khud print nahi karte.

Sab library se lete hain.

Student 1
Student 2
Student 3
      ↓
   Library

Angular me:

Component 1
Component 2
Component 3
      ↓
    Service

Service = Library

Definition (Exam)

A Service is a reusable TypeScript class used to share data, business logic, and functionality among multiple Angular components.

Check Understanding

Question:

Agar 5 components ko same employee data chahiye to kya better hai?

A) Har component me same code likho

B) Ek Service banao aur sab use kare
---
Injector Kya Hota Hai?

Injector ka kaam:

Component ko service pahunchana
---
Restaurant Example
Kitchen = Service

Menu Card = Provider

Waiter = Injector

Customer = Component
---
Restaurant Example
Kitchen = Service

Menu Card = Provider

Waiter = Injector

Customer = Component
---
Structure

Reactive Form me 3 important cheeze hoti hain:

1. FormControl

Ek field control karta hai.

Name
2. FormGroup

Multiple fields ka group.

Name
Email
Age

Ye sab milkar FormGroup.

3. Validators

Rules check karte hain.

Name Empty Nahi Hona Chahiye

Email Valid Hona Chahiye

Password 8 Characters
---
Kitne phone numbers honge?

Fixed nahi hai.

Isliye FormArray use karenge.

Difference
FormControl

Single Field

Name
FormGroup

Fields Ka Group

Name
Email
Age
FormArray

Dynamic Fields

Skill1
Skill2
Skill3
Skill4
...
Exam Definition

FormArray is an Angular class used to manage a dynamic collection of form controls. It allows users to add or remove controls at runtime
---
Ab 3 possibilities hain.

1. Success

Pizza aa gaya.

Order Success
2. Failure

Restaurant ne cancel kar diya.

Order Failed
3. Final

Success ho ya Failure,

Tum app band kar dete ho.
Promise Bhi Yehi Karta Hai

Promise ek future result ka promise hai.

Pending
↓
Success
OR
Failure
Promise States
1. Pending

Kaam chal raha hai.

Pizza Ban Raha Hai
2. Fulfilled (Resolved)

Kaam successful.

Pizza Deliver Ho Gaya
3. Rejected

Kaam fail.

Restaurant Closed
---
.then()

Success hua to chalega.

Example:

promise.then(() => {
   console.log("Success");
});

Swiggy Example:

Pizza Mil Gaya
↓
Khana Start Karo
---
.catch()

Error hua to chalega.

promise.catch(() => {
   console.log("Error");
});

Example:

Restaurant Ne Cancel Kar Diya
↓
Refund Lo
---
.finally()

Success ya Failure dono me chalega.

promise.finally(() => {
   console.log("Done");
});

Example:

App Close Kar Do

Chahe order mila ho ya nahi.
---
const myPromise = new Promise((resolve, reject) => {

   let success = true;

   if(success)
      resolve("Data Loaded");
   else
      reject("Error");
});

myPromise
   .then(result => {
      console.log(result);
   })
   .catch(error => {
      console.log(error);
   })
   .finally(() => {
      console.log("Completed");
   });
---
Exam Definition

A Promise is an object that represents the eventual completion or failure of an asynchronous operation.

Methods:

.then() → handles success
.catch() → handles errors
.finally() → executes regardless of success or failure
---
