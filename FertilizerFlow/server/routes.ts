import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertDemandRequestSchema, insertProductionPlanSchema, insertProductionDataSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Demand Management Routes
  app.get("/api/demand-requests", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const requests = await storage.getDemandRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch demand requests" });
    }
  });

  app.post("/api/demand-requests", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const validatedData = insertDemandRequestSchema.parse({
        ...req.body,
        requestedBy: req.user!.id,
      });
      const request = await storage.createDemandRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ message: "Invalid demand request data" });
    }
  });

  app.patch("/api/demand-requests/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const request = await storage.updateDemandRequest(req.params.id, req.body);
      if (!request) {
        return res.status(404).json({ message: "Demand request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Failed to update demand request" });
    }
  });

  // Production Planning Routes
  app.get("/api/production-plans", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const plans = await storage.getProductionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch production plans" });
    }
  });

  app.post("/api/production-plans", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const validatedData = insertProductionPlanSchema.parse({
        ...req.body,
        createdBy: req.user!.id,
      });
      const plan = await storage.createProductionPlan(validatedData);
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ message: "Invalid production plan data" });
    }
  });

  // Production Data Routes
  app.get("/api/production-data", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const data = await storage.getProductionData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch production data" });
    }
  });

  app.post("/api/production-data", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const validatedData = insertProductionDataSchema.parse(req.body);
      const data = await storage.createProductionData(validatedData);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: "Invalid production data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
