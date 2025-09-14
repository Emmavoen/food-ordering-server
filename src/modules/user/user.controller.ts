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

  static async updateCurrentUser(req: Request, res: Response) {
    try {
      const { name, addressLine1, city, country } = req.body;
      const existingUser = await User.findById(req.userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      existingUser.name = name;
      existingUser.addressLine1 = addressLine1;
      existingUser.city = city;
      existingUser.country = country;
      await existingUser.save();
      res.status(201).json({ user: existingUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update user" });
    }
  }

  static async getCurrentUser(req: Request, res: Response) {
    try {
      const existingUser = await User.findById(req.userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(existingUser);
      res.status(200).json(existingUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get user" });
    }
  }
}
