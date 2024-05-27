import { createAccount, generateToken, verify } from "../controller/authentication"
import express, { Request, Response } from "express"
import "../strategies/local-strategy"
import passport from "passport"
import { checkUser } from "../middleware/checkUser"

const router = express.Router()

router.post('/createAccount',(req: Request, res: Response) => createAccount(req, res)) //passport.authenticate("local")
router.post('/generateNewToken/:userId',checkUser, (req: Request, res: Response) => generateToken(req, res))
router.post('/verify/:token/:userId',checkUser, (req: Request, res: Response) => verify(req, res))

export default router
//http://localhost:9898/api/v1//verify/UIPK15/6650f8257538a536fe8fb456