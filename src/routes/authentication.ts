import { createAccount, generateToken, verify, login, logout } from "../controller/authentication"
import express, { Request, Response } from "express"
import "../strategies/localStrategy"
import passport from "passport"
import { checkUser } from "../middleware/checkUser"
import { isAuthenticated } from "../middleware/isAuthenticated"

const auth = express.Router()

auth.post('/createAccount',checkUser,(req: Request, res: Response) => createAccount(req, res)) //passport.authenticate("local")
auth.post('/generateNewToken/:email', (req: Request, res: Response) => generateToken(req, res))
auth.post('/verify/:code', (req: Request, res: Response) => verify(req, res))
auth.post('/login',passport.authenticate("local"), (req: Request, res:  Response) => login(req, res))
auth.post('/logout',isAuthenticated, (req: Request, res: Response) => logout(req, res))

export default auth
//http://localhost:9898/api/v1//verify/UIPK15/6650f8257538a536fe8fb456