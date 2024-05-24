import { createAccount } from "../controller/authentication"
import express, { Request, Response } from "express"
import "../strategies/local-strategy"
import passport from "passport"

const router = express.Router()

router.post('/createAccount',(req: Request, res: Response) => createAccount(req, res)) //passport.authenticate("local"),

export default router