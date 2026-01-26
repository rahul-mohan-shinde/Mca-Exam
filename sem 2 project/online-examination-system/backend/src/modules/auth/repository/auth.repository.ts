import User, { IUser } from '../model/user.model';
import Role from '../model/role.model';
import Session from '../model/session.model';

export class AuthRepository {
  // Step 1: Find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email.toLowerCase() }).populate('role_id');
  }

  // Step 2: Find user by ID
  async findById(userId: string): Promise<IUser | null> {
    return await User.findById(userId).populate('role_id');
  }

  // Step 3: Create new user
  async createUser(userData: {
    name: string;
    email: string;
    password_hash: string;
    role_id: string;
    verification_token?: string;
  }): Promise<IUser> {
    const user = new User({
      ...userData,
      email: userData.email.toLowerCase(),
      is_verified: false,
      is_active: true
    });
    return await user.save();
  }

  // Step 4: Update user
  async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  // Step 5: Get default student role
  async getDefaultRole(): Promise<any> {
    let role = await Role.findOne({ role_name: 'student' });
    if (!role) {
      role = await Role.create({
        role_name: 'student',
        permissions: ['take_exam', 'view_results']
      });
    }
    return role;
  }

  // Step 6: Create session
  async createSession(sessionData: {
    user_id: string;
    token: string;
    refresh_token: string;
    expires_at: Date;
    ip_address?: string;
    user_agent?: string;
  }): Promise<any> {
    return await Session.create(sessionData);
  }

  // Step 7: Find session by token
  async findSessionByToken(token: string): Promise<any> {
    return await Session.findOne({ token });
  }

  // Step 8: Delete session
  async deleteSession(token: string): Promise<void> {
    await Session.deleteOne({ token });
  }

  // Step 9: Delete all user sessions
  async deleteAllUserSessions(userId: string): Promise<void> {
    await Session.deleteMany({ user_id: userId });
  }

  // Step 10: Find user by reset token
  async findByResetToken(tokenHash: string): Promise<IUser | null> {
    return await User.findOne({
      reset_token: tokenHash,
      reset_token_expires: { $gt: new Date() }
    });
  }
}

export default new AuthRepository();

