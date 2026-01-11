Thanks — I reviewed the files you provided from the python/ folder and created a compact, exam-ready cheat sheet that summarizes every file, points out the important functions/classes, gives usage/run examples, and includes short exam lines you can memorise. Below is the consolidated cheat sheet (organized by file). Read it as a quick-reference you can use for revision or to paste into notes.

I reviewed these files: python/buldin function.md, python/class and attribute.md, python/Delegation and containership.md, python/dictionary.md, python/Django Rest Framework (DRF).md, python/exception.md, python/Exception.md, python/genertator.md, python/list comprihention.md, python/List.md, python/mongodb.md, python/mongodb2.md, python/operator overloading.md, python/Package.md, python/regular expression.md, python/reverse string.md, python/set.md, python/thread and multithreading.md. Below is a per-file cheat summary and a short general quick-reference at the end.

Cheat sheet — python/ folder
----------------------------

1) python/buldin function.md
- Purpose: Two short programs:
  - Swap every adjacent (odd–even) character in a string.
  - Create a set from user input and count digits/lowercase/uppercase.
- Key code (swap adjacent chars):
  - Loop in steps of 2; when i+1 exists swap s[i] and s[i+1], else append last char.
- Important snippet:
  - for i in range(0, len(s), 2): ...
- How to run:
  - Copy the snippet into swap_chars.py, run: python swap_chars.py (enter string when prompted).
- Exam line:
  - "Traverse string in steps of two and swap each adjacent pair; last char remains if unpaired."
- Variants offered: one-line slicing, list-conversion approach, input validation.

2) python/class and attribute.md
- Purpose: Demonstrates OOP basics via BankDemo class (attributes + methods).
- Important class/methods:
  - class BankDemo:
    - __init__(bankaccount_no, name, balance)
    - deposit(amount)
    - withdraw(amount)
    - checkbalance()
- How to run:
  - Save to bank_demo.py and run: python bank_demo.py (main is included; outputs printed).
- Exam line:
  - "Defines a class with attributes and methods for deposit, withdraw and balance check."
- Variants available: user input version, exception-handling, multiple accounts.

3) python/Delegation and containership.md
- Purpose: Conceptual/short-code examples of "Delegation" and "Containership (Has-A)" in Python.
- Important examples:
  - Delegation: Car delegates start() to Engine.start()
  - Containership: Library contains Book instance
- How to use:
  - Save examples to delegation.py and run: python delegation.py
- Exam line:
  - "Delegation: an object passes work to another object; Containership: one class contains another (has-a)."

4) python/dictionary.md
- Purpose: Shows dictionary operations (create, display keys, add, delete, modify).
- Important operations:
  - student.keys(), student[6] = "Sonal", del student[3], student[2] = "Ankit"
- How to run:
  - Save to dict_ops.py and run: python dict_ops.py
- Exam line:
  - "Dictionary stores key:value pairs; use keys(), assignment to add/modify, del to remove."

5) python/Django Rest Framework (DRF).md
- Purpose: A 5-mark theory answer explaining Django REST Framework: what it is, features, uses.
- Important concepts:
  - Serializers, ViewSets/routers, authentication/permissions, pagination/filtering/throttling, browsable API
- How to use:
  - This is theory; for a hands-on example the file offers to add a minimal DRF code snippet (not present).
- Exam line:
  - "DRF is a Django toolkit for building RESTful APIs providing serializers, authentication and browsable API."

6) python/exception.md
- Purpose: User-defined exception example for factorial calculation (raise InvalidInput for n < 0).
- Important code:
  - class InvalidInput(Exception): pass
  - raise InvalidInput("Invalid Input") when n < 0
  - try/except to catch InvalidInput and ValueError
- How to run:
  - Save factorial_exception.py and run: python factorial_exception.py (enter a number).
- Exam line:
  - "Create a custom class inheriting Exception and raise it when invalid conditions occur."

