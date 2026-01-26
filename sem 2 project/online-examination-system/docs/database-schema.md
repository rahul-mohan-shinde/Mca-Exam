# Database Schema Documentation

## Entity Relationship Diagram

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    Users    │────────>│    Roles    │         │  Sessions   │
└─────────────┘         └─────────────┘         └─────────────┘
      │                        │
      │                        │
      ↓                        ↓
┌─────────────┐         ┌─────────────┐
│Exam Attempts│         │  Questions  │
└─────────────┘         └─────────────┘
      │                        │
      │                        │
      ↓                        ↓
┌─────────────┐         ┌─────────────┐
│   Answers   │         │  Categories │
└─────────────┘         └─────────────┘
      │
      │
      ↓
┌─────────────┐
│   Results   │
└─────────────┘
```

## Tables

### 1. Users Table
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role_id VARCHAR(36) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX idx_email (email),
    INDEX idx_role (role_id)
);
```

### 2. Roles Table
```sql
CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    permissions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Sessions Table
```sql
CREATE TABLE sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    token VARCHAR(500) NOT NULL,
    refresh_token VARCHAR(500),
    expires_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_token (token)
);
```

### 4. Questions Table
```sql
CREATE TABLE questions (
    id VARCHAR(36) PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_type ENUM('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY') NOT NULL,
    category_id VARCHAR(36),
    difficulty_level ENUM('EASY', 'MEDIUM', 'HARD') DEFAULT 'MEDIUM',
    marks DECIMAL(5,2) NOT NULL,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_category (category_id),
    INDEX idx_difficulty (difficulty_level)
);
```

### 5. Options Table (for MCQ)
```sql
CREATE TABLE options (
    id VARCHAR(36) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    order_number INT DEFAULT 0,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    INDEX idx_question (question_id)
);
```

### 6. Categories Table
```sql
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    parent_category_id VARCHAR(36),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_category_id) REFERENCES categories(id),
    INDEX idx_parent (parent_category_id)
);
```

### 7. Exams Table
```sql
CREATE TABLE exams (
    id VARCHAR(36) PRIMARY KEY,
    exam_name VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT NOT NULL, -- in minutes
    total_marks DECIMAL(10,2) NOT NULL,
    passing_score DECIMAL(10,2) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status ENUM('DRAFT', 'SCHEDULED', 'ACTIVE', 'COMPLETED', 'CANCELLED') DEFAULT 'DRAFT',
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_status (status),
    INDEX idx_dates (start_time, end_time)
);
```

### 8. Exam Questions Table
```sql
CREATE TABLE exam_questions (
    id VARCHAR(36) PRIMARY KEY,
    exam_id VARCHAR(36) NOT NULL,
    question_id VARCHAR(36) NOT NULL,
    order_number INT NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    UNIQUE KEY unique_exam_question (exam_id, question_id),
    INDEX idx_exam (exam_id)
);
```

### 9. Exam Attempts Table
```sql
CREATE TABLE exam_attempts (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    exam_id VARCHAR(36) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    submitted_at TIMESTAMP,
    status ENUM('IN_PROGRESS', 'SUBMITTED', 'TIMEOUT', 'CANCELLED') DEFAULT 'IN_PROGRESS',
    total_marks DECIMAL(10,2) DEFAULT 0,
    marks_obtained DECIMAL(10,2) DEFAULT 0,
    percentage DECIMAL(5,2),
    grade VARCHAR(10),
    is_passed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (exam_id) REFERENCES exams(id),
    INDEX idx_student (student_id),
    INDEX idx_exam (exam_id),
    INDEX idx_status (status)
);
```

### 10. Answers Table
```sql
CREATE TABLE answers (
    id VARCHAR(36) PRIMARY KEY,
    attempt_id VARCHAR(36) NOT NULL,
    question_id VARCHAR(36) NOT NULL,
    answer_text TEXT,
    selected_option_id VARCHAR(36),
    is_correct BOOLEAN DEFAULT FALSE,
    marks_obtained DECIMAL(5,2) DEFAULT 0,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (attempt_id) REFERENCES exam_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (selected_option_id) REFERENCES options(id),
    INDEX idx_attempt (attempt_id),
    INDEX idx_question (question_id)
);
```

### 11. Notifications Table
```sql
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('EMAIL', 'IN_APP', 'BOTH') DEFAULT 'IN_APP',
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_read (is_read)
);
```

### 12. Proctoring Logs Table
```sql
CREATE TABLE proctoring_logs (
    id VARCHAR(36) PRIMARY KEY,
    attempt_id VARCHAR(36) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_data JSON,
    is_violation BOOLEAN DEFAULT FALSE,
    violation_type VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (attempt_id) REFERENCES exam_attempts(id) ON DELETE CASCADE,
    INDEX idx_attempt (attempt_id),
    INDEX idx_violation (is_violation)
);
```

## Relationships

1. **Users → Roles**: Many-to-One (Many users have one role)
2. **Users → Sessions**: One-to-Many (One user has many sessions)
3. **Users → Exam Attempts**: One-to-Many (One student has many attempts)
4. **Questions → Categories**: Many-to-One (Many questions in one category)
5. **Questions → Options**: One-to-Many (One question has many options)
6. **Exams → Exam Questions**: One-to-Many (One exam has many questions)
7. **Exam Attempts → Answers**: One-to-Many (One attempt has many answers)
8. **Users → Notifications**: One-to-Many (One user has many notifications)

## Indexes

- Email indexes for fast user lookup
- Foreign key indexes for join performance
- Status indexes for filtering
- Date indexes for time-based queries

## Constraints

- Unique email per user
- Unique exam-question combination
- Foreign key constraints for referential integrity
- Check constraints for valid enum values

