import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import statsRoutes from "./routes/statsRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rutas
app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/stats", statsRoutes);

// Conexión DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