7) python/Exception.md
- Purpose: Short theory/example of five functions in random module: random(), randint(), choice(), shuffle(), sample().
- Important methods and quick examples:
  - random.random(), random.randint(a,b), random.choice(seq), random.shuffle(list), random.sample(pop,k)
- How to run:
  - Save to random_examples.py and run.
- Exam line:
  - "random module generates pseudo-random values and selections; use randint for integers, sample for unique picks."

8) python/genertator.md (generator spelled “genertator.md”)
- Purpose: Implement my_range(start, stop, step) generator (works like range()).
- Important code:
  - def my_range(start, stop, step): yield values while appropriate; handles negative step variant.
- How to run:
  - Save to my_range.py and run: python my_range.py (loop example provided).
- Exam line:
  - "Generator uses yield to provide values one-by-one without creating the whole list in memory."

9) python/list comprihention.md (typo: comprehension)
- Purpose: Show list comprehension to filter digits (integers) from a mixed list.
- Important snippet:
  - digits = [x for x in data if isinstance(x, int)]
- How to run:
  - Save to list_comp.py and run.
- Exam line:
  - "List comprehension: [expr for item in seq if cond] — use isinstance to filter by type."

10) python/List.md
- Purpose: Several list-related examples:
  - Matrix addition using list-of-lists (user input),
  - List operations: delete, alternate elements, sort descending, append.
- Important code:
  - Matrix addition loops A[i][j] + B[i][j]
  - Slicing animals[::2] for alternate elements
- How to run:
  - Save to matrix_add.py or list_ops.py and run.
- Exam line:
  - "Matrices can be represented as list of lists; use nested loops to add corresponding elements."

11) python/mongodb.md
- Purpose: MongoDB shell commands for database/collection creation, insertMany, find, update, sort/limit queries (pure Mongo shell).
- Important commands:
  - use collegeDB; db.createCollection("Student_info"); db.Student_info.insertMany([...])
  - db.Student_info.find({Percentage: {$gte:70,$lte:80}}); updateOne; sort + limit
- How to run:
  - In mongo shell: mongo then copy & paste commands. Not Python — this is Mongo shell JavaScript.
- Exam line:
  - "Use insertMany, find with query operators ($gte, $lte), updateOne with $set, sort() and limit()."

12) python/mongodb2.md
- Purpose: Python (PyMongo) examples: connect, insert_many, find queries, sort, update_one, delete_one.
- Important code:
  - from pymongo import MongoClient; client = MongoClient("mongodb://localhost:27017/")
  - db = client["filmDB"]; movies = db["movies"]
  - insert_many([...]); movies.find({"year": {"$lt": 2010}}), sort("director",1)
- How to run:
  - Install PyMongo: pip install pymongo
  - Save to pymongo_example.py and run: python pymongo_example.py (ensure MongoDB server running).
- Exam line:
  - "Use PyMongo's MongoClient to connect to MongoDB and perform insert/find/update/delete operations."

13) python/operator overloading.md
- Purpose: Theory and examples of operator overloading in Python (define __add__, __sub__, __mul__, __eq__, etc.).
- Important code:
  - class Number with __add__ returning self.value + other.value
- How to run:
  - Save to op_overload.py and run demonstration code.
- Exam line:
  - "Operator overloading lets you change operator behavior for user-defined classes via magic methods."

14) python/Package.md
- Purpose: Explains what a package is and different import styles (import module, from module import, aliasing, package.module).
- Important forms:
  - import math; from math import sqrt; import math as m; from package.module import name
- How to run:
  - Theory file. Example code can be copied to test files and run.
- Exam line:
  - "A package is a directory of modules; import methods include import module, from module import name, and aliasing."

15) python/regular expression.md
- Purpose: Regex overview in Python using re module with examples (search, match, findall, sub), common symbols, mobile & email patterns.
- Important patterns:
  - Mobile: r"^[0-9]{10}$"
  - Email: r"^[a-zA-Z0-9_.]+@[a-zA-Z]+\.[a-zA-Z]+$"
  - Password example: r"^(?=.*[A-Z])(?=.*[0-9]).{8,}$"
