import { Request, Response } from "express";

export function addAnime(req: Request, res: Response) {
    console.log("this is the user",req.user)
    res.send()
}  