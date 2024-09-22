import { Animecollection } from "../schema/animeSchema";
import { Request, Response } from "express";
import { handlePagination } from "../utils/handlePagination";


    // I need to write the discription on how this pagination feature work
    // you need ?page = page_number to select the page
    // you need ?limit = limit_mumber to select the amount of content displayed on the page
    // you need ?genre = valid_genre_name to select filter the genre

async function getHomeAnime(req: Request, res: Response) {
    const genresArray: string  = req.query.genre as string
    console.log(req.query.genre)
   

        let arrayToSend: Array<string> | [];
        const genres: Array<string> = genresArray.slice(1, -1).split(',')
        const parsedGenre = genres.map(genre => genre.trim());

        if (parsedGenre.length === 1 && parsedGenre[0] === '') {
            arrayToSend = []
        } else {
            arrayToSend = parsedGenre
        }
    let pageLimit: number = parseInt(req.query.limit as string)  || 10
    let page: number = parseInt(req.query.page as string) || 1

    try  {
        const result = await handlePagination(Animecollection, page, pageLimit, arrayToSend) // if you send [] it doesn't filter

        return res.status(200).json({ message: "Posts Fetched successfully", data: result });

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error", error})
    }
}

async function searchAnime(req:Request, res:Response) {
    try {
        const findname = req.params.name;
        const objs = await Animecollection.find({name:{ $regex:'.*'+findname+'.*'} });
        res.json(objs);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "internal server error", error})
    }
}

export {getHomeAnime, searchAnime}