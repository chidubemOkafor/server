import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated"
import { addAnime, getAllTrackingAnime, removeAnime } from "../controller/animeFunction"

// i need to import multer

const anime = express.Router()

anime.post('/addAnime/:name', isAuthenticated, addAnime)
anime.get('/getAllTrackingAnime', isAuthenticated, getAllTrackingAnime)
anime.delete('/removeAnime/:name', isAuthenticated, removeAnime)


export default anime
//http://localhost:9898/api/v1//verify/UIPK15/6650f8257538a536fe8fb456