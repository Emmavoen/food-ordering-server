import type { Request, Response } from "express";
import User from "./user.model";
export class UserController {
  static async createCurrentUser(req: Request, res: Response) {
    try {
      const { auth0Id } = req.body;
      const existingUser = await User.findOne({ auth0Id });
      if (existingUser) {
        return res.status(200).send();
      }
      const newUser = await User.create(req.body);
      await newUser.save();
      res.status(201).json(newUser.toObject());
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create user", error });
    }
  }
}
