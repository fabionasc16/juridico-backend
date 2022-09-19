import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.get("/", (req, res) => {
  return res.send("Teste ok");
});

export { app };
