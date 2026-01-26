import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './database/connection';
import { initializeDatabase } from './database/init-database';
import authRoutes from './modules/auth/routes/auth.routes';
import adminRoutes from './modules/admin/routes/admin.routes';
import questionRoutes from './modules/question-bank/routes/question.routes';
import examRoutes from './modules/exam-management/routes/exam.routes';
import studentRoutes from './modules/student/routes/student.routes';
import resultRoutes from './modules/result-report/routes/result.routes';
import notificationRoutes from './modules/notification/routes/notification.routes';
import proctoringRoutes from './modules/proctoring/routes/proctoring.routes';
import { errorHandler } from './middlewares/error-handler.middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Step 1: Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 2: Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/results', resultRoutes);
app.use('/api', notificationRoutes);
app.use('/api', proctoringRoutes);

// Step 3: Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Step 4: Error handler
app.use(errorHandler);

// Step 5: Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Initialize database (create default roles and categories)
    await initializeDatabase();

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/health`);
      console.log(`✅ All modules loaded successfully`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;

