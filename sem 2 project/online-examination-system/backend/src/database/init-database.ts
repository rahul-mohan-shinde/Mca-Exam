import mongoose from 'mongoose';
import Role from '../modules/auth/model/role.model';
import Category from '../modules/question-bank/model/category.model';
import connectDatabase from './connection';

export const initializeDatabase = async (): Promise<void> => {
  try {
    await connectDatabase();

    // Step 1: Create default roles
    const roles = [
      { role_name: 'super_admin', permissions: ['all'] },
      { role_name: 'admin', permissions: ['manage_exams', 'manage_users', 'view_results'] },
      { role_name: 'examiner', permissions: ['create_exams', 'view_results'] },
      { role_name: 'student', permissions: ['take_exam', 'view_results'] }
    ];

    for (const roleData of roles) {
      const existingRole = await Role.findOne({ role_name: roleData.role_name });
      if (!existingRole) {
        await Role.create(roleData);
        console.log(`✅ Created role: ${roleData.role_name}`);
      }
    }

    // Step 2: Create default categories
    const categories = [
      { category_name: 'Mathematics', description: 'Mathematics questions' },
      { category_name: 'Science', description: 'Science questions' },
      { category_name: 'English', description: 'English questions' },
      { category_name: 'Computer Science', description: 'Computer Science questions' }
    ];

    for (const categoryData of categories) {
      const existingCategory = await Category.findOne({ category_name: categoryData.category_name });
      if (!existingCategory) {
        await Category.create(categoryData);
        console.log(`✅ Created category: ${categoryData.category_name}`);
      }
    }

    console.log('✅ Database initialization completed');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialized successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to initialize database:', error);
      process.exit(1);
    });
}

