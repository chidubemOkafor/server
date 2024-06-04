import express, { Request, Response } from "express"
import { isAuthenticated } from "../middleware/isAuthenticated"
import { updateProfileImage } from "../controller/profile"

// i need to import multer

const router = express.Router()

router.post('/updatePicture',isAuthenticated, (req: Request, res: Response) => updateProfileImage(req, res) )


export default router
//http://localhost:9898/api/v1//verify/UIPK15/6650f8257538a536fe8fb456