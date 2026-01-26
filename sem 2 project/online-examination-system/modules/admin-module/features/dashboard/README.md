# Admin Dashboard Feature

## Overview

The Admin Dashboard provides a comprehensive overview of the system with statistics, recent activities, and quick actions.

## Features

- System statistics (users, exams, results)
- Recent activities log
- Quick action buttons
- Performance metrics
- Charts and graphs

## API Endpoint

`GET /api/admin/dashboard`

## Response

```json
{
  "statistics": {
    "totalUsers": 1000,
    "totalExams": 50,
    "activeExams": 10,
    "completedExams": 40
  },
  "recentActivities": [...],
  "performanceMetrics": {...}
}
```