- How to run:
  - Save to regex_examples.py and run: python regex_examples.py
- Exam line:
  - "Use re.match/search/findall/sub for pattern operations; anchors ^ and $ force full-string matches."

16) python/reverse string.md
- Purpose: Reverse each word of a string while keeping word order.
- Important code:
  - def reverse_each_word(s): return " ".join(word[::-1] for word in s.split())
- How to run:
  - Save to reverse_words.py and run: python reverse_words.py (enter string at prompt).
- Exam line:
  - "Split by spaces, reverse each word (slicing [::-1]), join with spaces."

17) python/set.md
- Purpose: Create a set from user input, display elements & length, and count digits/lowercase/uppercase characters.
- Important code:
  - myset = set(); myset.add(element); use isdigit()/islower()/isupper()
- How to run:
  - Save to set_analysis.py and run: python set_analysis.py
- Exam line:
  - "Set stores unique elements; use add() to insert and built-in string methods to classify characters."

18) python/thread and multithreading.md
- Purpose: Explain threading basics, examples for single/multiple threads, and a synchronized example that prints square and cube using threading and Lock.
- Important code:
  - import threading
  - t = threading.Thread(target=func, args=(...)); t.start(); t.join()
  - lock = threading.Lock(); with lock: critical section
- How to run:
  - Save to threads_example.py and run: python threads_example.py
- Exam line:
  - "Threads are lightweight execution units within a process; use Lock to avoid race conditions."

General quick-reference (copyable study notes)
----------------------------------------------
- How to run code snippets:
  - Save snippet into a .py file and run: python filename.py
  - For PyMongo examples: ensure MongoDB server running and pip install pymongo.
  - For Mongo shell commands: run in mongo shell (mongo).
- String swap (adjacent):
  - for i in range(0, len(s), 2): result += s[i+1] + s[i] if i+1 < len(s) else result += s[i]
- Reverse each word:
  - " ".join(w[::-1] for w in s.split())
- Generator skeleton:
  - def my_range(start, stop, step): while condition: yield start; start += step
- Operator overloading:
  - __add__(self, other), __sub__, __mul__, __eq__, __lt__ ...
- Thread basics:
  - t = threading.Thread(target=fn); t.start(); t.join(); use Lock() for sync
- Regex essentials:
  - Anchors ^ and $; quantifiers {n}, +, *; \d, \w, \s; re.match vs re.search vs re.findall vs re.sub
- Set vs List vs Dict short:
  - set: unique unordered; list: ordered allow duplicates; dict: key:value mapping
- Dictionary operations:
  - keys(), dict[k] = v to add/modify, del dict[k] to remove
- PyMongo basics:
  - client = MongoClient(uri); db = client['dbName']; collection = db['coll']; insert_many, find, update_one, delete_one

Exam-ready one-liners (memorise)
- Swap adjacent chars: "Traverse string in steps of two and swap every adjacent pair; leftover char stays."
- Generator: "A generator uses yield to produce values lazily without storing the whole sequence."
- Operator overloading: "Redefine operator behavior for user-defined objects with magic methods like __add__."
- Delegation vs containership: "Delegation: object delegates work to another; Containership: an object has another ('has-a')."
- Threading: "Threads are concurrent execution units within a process; use Lock to protect shared resources."

What I delivered and next
-------------------------
I parsed every markdown file you gave under python/ and distilled each into: purpose, important functions/classes, how to run/use, and an exam-line summary. If you'd like, I can now:
- Convert this cheat sheet into a single markdown file (CHEATSHEET_python.md) and commit it to the repo, or
- Generate a printable PDF/flashcards for quick revision, or
- Expand any specific file into a fuller tutorial (example: full DRF example, PyMongo full script, operator-overloading exercises).

Which of those would you like next? If you want a repo file added, tell me the filename you'd prefer (and whether to push to a branch).
