import bcrypt from 'bcryptjs';
import { storage } from './storage';
import { type InsertUser } from '@shared/schema';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function registerUser(username: string, password: string) {
  // Validate input
  if (!username || username.length < 3) {
    throw new Error('Username must be at least 3 characters');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Check if user exists
  const existingUser = await storage.getUserByUsername(username);
  if (existingUser) {
    throw new Error('Username already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await storage.createUser({
    username,
    password: hashedPassword,
  });

  // Create user profile
  await storage.createUserProfile({
    userId: user.id,
  });

  return user;
}

export async function loginUser(username: string, password: string) {
  if (!username || !password) {
    throw new Error('Username and password required');
  }

  const user = await storage.getUserByUsername(username);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  // Don't return password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
