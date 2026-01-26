# Admin Module

## Overview

The Admin Module provides administrative functionality for managing the Online Examination System. It includes user management, exam creation, analytics, and system configuration.

## Architecture

### 3-Tier Architecture
- **Presentation Layer**: Angular admin dashboard components
- **Business Logic Layer**: Express.js controllers and services
- **Data Access Layer**: Database models and repositories

## Module Components

### 1. Dashboard Feature
- System statistics
- Recent activities
- Quick actions
- Performance metrics

### 2. User Management Feature
- Create/Update/Delete users
- Assign roles
- Activate/Deactivate accounts
- View user history

### 3. Exam Creation Feature
- Create exam templates
- Configure exam settings
- Assign questions
- Set schedules

### 4. Analytics Feature
- Exam performance metrics
- User activity reports
- System usage statistics
- Export reports

## Security

- Role-based access (Admin/Super Admin only)
- Audit logging for all actions
- Input validation and sanitization
- Rate limiting on sensitive operations

## Database Schema

### Admin Actions Table
- id, admin_id, action_type, target_id, details, timestamp

### System Settings Table
- id, setting_key, setting_value, updated_by, updated_at

