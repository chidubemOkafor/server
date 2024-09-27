import { Request, Response } from "express";
import { User, UserAnime } from "../schema/userSchema";
import { IUser } from "../interface/User";
import { IAnimeContent } from "../interface/AnimeArray";
import { addTrackingAnime } from "../utils/addTrackingAnime";
import { Animecollection } from "../schema/animeSchema";
import { Types } from "mongoose";

// i want to get the name of the anime that is going to be passed (first)
// if the name is valid then i'll attempt to store it (second)
// check if the anime is already stored in the tracking anime array (third)
// if the anime is not stored i'll then store the id of the anime in the tracking anime array (fourth)

async function addAnime(req: Request, res: Response) {
    const  name = req.params.name
    const userDetail = req.user as IUser;

    try {
        const animeArray =  userDetail.trackingAnimes

        let userAnimeName = await Animecollection.findOne({name});
        if(!userAnimeName) {
            return res.status(404).json("name does not exist")
        }

        const animeExists = animeArray.includes(userAnimeName.name as string)

        if(animeExists) {
            return res.status(409).json("anime already exists")
        }

        const updatedUser = await User.findByIdAndUpdate(
            userDetail._id,
            { $push: { trackingAnimes: userAnimeName.name } },
            { new: true }
        );

        if(updatedUser) {
            return res.status(200).json({message: "anime added successfully", updatedUser})
        }

        return res.status(500).json({ message: "Failed to update user information" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function removeAnime(req: Request, res: Response) {
    const removeName = req.params.name;
    const userDetail = req.user as IUser;
    try {
        const animeArray = userDetail.trackingAnimes
        if (!animeArray.includes(removeName)) {
            return res.status(404).json({ message: `${removeName} not found in your tracking list` });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userDetail._id,
            { $pull: { trackingAnimes: removeName } },
            { new: true }
        );

        if(updatedUser) {
            return res.status(200).json({message: `${removeName} removed successfully`, updatedUser})
        }
        return res.status(500).json({ message: "Failed to update user information" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

async function getAllTrackingAnime(req: Request, res: Response) {
    const userDetail = req.user as IUser;
    try {
        console.log("userDetail: ",userDetail)
        const validResults = []
        const animeArray = userDetail.trackingAnimes

        if (animeArray.length === 0) {
            res.set('Cache-Control', 'no-store');
            return res.status(404).json({ message: "No anime to displays" });
        }

        const animePromise = animeArray.map(async (animeName) => {
            const animeCollection = await Animecollection.findOne({name: animeName})
            return animeCollection
        })

        const results = await Promise.all(animePromise)
        validResults.push(...results)

        res.set('Cache-Control', 'no-store');
        return res.status(200).json({ message: "success", anime: validResults });

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}



export {
    addAnime,
    removeAnime,
    getAllTrackingAnime
}