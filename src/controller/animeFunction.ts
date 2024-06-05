import { Request, Response } from "express";
import { UserAnime, User } from "../schema/userSchema";
import { IUser } from "../interface/User";
import { IAnimeContent } from "../interface/AnimeArray";
import { addTrackingAnime } from "../utils/addTrackingAnime";

async function addAnime(req: Request, res: Response) {
    const { name }: IAnimeContent = req.body;
    const userDetail = req.user as IUser;
    let animeCollectionId = userDetail.trackingAnimeId;

    try {
        let userAnimeCollection = await UserAnime.findById(animeCollectionId);

        if (!userAnimeCollection) {
        
            const newAnimeCollection = new UserAnime();
            const savedAnimeCollection = await newAnimeCollection.save();

            const user = await User.findById(userDetail._id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            } 
                
            user.trackingAnimeId = savedAnimeCollection._id;
            await user.save();
            animeCollectionId = savedAnimeCollection._id;
            userAnimeCollection = savedAnimeCollection;
            
            addTrackingAnime(userAnimeCollection, res, name.toLocaleLowerCase() as unknown as IAnimeContent)
        }

        addTrackingAnime(userAnimeCollection, res, name.toLocaleLowerCase() as unknown as IAnimeContent)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function removeAnime(req: Request, res: Response) {
    const { name }: IAnimeContent = req.body;
    const userDetail = req.user as IUser;
    try {
        const trackingAnimes = await UserAnime.findById(userDetail.trackingAnimeId)
        if (!trackingAnimes)  return res.status(404).json({message: "no collection for user"})
            const nameInLowerCase  =  name.toLocaleLowerCase()
            const animeArray = trackingAnimes.trackingAnime

            const index = animeArray?.findIndex(anime => anime.name.toLocaleLowerCase() === nameInLowerCase)

            if (index === -1 || index === undefined) {
                return res.status(404).json({ message: "Anime not found in collection" });
            }

            animeArray?.splice(index, 1)
            await trackingAnimes.save()

            return res.status(200).json({ message: `${name} has been removed successfully` });
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}

async function getAllTrackingAnime(req: Request, res: Response) {
    const userDetail = req.user as IUser;
    try {
        const trackingAnimes = await UserAnime.findById(userDetail.trackingAnimeId)

        if(!trackingAnimes) return res.status(404).json({message: "nothing found"}) // this should never return because it is [] default
        return res.status(200).json({message: "success", result: trackingAnimes.trackingAnime})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
}


export { 
    addAnime, 
    removeAnime, 
    getAllTrackingAnime 
}