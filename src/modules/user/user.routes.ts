import express from "express";
import { UserController } from "./user.controller";
import { jwtCheck, jwtParse } from "../../middleware/auth";
import { validateMyUserRequest } from "../../middleware/validation";

const userRouter = express.Router();
userRouter.get("/", jwtCheck, jwtParse, UserController.getCurrentUser);
userRouter.post("/", jwtCheck, UserController.createCurrentUser);
userRouter.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  UserController.updateCurrentUser
);
export default userRouter;
