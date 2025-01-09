import { eq, and, sql } from "drizzle-orm";
import { Response, Request } from "express";
import { db } from "@/db";
export const createCollection = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const { fields } = req.body;
      const userId = req.user?.id;
      console.log(name, fields, userId)
      if (!name || !fields || fields.length === 0 || !userId) {
        res.status(400).json({ error: "Name, userId and fields are required" });
        return;
      }
  
      const columns = fields
        .map((field: string) => {
          switch (field) {
            case "created":
              return `"${field}" TIMESTAMP DEFAULT NOW()`;
            case "description":
              return `"${field}" TEXT`;
            case "author":
              return `"${field}" TEXT`;
            case "category":
              return `"${field}" TEXT`;
            default:
              throw new Error(`Unsupported field: ${field}`);
          }
        })
        .join(", ");
      const tableName = `collection_${name}_${userId}`;
  
      const createTableQuery = `
        CREATE TABLE "${tableName}" (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          ${columns},
          "userId" uuid NOT NULL REFERENCES "user" (id) ON DELETE CASCADE
        );
      `;
  
      // Execute the query using raw SQL
      await db.execute(sql.raw(createTableQuery));
      
      res.status(201).json({
        status: "success",
        message: "Collection created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };