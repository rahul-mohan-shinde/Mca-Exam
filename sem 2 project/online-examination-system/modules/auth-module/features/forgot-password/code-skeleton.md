# Code Skeleton: Forgot Password

## Backend Implementation

### Forgot Password Handler

```typescript
async forgotPassword(req: Request, res: Response): Promise<void> {
  // Step 1: Extract email
  const { email } = req.body;
  
  // Step 2: Find user by email
  const user = await this.userModel.findByEmail(email);
  
  // Step 3: Generate reset token (even if user doesn't exist - security)
  if (user) {
    const resetToken = this.generateSecureToken();
    const tokenHash = await this.hashToken(resetToken);
    
    // Step 4: Store token with expiration
    user.reset_token = tokenHash;
    user.reset_token_expires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();
    
    // Step 5: Send email (async)
    this.emailService.sendPasswordResetEmail(user.email, resetToken);
  }
  
  // Step 6: Return generic success message
  res.json({ message: 'If email exists, reset link sent' });
}
```

### Reset Password Handler

```typescript
async resetPassword(req: Request, res: Response): Promise<void> {
  // Step 1: Extract token and new password
  const { token, password, confirmPassword } = req.body;
  
  // Step 2: Validate password match
  if (password !== confirmPassword) {
    res.status(400).json({ message: 'Passwords do not match' });
    return;
  }
  
  // Step 3: Hash provided token
  const tokenHash = await this.hashToken(token);
  
  // Step 4: Find user by reset token
  const user = await this.userModel.findOne({
    reset_token: tokenHash,
    reset_token_expires: { $gt: new Date() }
  });
  
  if (!user) {
    res.status(400).json({ message: 'Invalid or expired token' });
    return;
  }
  
  // Step 5: Hash new password
  const passwordHash = await this.passwordService.hash(password);
  
  // Step 6: Update password and clear reset token
  user.password_hash = passwordHash;
  user.reset_token = null;
  user.reset_token_expires = null;
  await user.save();
  
  // Step 7: Invalidate all sessions
  await this.sessionModel.deleteMany({ userId: user.id });
  
  // Step 8: Return success
  res.json({ message: 'Password reset successful' });
}
```

