import { createAccount, generateToken, verify, login, logout } from "../controller/authentication"
import express, { Request, Response } from "express"
import "../strategies/localStrategy"
import passport from "passport"
import { checkUser } from "../middleware/checkUser"

const router = express.Router()

router.post('/createAccount',checkUser,(req: Request, res: Response) => createAccount(req, res)) //passport.authenticate("local")
router.post('/generateNewToken/:email', (req: Request, res: Response) => generateToken(req, res))
router.post('/verify/:code', (req: Request, res: Response) => verify(req, res))
router.post('/login',passport.authenticate("local"), (req: Request, res:  Response) => login(req, res))
router.post('/logout',checkUser, (req: Request, res: Response) => logout(req, res))

export default router
//http://localhost:9898/api/v1//verify/UIPK15/6650f8257538a536fe8fb456