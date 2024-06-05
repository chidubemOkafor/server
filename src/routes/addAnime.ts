import express, { Request, Response } from "express"
import { isAuthenticated } from "../middleware/isAuthenticated"
import { addAnime, getAllTrackingAnime } from "../controller/animeFunction"

// i need to import multer

const anime = express.Router()

anime.post('/addAnime',isAuthenticated, addAnime)
anime.get('/getAllTrackingAnime',isAuthenticated, getAllTrackingAnime)


export default anime
//http://localhost:9898/api/v1//verify/UIPK15/6650f8257538a536fe8fb456