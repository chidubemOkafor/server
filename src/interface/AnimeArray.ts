import { Document, Schema, Types } from "mongoose"


interface IAnimeArray extends Document {
    _id?: Types.ObjectId,
    trackingAnime?: Array<IAnimeContent>,
    createdAt: Date,
    updatedAt: Date
}

interface IAnimeContent {
    name: string
}

export {IAnimeArray, IAnimeContent}