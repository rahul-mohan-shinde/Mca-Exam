# Question Bank Module

## Overview

The Question Bank Module manages the repository of examination questions. It handles question creation, categorization, bulk upload, and question management operations.

## Module Components

### 1. Question CRUD Feature
- Create, Read, Update, Delete questions
- Support multiple question types (MCQ, True/False, Short Answer, Essay)
- Question validation and sanitization

### 2. Category Management Feature
- Create question categories
- Organize questions by subject/topic
- Category hierarchy support

### 3. Bulk Upload Feature
- CSV/Excel file import
- Batch question creation
- Validation and error reporting

## Database Schema

### Questions Table
- id, question_text, question_type, category_id, difficulty_level, marks, created_by, created_at

### Categories Table
- id, category_name, parent_category_id, description

### Options Table (for MCQ)
- id, question_id, option_text, is_correct

## Algorithm: Question Paper Generation

```
ALGORITHM: GenerateQuestionPaper
1. FILTER questions by category
2. CATEGORIZE by difficulty
3. APPLY weightage distribution
4. SHUFFLE using Fisher-Yates
5. VALIDATE uniqueness
6. RETURN question set
END
```

**Time Complexity**: O(n) - n is number of questions
**Space Complexity**: O(n) - Question storage

