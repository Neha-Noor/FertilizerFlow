import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const demandRequests = pgTable("demand_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requestId: text("request_id").notNull().unique(),
  region: text("region").notNull(),
  fertilizerType: text("fertilizer_type").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  requestedBy: varchar("requested_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productionPlans = pgTable("production_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  planName: text("plan_name").notNull(),
  planYear: integer("plan_year").notNull(),
  planType: text("plan_type").notNull(),
  description: text("description"),
  status: text("status").notNull().default("draft"),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productionData = pgTable("production_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  factoryName: text("factory_name").notNull(),
  fertilizerType: text("fertilizer_type").notNull(),
  dailyProduction: decimal("daily_production", { precision: 10, scale: 2 }).notNull(),
  targetProduction: decimal("target_production", { precision: 10, scale: 2 }).notNull(),
  efficiencyRate: decimal("efficiency_rate", { precision: 5, scale: 2 }).notNull(),
  status: text("status").notNull().default("operational"),
  productionDate: timestamp("production_date").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  fullName: true,
  email: true,
});

export const insertDemandRequestSchema = createInsertSchema(demandRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductionPlanSchema = createInsertSchema(productionPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductionDataSchema = createInsertSchema(productionData).omit({
  id: true,
  productionDate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDemandRequest = z.infer<typeof insertDemandRequestSchema>;
export type DemandRequest = typeof demandRequests.$inferSelect;
export type InsertProductionPlan = z.infer<typeof insertProductionPlanSchema>;
export type ProductionPlan = typeof productionPlans.$inferSelect;
export type InsertProductionData = z.infer<typeof insertProductionDataSchema>;
export type ProductionData = typeof productionData.$inferSelect;
