# Student Module

## Overview

The Student Module provides functionality for students to take exams, view their dashboard, and access exam history.

## Module Components

### 1. Exam Taking Feature
- Start exam
- Answer questions
- Auto-save answers
- Submit exam
- Timer management

### 2. Dashboard Feature
- Upcoming exams
- Recent results
- Performance statistics
- Quick actions

### 3. History Feature
- Past exam results
- Answer review
- Performance analysis

## Database Schema

### Exam Attempts Table
- id, student_id, exam_id, start_time, end_time, status, score

### Answers Table
- id, attempt_id, question_id, answer_text, is_correct, marks_obtained

