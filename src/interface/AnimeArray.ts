import { Document, ObjectId, Schema, Types } from "mongoose"


interface IAnimeArray extends Document {
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


// _id
// 666b3665e510fb6d1873970a
// name
// "Tensei shitara Slime Datta Ken 3"
// alt_name
// "Tensei shitara Slime Datta Ken 3"
// description
// "The third season of Tensei Shitara Slime Datta KenRimuru has officiall…"
// thumbnail
// "https://img.animeschedule.net/production/assets/public/img/anime/jpg/d…"

// genre
// Array (7)
// rating
// "7.86"
// episodes
// "24 eps"
// duration
// "24 min"
// launch_date
// "Apr 05, 2024
// at 04:30 PM BST"
// type
// "TV"
// season
// "Spring 2024"
// source
// "Light Novel"
// release_time(sub)
// "Friday 14 Jun, 04:30 PM"

// streaming_sites
// Array (2)
// official_website
// "http://www.ten-sura.com/"

export {IAnimeArray, IAnimeContent}