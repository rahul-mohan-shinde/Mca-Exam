import { Request, Response, NextFunction } from 'express';

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  // Step 1: Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
    return;
  }

  // Step 2: Check password
  if (!password || password.length === 0) {
    res.status(400).json({
      success: false,
      message: 'Password is required'
    });
    return;
  }

  next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password, confirmPassword } = req.body;

  // Step 1: Validate name
  if (!name || name.length < 2 || name.length > 100) {
    res.status(400).json({
      success: false,
      message: 'Name must be 2-100 characters'
    });
    return;
  }

  // Step 2: Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
    return;
  }

  // Step 3: Validate password
  if (!password || password.length < 8) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters'
    });
    return;
  }

  // Step 4: Validate password match
  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    });
    return;
  }

  next();
};

