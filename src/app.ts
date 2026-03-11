import express, { Request, Response } from "express";
import todoRoutes from "./routes/todo.routes";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Todo API is running");
});

app.use("/todos", todoRoutes);

export default app;