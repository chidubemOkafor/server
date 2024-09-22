import passport from 'passport';
import { Request, Response, NextFunction } from "express"

export function myAuth (req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (err: any, user: any, info: { message: any; }) => {
        if (err) {
            return res.status(500).json({ message: "Internals server error" });
        }
        if (!user) {
            return res.status(401).json({ message: "Invalid email and password combination" })
        }
       
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ message: "Internals server error" });
            }
            return res.status(200).json({ message: "Logged in successfully" });
        });
    })(req, res, next);
};
