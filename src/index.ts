import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB";
import userRouter from "./modules/user/user.routes";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "health ok!" });
});

app.use("/api/my/user", userRouter);

app.listen(process.env.PORT || 7000, () => {
  console.log(`Server is running on port ${process.env.PORT || 7000}`);
});
