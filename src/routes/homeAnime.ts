import express from "express"
import { getHomeAnime, searchAnime } from "../controller/animeHome"

// home anime is the anime that is displayed in the home page
// this home anime is fetched directly from the animecollection collection in my database

const homeAnime = express.Router()



homeAnime.get("/getHomeAnime",getHomeAnime)
homeAnime.get("/searchAnime/:name",searchAnime)



export default homeAnime