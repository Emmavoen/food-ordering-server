import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB";
import userRouter from "./modules/user/user.routes";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/my/user", userRouter);

app.listen(process.env.PORT || 7000, () => {
  console.log(`Server is running on port ${process.env.PORT || 7000}`);
});
