import { createAccount, generateToken, verify, logout, checkAuth } from "../controller/authentication"
import express from "express"
import "../strategies/localStrategy"
import { checkUser } from "../middleware/checkUser"
import { isAuthenticated } from "../middleware/isAuthenticated"
import { myAuth } from "../middleware/myAuth"
import { changePassword } from "../controller/authentication"

const auth = express.Router()

auth.post('/createAccount', checkUser, createAccount)
auth.post('/generateNewToken/:email', generateToken)
auth.post('/changepassword', checkUser, changePassword)
auth.get('/checkAuth', isAuthenticated, checkAuth)
auth.post('/verify/:code', verify)
auth.post('/login', myAuth)
auth.post('/logout', isAuthenticated, logout)

export default auth