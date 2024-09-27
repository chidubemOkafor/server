import { Document, ObjectId, Schema, Types } from "mongoose"


interface IAnimeArray {
    _id?: Types.ObjectId,
    trackingAnime?: Array<IAnimeContent>,
    createdAt: Date,
    updatedAt: Date
}

interface IAnimeContent {
    _id: any | ObjectId
    name: string
    alt_name: string
    description: string
    thumbnail: string
    genre: Array<string>
    rating: string
    episodes: string
    duration: string
    launch_date: string
    type: string
    season: string
    source: string
    "release_time(sub)": string
    streaming_sites: Array<string>
    official_website: string
}

export {IAnimeArray, IAnimeContent}