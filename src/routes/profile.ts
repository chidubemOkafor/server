import express, { Request, Response } from "express"
import { isAuthenticated } from "../middleware/isAuthenticated"
import { getProfile } from "../controller/profile"

// i need to import multer

const profile = express.Router()

// router.post('/updatePicture',isAuthenticated,updateProfileImage)
profile.get("/profile", isAuthenticated, getProfile)


export default profile
//http://localhost:9898/api/v1//verify/UIPK15/6650f8257538a536fe8fb456