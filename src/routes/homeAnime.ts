import express from "express"
import { getHomeAnime, searchAnime } from "../controller/animeHome"

const homeAnime = express.Router()

homeAnime.get("/getHomeAnime",getHomeAnime)
homeAnime.get("/searchAnime/:name",searchAnime)

export default homeAnime