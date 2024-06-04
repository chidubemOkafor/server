import { Document, Schema, Types } from "mongoose"


interface IAnimeArray extends Document {
    _id?: Types.ObjectId,
    trackingAnime?: Array<string>,
    createdAt: Date,
    updatedAt: Date
}

interface IAnimeContent extends Document {
    name: string
}

export {IAnimeArray, IAnimeContent}