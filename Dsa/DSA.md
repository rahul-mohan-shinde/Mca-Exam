
# 📘 **DSA Question Links (Index / TOC)**

## 🔹 **Q1: Arrays & Strings**

## 📘 DSA Question Index

1. [Q1 (a) Smallest & Largest Element](#a-write-an-algorithm-to-print-the-smallest-and-largest-element-of-an-array)
2. [Q1 (b) String Manipulation Using Arrays](#b-discuss-string-manipulation-using-arrays)
3. [Q1 (c) Sparse Matrix Algorithm](#c-write-an-algorithm-to-check-whether-a-matrix-is-a-sparse-matrix-or-not)
4. [Q1 (d) 2D Array Memory Representation](#d-explain-the-representation-of-a-2d-array-in-the-memory-with-proper-example)

---

## 🔹 **Q2: Linked Lists**

* [Q2 (a-i) Insert in Between – Circular Linked List](#q2-a-i-insertion-in-between-the-circular-linked-list)
* [Q2 (a-ii) Insert at End – Circular Linked List](#q2-a-ii-insertion-at-the-end-of-the-circular-linked-list)
* [Q2 (b) Singly vs Circular Linked List](#q2-b-differentiate-between-singly-linked-list-and-circular-linked-list)
* [Q2 (c) Merge Two Sorted Linked Lists](#q2-c-merge-two-sorted-linked-lists)
* [Q2 (d) Delete Node from End – Doubly Linked List](#q2-d-delete-node-from-end-of-doubly-linked-list)

---

## 🔹 **Q3: Stack & Queue**

* [Q3 (a) Queue Operations Using Static Allocation](#q3-a-queue-operations-using-static-allocation)
* [Q3 (b) Applications of Stack](#q3-b-applications-of-stack)
* [Q3 (c) Infix to Postfix Conversion](#q3-c-infix-to-postfix-conversion-using-stack)
* [Q3 (d) Applications of Linear Queue](#q3-d-applications-of-linear-queue)

---

## 🔹 **Q4: Trees & Graphs**

* [Q4 (a) DFS Algorithm](#q4-a-dfs-depth-first-search-algorithm)
* [Q4 (b) Binary Tree from Inorder & Preorder](#q4-b-construct-binary-tree-from-inorder-and-preorder)
* [Q4 (c) AVL Tree Creation & Rotations](#q4-c-avl-tree-insertion-and-rotations)
* [Q4 (d) BFS vs DFS Comparison](#q4-d-comparison-between-bfs-and-dfs)

---

## 🔹 **Q5: Searching, Sorting & Heap**

* [Q5 (a) Binary Search Algorithm](#q5-a-binary-search-algorithm)
* [Q5 (b) Hash Functions](#q5-b-hash-functions-with-examples)
* [Q5 (c) Bubble Sort Algorithm & Complexity](#q5-c-bubble-sort-algorithm)
* [Q5 (d) Max Heap Creation](#q5-d-create-max-heap)

---

## 🧠 **How to Use This**

* Works perfectly in **GitHub README**
* Works in **Markdown Notes**
* Can be converted to **PDF / Word TOC**
* Ideal for **last-day revision**

---

### **b) Discuss string manipulation using arrays**
---

### **Common String Manipulation Operations Using Arrays**

1. **String Length**

   * The length of a string is found by counting characters until the null character `'\0'` is encountered.
   * Example:
     `"HELLO"` → length = 5

2. **String Copy**

   * Copying one string into another by copying characters one by one until `'\0'`.
   * Used to duplicate strings.

3. **String Concatenation**

   * Joining two strings by appending the characters of the second string at the end of the first string.

4. **String Comparison**

   * Comparing two strings character by character to check whether they are equal or which one is lexicographically greater.

5. **String Reversal**

   * Reversing a string by swapping characters from the beginning and end using array indexing.

6. **Substring Extraction**

   * Extracting a part of a string by copying selected characters into another character array.

---

### **Advantages of String Manipulation Using Arrays**

* Direct access to characters using indices.
* Efficient memory usage.
* Easy to understand and implement at low-level programming.

---

### **Conclusion**

String manipulation using arrays provides full control over individual characters of a string. It is widely used in system-level programming and forms the basis for understanding higher-level string operations.

---


### **c) Algorithm to Check Whether a Matrix is a Sparse Matrix or Not** **[6]**

A **sparse matrix** is a matrix in which the number of **zero elements is greater than the number of non-zero elements**.

---

### **Algorithm: Check Sparse Matrix**

**Step 1:** Start
**Step 2:** Read number of rows `r` and columns `c`
**Step 3:** Read matrix elements `A[r][c]`
**Step 4:** Initialize
    `zero ← 0`
    `nonzero ← 0`
**Step 5:** For `i = 0` to `r − 1`
    For `j = 0` to `c − 1`
      If `A[i][j] == 0`
        `zero ← zero + 1`
      Else
        `nonzero ← nonzero + 1`
**Step 6:** If `zero > nonzero`
    Print **"Matrix is Sparse"**
    Else
    Print **"Matrix is Not Sparse"**
**Step 7:** Stop

---

### **Explanation**

* Traverse the entire matrix once.
* Count zero and non-zero elements.
* If zero elements are more, the matrix is sparse.

---

### **Time Complexity**

* **O(r × c)**

### **Space Complexity**

* **O(1)** (only counters used)

---


### **d) Representation of a 2D Array in Memory (with Example)** **[4]**

A **2D array** is stored in **linear (one-dimensional) memory**. Although it looks like a matrix (rows and columns), the elements are stored **sequentially** in memory. There are two common methods to represent a 2D array in memory:

---

## **1) Row-Major Order**

* All elements of the **first row** are stored first, followed by the second row, and so on.
* This method is used in **C, C++, Java**.

### **Example**

Consider a 2D array `A[2][3]`:

```
A = | 1  2  3 |
    | 4  5  6 |
```

### **Memory Representation (Row-Major)**

```
Address → 1000 1004 1008 1012 1016 1020
Value   →   1    2    3    4    5    6
```

### **Address Calculation Formula**

```
Address(A[i][j]) = Base + [(i × number_of_columns) + j] × size_of_element
```

---

## **2) Column-Major Order**

* All elements of the **first column** are stored first, then the second column, and so on.
* Used in **FORTRAN**.

### **Memory Representation (Column-Major)**

```
Address → 1000 1004 1008 1012 1016 1020
Value   →   1    4    2    5    3    6
```

### **Address Calculation Formula**

```
Address(A[i][j]) = Base + [(j × number_of_rows) + i] × size_of_element
```

---

## **Conclusion**

* A 2D array is stored linearly in memory.
* Representation depends on whether **row-major** or **column-major** order is used.

---

---

## **Q2)**
### **a) Algorithm to Insert an Element in a Circular Linked List** **[6]**

In a **circular linked list**, the last node points back to the **first node**.

---

## **i) Insertion in Between the List**

### **Algorithm: Insert_Between_Circular_List**

**Step 1:** Start
**Step 2:** Create a new node `NEW`
**Step 3:** Read data into `NEW→data`
**Step 4:** Set `TEMP ← HEAD`
**Step 5:** Traverse the list until the desired position/node is found
**Step 6:** Set
    `NEW→next ← TEMP→next`
    `TEMP→next ← NEW`
**Step 7:** Stop

---

## **ii) Insertion at the End of the List**

### **Algorithm: Insert_End_Circular_List**

**Step 1:** Start
**Step 2:** Create a new node `NEW`
**Step 3:** Read data into `NEW→data`
**Step 4:** Set `TEMP ← HEAD`
**Step 5:** Traverse until `TEMP→next == HEAD`
**Step 6:** Set
    `TEMP→next ← NEW`
    `NEW→next ← HEAD`
**Step 7:** Stop

---

### **Special Case (Empty List)**

If `HEAD == NULL`:

```
HEAD ← NEW
NEW→next ← HEAD
```

---

### **Conclusion**

* Circular linked list insertion requires careful handling of links.
* The last node always points back to the first node.

---

### **b) Differentiate between Singly Linked List and Circular Linked List** **[4]**

| **Basis**          | **Singly Linked List**     | **Circular Linked List**                                     |
| ------------------ | -------------------------- | ------------------------------------------------------------ |
| **Structure**      | Last node points to `NULL` | Last node points to the first node                           |
| **Traversal**      | Traversal ends at `NULL`   | Traversal continues until it reaches the starting node again |
| **Memory Use**     | Uses one pointer per node  | Uses one pointer per node                                    |
| **Implementation** | Simple to implement        | Slightly complex due to circular link                        |
| **Applications**   | Used in stacks, queues     | Used in round-robin scheduling, playlists                    |

---

### **Conclusion**

* Singly linked list has a clear end.
* Circular linked list forms a loop by connecting last node to the first.

---

**OR**

### **c) Algorithm to Merge Two Sorted Linked Lists into a Third Sorted List** **[6]**

Given two **sorted linked lists A and B**, the task is to create a third linked list **C** such that all elements of A and B are merged in **sorted order**. If one list is exhausted, the remaining elements of the other list are appended to C.

---

### **Algorithm: Merge_Sorted_Lists**

**Step 1:** Start
**Step 2:** Set pointers
    `p ← HEAD_A`
    `q ← HEAD_B`
**Step 3:** Create a new empty list **C** and set `HEAD_C ← NULL`
**Step 4:** While `p ≠ NULL` and `q ≠ NULL`, repeat
    If `p→data ≤ q→data` then
      Add `p→data` to list C
      `p ← p→next`
    Else
      Add `q→data` to list C
      `q ← q→next`
**Step 5:** If `p ≠ NULL`, then
    Append remaining nodes of list A to list C
**Step 6:** If `q ≠ NULL`, then
    Append remaining nodes of list B to list C
**Step 7:** Display list C
**Step 8:** Stop

---

### **Explanation**

* Two pointers traverse lists A and B simultaneously.
* The smaller element is always added to list C.
* Remaining elements are directly appended.

---

### **Time Complexity**

* **O(n + m)**
  (where `n` and `m` are the number of nodes in A and B)

### **Space Complexity**

* **O(1)** (if nodes are reused)

---
### **d) Algorithm to Delete a Node from the End of a Doubly Linked List** **[4]**

A **doubly linked list** contains nodes with three fields: **previous pointer**, **data**, and **next pointer**.

---

### **Algorithm: Delete_End_Doubly_Linked_List**

**Step 1:** Start
**Step 2:** If `HEAD == NULL`
    Print **"List is empty"** and Stop
**Step 3:** If `HEAD→next == NULL` (only one node present)
    Set `HEAD ← NULL`
    Delete the node
    Stop
**Step 4:** Set `TEMP ← HEAD`
**Step 5:** Traverse the list until `TEMP→next == NULL`
**Step 6:** Set `TEMP→prev→next ← NULL`
**Step 7:** Delete `TEMP`
**Step 8:** Stop

---

### **Explanation**

* Traverse till the **last node**.
* Update the `next` pointer of the second-last node.
* Delete the last node safely.

---

---

### **Algorithm: Find Smallest and Largest Element in an Array**

**Step 1:** Start
**Step 2:** Read the number of elements `n`
**Step 3:** Read array elements `A[0]` to `A[n−1]`
**Step 4:** Initialize
    `min ← A[0]`
    `max ← A[0]`
**Step 5:** For `i = 1` to `n−1`, repeat
    If `A[i] < min` then `min ← A[i]`
    If `A[i] > max` then `max ← A[i]`
**Step 6:** Print `min` as the smallest element
**Step 7:** Print `max` as the largest element
**Step 8:** Stop

---

### **Explanation (short & practical)**

* First element is assumed as both **minimum** and **maximum**.
* Traverse the array once.
* Update `min` and `max` whenever a smaller or larger value is found.
* **Time Complexity:** `O(n)`
* **Space Complexity:** `O(1)`

---


## **Q3)**

### **a) Algorithm to Perform All Operations of a Queue Using Static Allocation** **[6]**

A **queue** is a linear data structure that follows **FIFO (First In First Out)** principle.
In **static allocation**, a queue is implemented using an **array** with fixed size.

---

### **Algorithm: Queue Operations Using Array**

#### **Initialization**

```
FRONT ← -1
REAR  ← -1
MAX   ← size of array
```

---

## **1) Insertion (Enqueue)**

**Algorithm: ENQUEUE(item)**

**Step 1:** If `REAR == MAX - 1`
    Print **"Queue Overflow"** and Stop
**Step 2:** If `FRONT == -1`
    Set `FRONT ← 0`
**Step 3:** Set `REAR ← REAR + 1`
**Step 4:** Set `QUEUE[REAR] ← item`
**Step 5:** Stop

---

## **2) Deletion (Dequeue)**

**Algorithm: DEQUEUE()**

**Step 1:** If `FRONT == -1` or `FRONT > REAR`
    Print **"Queue Underflow"** and Stop
**Step 2:** Set `ITEM ← QUEUE[FRONT]`
**Step 3:** Set `FRONT ← FRONT + 1`
**Step 4:** If `FRONT > REAR`
    Set `FRONT ← REAR ← -1`
**Step 5:** Return `ITEM`
**Step 6:** Stop

---

## **3) Peek (Display Front Element)**

**Algorithm: PEEK()**

**Step 1:** If `FRONT == -1`
    Print **"Queue is Empty"** and Stop
**Step 2:** Print `QUEUE[FRONT]`
**Step 3:** Stop

---

## **4) Traverse (Display All Elements)**

**Algorithm: TRAVERSE()**

**Step 1:** If `FRONT == -1`
    Print **"Queue is Empty"** and Stop
**Step 2:** For `i = FRONT` to `REAR`
    Print `QUEUE[i]`
**Step 3:** Stop

---

### **Conclusion**

* Static queue uses fixed-size array.
* Overflow and underflow conditions must be checked.
* Operations follow FIFO order.

---
### **b) Applications of Stack (with Examples)** **[4]**

A **stack** is a linear data structure that follows the **LIFO (Last In First Out)** principle.
Stacks are widely used in computer applications for managing data and operations.

---

### **1) Function Calls (Call Stack)**

* Stack is used to store function calls during program execution.
* When a function is called, its information is pushed onto the stack.
* After execution, it is popped from the stack.

**Example:**
Recursive function calls.

---

### **2) Expression Evaluation**

* Stack is used to evaluate arithmetic expressions.
* Conversion of **infix to postfix/prefix** expressions is done using stack.

**Example:**
Infix: `A + B` → Postfix: `AB+`

---

### **3) Reversal of Data**

* Stack is used to reverse strings or numbers.
* Characters are pushed and then popped to reverse order.

**Example:**
String `"DATA"` → `"ATAD"`

---

### **4) Undo/Redo Operations**

* Stack is used in editors to store previous actions.
* Undo pops the last operation from stack.

**Example:**
Text editors like **Undo (Ctrl+Z)**.

---

### **Conclusion**

Stacks help in managing data where **last inserted element is processed first**.

---

**OR**
### **c) Convert Infix to Postfix Using Stack** **[6]**

**Given Infix Expression:**

```
A * ( B * ( C / D * E ) – F ) + G
```

---

## **Operator Precedence**

| Operator | Precedence |
| -------- | ---------- |
| `()`     | Highest    |
| `* /`    | High       |
| `+ -`    | Low        |

---

## **Step-by-Step Conversion (Using Stack)**

| Symbol | Action            | Stack     | Postfix        |
| ------ | ----------------- | --------- | -------------- |
| A      | Operand → output  | —         | A              |
| *      | Push              | *         | A              |
| (      | Push              | * (       | A              |
| B      | Operand → output  | * (       | AB             |
| *      | Push              | * ( *     | AB             |
| (      | Push              | * ( * (   | AB             |
| C      | Operand → output  | * ( * (   | ABC            |
| /      | Push              | * ( * ( / | ABC            |
| D      | Operand → output  | * ( * ( / | ABCD           |
| *      | Pop `/`, push `*` | * ( * ( * | ABCD/          |
| E      | Operand → output  | * ( * ( * | ABCD/E         |
| )      | Pop till `(`      | * ( *     | ABCD/E*        |
| -      | Pop `*`, push `-` | * ( -     | ABCD/E*B*      |
| F      | Operand → output  | * ( -     | ABCD/E*B*F     |
| )      | Pop till `(`      | *         | ABCD/E*B*F-    |
| +      | Pop `*`, push `+` | +         | ABCD/E*B*F-*   |
| G      | Operand → output  | +         | ABCD/E*B*F-*G  |
| End    | Pop remaining     | —         | ABCD/E*B*F-*G+ |

---

## **Final Postfix Expression**

```
ABCD/E*B*F-*G+
```

---

### **Conclusion**

* Stack is used to manage operators based on precedence.
* Operands are directly added to postfix expression.

---

### **d) Applications of a Linear Queue** **[4]**

A **linear queue** is a linear data structure that follows the **FIFO (First In First Out)** principle.
It is widely used in situations where **first-come, first-served** processing is required.

---

### **Applications of Linear Queue**

1. **CPU Scheduling**

   * Processes are executed in the order they arrive.
   * Used in **First Come First Serve (FCFS)** scheduling.

2. **Printer Spooling**

   * Print jobs are stored in a queue and processed one by one.

3. **Ticket Reservation Systems**

   * Requests are handled in the order they are received.

4. **Buffer Management**

   * Used in input/output buffers to manage data flow.

---

### **Conclusion**

Linear queue efficiently manages tasks in sequential order.

---

---

## **Q4)**
### **a) Algorithm to Perform DFS (Depth First Search) on a Graph** **[6]**

**Depth First Search (DFS)** is a graph traversal technique that explores a vertex and then moves to one of its **unvisited adjacent vertices**, continuing this process until no further vertices are left to explore. DFS uses a **stack** (either explicit stack or recursion).

---

## **Algorithm: DFS Using Stack**

### **Input**

* Graph `G` represented using adjacency list or matrix
* Starting vertex `v`

---

### **Algorithm Steps**

**Step 1:** Start
**Step 2:** Initialize an empty stack `S`
**Step 3:** Mark all vertices as **unvisited**
**Step 4:** Push starting vertex `v` onto stack `S`
**Step 5:** While stack `S` is not empty, repeat
    a) Pop a vertex `u` from stack
    b) If `u` is not visited then
      • Visit `u` (print it)
      • Mark `u` as visited
      • Push all **unvisited adjacent vertices** of `u` onto stack
**Step 6:** Stop

---

## **Algorithm: DFS Using Recursion (Alternative)**

**Step 1:** If vertex `v` is unvisited
**Step 2:** Visit `v` and mark it visited
**Step 3:** For each adjacent vertex `u` of `v`
    If `u` is unvisited
    Call `DFS(u)`
**Step 4:** Stop

---

### **Time Complexity**

* **O(V + E)**
  (where `V` = vertices, `E` = edges)

### **Applications of DFS**

* Finding connected components
* Detecting cycles
* Path finding
* Topological sorting

---

### **b) Construct Binary Tree from Inorder & Preorder and Write Postorder** **[4]**

---

### **Given Traversals**

* **Inorder:** 4, 2, 5, 1, 3, 6
* **Preorder:** 1, 2, 4, 5, 3, 6

---

### **Steps to Construct the Binary Tree**

1. **Root Selection**

   * The **first element of Preorder** is always the **root**.
   * Root = **1**

2. **Split Inorder**

   * Inorder left of `1`: **4, 2, 5** (left subtree)
   * Inorder right of `1`: **3, 6** (right subtree)

3. **Left Subtree Construction**

   * Next preorder root = **2**
   * Inorder around `2`: left → **4**, right → **5**

4. **Right Subtree Construction**

   * Next preorder root = **3**
   * Inorder around `3`: right → **6**

---

### **Constructed Binary Tree**

```
        1
       / \
      2   3
     / \   \
    4   5   6
```

---

### **Postorder Traversal (Left → Right → Root)**

```
4, 5, 2, 6, 3, 1
```

---

### **Final Answer**

✅ **Postorder Traversal:** **4, 5, 2, 6, 3, 1**

---

**OR**
### **c) Create an AVL Tree and Write Algorithm for Insertion & Rotations** **[6]**

An **AVL tree** is a **self-balancing Binary Search Tree (BST)** where the **balance factor** of each node is **−1, 0, or +1**.

> **Balance Factor = Height(Left Subtree) − Height(Right Subtree)**

---

## **Given Values to Insert**

```
25, 36, 40, 20, 23, 10, 48, 38, 12, 28
```

During insertion, if imbalance occurs, **rotations** are applied to maintain balance.

---

## **Types of Rotations**

1. **LL Rotation** – Left Left
2. **RR Rotation** – Right Right
3. **LR Rotation** – Left Right
4. **RL Rotation** – Right Left

---

## **Algorithm: AVL Insertion**

### **Algorithm: AVL_INSERT(ROOT, KEY)**

**Step 1:** If `ROOT == NULL`
    Create new node and return

**Step 2:** If `KEY < ROOT→data`
    Insert in left subtree

**Step 3:** Else if `KEY > ROOT→data`
    Insert in right subtree

**Step 4:** Update height of `ROOT`

**Step 5:** Calculate balance factor

```
BF = height(left) − height(right)
```

**Step 6:** If `BF > 1` or `BF < −1`, perform rotation:

* **LL Case:**
      Rotate Right

* **RR Case:**
      Rotate Left

* **LR Case:**
      Left Rotate on left child
      Then Right Rotate

* **RL Case:**
      Right Rotate on right child
      Then Left Rotate

**Step 7:** Return updated `ROOT`

---

## **Final AVL Tree (After All Insertions)**

```
              25
           /        \
         20          40
        /  \        /  \
      10   23     36    48
        \      \      /
        12      28   38
```

---

## **Conclusion**

* AVL tree maintains balance after every insertion.
* Rotations ensure height difference is minimal.
* Searching, insertion, deletion take **O(log n)** time.

---

### **d) Comparison between BFS and DFS** **[4]**

| **Basis**               | **BFS (Breadth First Search)**          | **DFS (Depth First Search)**                     |
| ----------------------- | --------------------------------------- | ------------------------------------------------ |
| **Traversal Method**    | Visits all adjacent vertices first      | Visits one branch completely before backtracking |
| **Data Structure Used** | Queue                                   | Stack / Recursion                                |
| **Memory Requirement**  | Higher (stores all neighbors)           | Lower (stores path nodes only)                   |
| **Completeness**        | Finds shortest path in unweighted graph | Does not guarantee shortest path                 |
| **Applications**        | Shortest path, level-order traversal    | Cycle detection, topological sort                |

---

### **Conclusion**

* **BFS** is suitable for level-wise traversal.
* **DFS** is suitable for deep exploration.

---


## **Q5)**

**a)** Write an algorithm to search an element in an array using binary search method. **[6]**
25, 83, 4, 2, 75, 16, 45, 5, 99, 1

**b)** Discuss all hash functions with examples. **[4]**

**OR**
### **c) Bubble Sort Algorithm & Time Complexity** **[6]**

**Given Array:**

```
48, 23, 2, 59, 73, 4, 10, 60, 3
```

**Bubble Sort** repeatedly compares **adjacent elements** and swaps them if they are in the **wrong order**. After each pass, the **largest element bubbles to the end**.

---

## **Algorithm: Bubble_Sort**

**Step 1:** Start
**Step 2:** Read number of elements `n` and array `A[0…n−1]`
**Step 3:** For `i = 0` to `n − 2`, repeat
    For `j = 0` to `n − i − 2`, repeat
      If `A[j] > A[j + 1]` then
        Swap `A[j]` and `A[j + 1]`
**Step 4:** Print sorted array
**Step 5:** Stop

---

## **Sorting the Given Array (Ascending Order)**

After applying Bubble Sort, the sorted array is:

```
2, 3, 4, 10, 23, 48, 59, 60, 73
```

---

## **Time Complexity Analysis**

* **Best Case (Already Sorted):**
  **O(n)** *(with optimized bubble sort using flag)*

* **Average Case:**
  **O(n²)**

* **Worst Case (Reverse Order):**
  **O(n²)**

---

## **Space Complexity**

* **O(1)** (In-place sorting)

---

### **Conclusion**

* Bubble Sort is simple and easy to implement.
* Not efficient for large datasets due to quadratic time complexity.

---
### **d) Create a Max Heap from the Given Elements** **[4]**

**Given sequence:**

```
48, 72, 36, 8, 79, 22, 84, 66
```

A **Max Heap** is a **complete binary tree** where the **value of each parent node is greater than or equal to its child nodes**.

---

## **Step-by-Step Construction (Insertion Method)**

Insert elements one by one and apply **heapify-up**:

1. Insert **48** → Heap: `48`
2. Insert **72** → Swap with 48 → `72, 48`
3. Insert **36** → No swap → `72, 48, 36`
4. Insert **8** → No swap → `72, 48, 36, 8`
5. Insert **79** → Swap with 48, then with 72 → `79, 72, 36, 8, 48`
6. Insert **22** → No swap → `79, 72, 36, 8, 48, 22`
7. Insert **84** → Swap with 36, then with 79 → `84, 72, 79, 8, 48, 22, 36`
8. Insert **66** → Swap with 8, then with 72 → `84, 72, 79, 66, 48, 22, 36, 8`

---

## **Final Max Heap (Array Representation)**

```
84, 72, 79, 66, 48, 22, 36, 8
```

---

## **Tree Representation**

```
              84
           /        \
         72          79
       /    \       /    \
     66     48     22     36
    /
   8
```

---

### **Conclusion**

* Max heap ensures **largest element at the root**.
* Insertion maintains heap property using **heapify-up**.

---

---

