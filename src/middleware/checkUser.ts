import { Request, Response, NextFunction } from "express"
import { User } from "../schema/userSchema";

export async function checkUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.body
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({ message: "user already exist" });
    }
    
    next();
  } catch(error) {
    return res.status(500).json({message: "internal server error"})
  }
}
