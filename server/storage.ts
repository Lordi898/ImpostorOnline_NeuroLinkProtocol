import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { type User, type InsertUser, users, userProfiles, type UserProfile, type InsertUserProfile } from "@shared/schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, profile: Partial<Omit<UserProfile, 'id' | 'userId'>>): Promise<UserProfile>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where((u) => u.id === id).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where((u) => u.username === username).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const result = await db.select().from(userProfiles).where((p) => p.userId === userId).limit(1);
    return result[0];
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const result = await db.insert(userProfiles).values(profile).returning();
    return result[0];
  }

  async updateUserProfile(userId: string, profile: Partial<Omit<UserProfile, 'id' | 'userId'>>): Promise<UserProfile> {
    const result = await db.update(userProfiles).set(profile).where((p) => p.userId === userId).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
