import { createAccount, generateToken, verify, login, logout } from "../controller/authentication"
import express, { Request, Response } from "express"
import "../strategies/localStrategy"
import passport from "passport"
import { checkUser } from "../middleware/checkUser"
import { isAuthenticated } from "../middleware/isAuthenticated"

const auth = express.Router()

auth.post('/createAccount',checkUser, createAccount) //passport.authenticate("local")
auth.post('/generateNewToken/:email', generateToken)
auth.post('/verify/:code', verify)
auth.post('/login',passport.authenticate("local"), login)
auth.post('/logout',isAuthenticated, logout)

export default auth
//http://localhost:9898/api/v1//verify/UIPK15/6650f8257538a536fe8fb456