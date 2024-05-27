import { Request, Response, NextFunction } from "express"
import { User } from "../schema/userSchema";

export async function checkUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userId } = req.params
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }

    req.user = user;
 
    next();
  } catch(error) {
    return res.status(500).json({message: "internal server error"})
  }
}
