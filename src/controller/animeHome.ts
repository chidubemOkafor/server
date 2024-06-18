import { Animecollection } from "../schema/animeSchema";
import { Request, Response } from "express";

async function getHomeAnime(res: Response, req: Request) {
    try  {
        const getAllAnime = await 

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
}

