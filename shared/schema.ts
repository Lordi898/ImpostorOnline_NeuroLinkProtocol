import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  xp: integer("xp").notNull().default(0),
  rankLevel: integer("rank_level").notNull().default(1),
  totalWins: integer("total_wins").notNull().default(0),
  winStreak: integer("win_streak").notNull().default(0),
  impostorWins: integer("impostor_wins").notNull().default(0),
  impostorWinStreak: integer("impostor_win_streak").notNull().default(0),
  unlockedAvatars: jsonb("unlocked_avatars").notNull().default(['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4', 'avatar-5', 'avatar-6', 'avatar-7', 'avatar-8', 'avatar-9', 'avatar-10']),
  unlockedThemes: jsonb("unlocked_themes").notNull().default(['hacker', 'futurista', 'retro']),
  currentAvatar: text("current_avatar").notNull().default('avatar-1'),
  currentTheme: text("current_theme").notNull().default('hacker'),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
