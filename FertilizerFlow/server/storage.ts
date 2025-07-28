import { 
  users, 
  demandRequests, 
  productionPlans, 
  productionData,
  type User, 
  type InsertUser,
  type DemandRequest,
  type InsertDemandRequest,
  type ProductionPlan,
  type InsertProductionPlan,
  type ProductionData,
  type InsertProductionData
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDemandRequests(): Promise<DemandRequest[]>;
  createDemandRequest(demand: InsertDemandRequest): Promise<DemandRequest>;
  updateDemandRequest(id: string, demand: Partial<InsertDemandRequest>): Promise<DemandRequest | undefined>;
  
  getProductionPlans(): Promise<ProductionPlan[]>;
  createProductionPlan(plan: InsertProductionPlan): Promise<ProductionPlan>;
  
  getProductionData(): Promise<ProductionData[]>;
  createProductionData(data: InsertProductionData): Promise<ProductionData>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getDemandRequests(): Promise<DemandRequest[]> {
    return await db.select().from(demandRequests).orderBy(desc(demandRequests.createdAt));
  }

  async createDemandRequest(demand: InsertDemandRequest): Promise<DemandRequest> {
    const [request] = await db
      .insert(demandRequests)
      .values(demand)
      .returning();
    return request;
  }

  async updateDemandRequest(id: string, demand: Partial<InsertDemandRequest>): Promise<DemandRequest | undefined> {
    const [request] = await db
      .update(demandRequests)
      .set({ ...demand, updatedAt: new Date() })
      .where(eq(demandRequests.id, id))
      .returning();
    return request || undefined;
  }

  async getProductionPlans(): Promise<ProductionPlan[]> {
    return await db.select().from(productionPlans).orderBy(desc(productionPlans.createdAt));
  }

  async createProductionPlan(plan: InsertProductionPlan): Promise<ProductionPlan> {
    const [productionPlan] = await db
      .insert(productionPlans)
      .values(plan)
      .returning();
    return productionPlan;
  }

  async getProductionData(): Promise<ProductionData[]> {
    return await db.select().from(productionData).orderBy(desc(productionData.productionDate));
  }

  async createProductionData(data: InsertProductionData): Promise<ProductionData> {
    const [production] = await db
      .insert(productionData)
      .values(data)
      .returning();
    return production;
  }
}

export const storage = new DatabaseStorage();
