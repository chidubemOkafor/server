import { Schema, model, Connection } from 'mongoose';
import { IAnimeContent } from '../interface/AnimeArray';

const animeCollectionSchema: Schema = new Schema<IAnimeContent>({
  name: { type: String },
  alt_name: { type: String },
  description: { type: String },
  thumbnail: { type: String },
  genre: { type: [String] },
  rating: { type: String },
  episodes: { type: String },
  duration: { type: String },
  launch_date: { type: String },
  type: { type: String },
  season: { type: String },
  source: { type: String },
  "release_time(sub)": { type: String },
  streaming_sites: { type: [String] },
  official_website: { type: String }
});

const Animecollection = model('animecollection', animeCollectionSchema);


export { Animecollection }