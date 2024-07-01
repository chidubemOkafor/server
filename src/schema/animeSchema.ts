import { Schema, model, Connection } from 'mongoose';

const animeCollectionSchema: Schema = new Schema({
  name: { type: String }
});

const Animecollection = model('animecollection', animeCollectionSchema);


export { Animecollection }