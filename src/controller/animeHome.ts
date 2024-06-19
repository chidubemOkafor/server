import { Animecollection } from "../schema/animeSchema";
import { Request, Response } from "express";
import { handlePagination } from "../utils/handlePagination";



async function getHomeAnime(req: Request, res: Response) {
    console.log(req.query)

    let pageLimit: number = parseInt(req.query.limit as string)  || 10
    let page: number = parseInt(req.query.p as string) || 1

    try  {
        const result = await  handlePagination(Animecollection, page, pageLimit)
        console.log(result)

        return res.status(200).json({ message: "Posts Fetched successfully", data: result });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
}

export {getHomeAnime}