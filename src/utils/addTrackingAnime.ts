import { IAnimeArray, IAnimeContent } from "../interface/AnimeArray";
import { Response } from "express";


async function addTrackingAnime(userAnimeCollection: IAnimeArray, res: Response, name: IAnimeContent) {
    console.log(userAnimeCollection)
    console.log(name)

    if(!(userAnimeCollection && res && name)) throw new Error("invalid credentials") 
    
    const animeArray = userAnimeCollection.trackingAnime;
    if(!animeArray) throw new Error("no array in anime")
    const animeExists = animeArray.some(anime => anime.name === name as unknown as string);

    if (animeExists) {
        return res.status(409).json({ message: "Anime with this name already exists" });
    }

    animeArray.push({ name: name, animeId:  } as unknown as IAnimeContent);
    await userAnimeCollection.save();

    res.status(200).json({ message: `${name} has been added successfully` });
}

export {addTrackingAnime}