# Exam Management Module

## Overview

The Exam Management Module handles exam creation, question paper generation, scheduling, and exam configuration.

## Module Components

### 1. Exam Creation Feature
- Create exam templates
- Configure exam settings (duration, marks, passing score)
- Assign questions from question bank

### 2. Question Paper Generation Feature
- Random question selection algorithm
- Difficulty-based distribution
- Topic-wise weightage
- Unique question sets per student

### 3. Scheduling Feature
- Set exam start/end times
- Timezone handling
- Automatic exam activation/deactivation

## Algorithm: Random Question Paper Generation

```
ALGORITHM: RandomQuestionPaperGeneration (RQPG)
INPUT: Question Pool, Difficulty Ratio, Topic Weightage
OUTPUT: Randomized Question Set

STEPS:
1. FILTER questions by subject
2. CATEGORIZE by difficulty
3. APPLY weightage distribution
4. SHUFFLE using Fisher-Yates algorithm
5. VALIDATE uniqueness
6. RETURN final question set

COMPLEXITY: O(n) where n = number of questions
```

## Database Schema

### Exams Table
- id, exam_name, description, duration, total_marks, passing_score, start_time, end_time, status

### Exam Questions Table
- id, exam_id, question_id, order_number

