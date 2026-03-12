import express from "express";
import cors from "cors";
import path from "path";
import { Pool } from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Neon PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Serve static dashboard files
app.use(express.static(path.join(__dirname, "public")));

// Health check
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({ status: "ok", db_time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Latest traffic rows
app.get("/api/traffic/latest", async (req, res) => {
  try {
    const segmentId = req.query.segment_id || 9000006266;

    const sql = `
      SELECT
        segment_id,
        recorded_at,
        pedestrian_count,
        bicycle_count,
        vehicle_count
      FROM traffic_observations
      WHERE segment_id = $1
      ORDER BY recorded_at DESC
      LIMIT 24
    `;

    const result = await pool.query(sql, [segmentId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// KPI summary
app.get("/api/dashboard/summary", async (req, res) => {
  try {
    const segmentId = req.query.segment_id || 9000006266;

    const sql = `
      SELECT
        COUNT(*) AS rows_loaded,
        COALESCE(SUM(pedestrian_count),0) AS total_pedestrians,
        COALESCE(SUM(bicycle_count),0) AS total_bicycles,
        COALESCE(SUM(vehicle_count),0) AS total_vehicles,
        COALESCE(MAX(recorded_at),NOW()) AS last_update
      FROM traffic_observations
      WHERE segment_id = $1
    `;

    const result = await pool.query(sql, [segmentId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// busiest interval
app.get("/api/dashboard/busiest-hour", async (req, res) => {
  try {
    const segmentId = req.query.segment_id || 9000006266;

    const sql = `
      SELECT
        segment_id,
        recorded_at,
        pedestrian_count,
        bicycle_count,
        vehicle_count,
        (pedestrian_count + bicycle_count + vehicle_count) AS total_flow
      FROM traffic_observations
      WHERE segment_id = $1
      ORDER BY total_flow DESC
      LIMIT 1
    `;

    const result = await pool.query(sql, [segmentId]);
    res.json(result.rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// fallback route
app.get("/", (req, res) => {
  res.send("Telraam API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});