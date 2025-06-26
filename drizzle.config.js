import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_Lxl4PJtGcKN5@ep-silent-water-a83lo4kf-pooler.eastus2.azure.neon.tech/ai-short-video-generator?sslmode=require&channel_binding=require',
  },
});