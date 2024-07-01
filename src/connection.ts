import dotenv from 'dotenv';
import mongoose, { ConnectOptions, Connection } from 'mongoose';

dotenv.config();

const PASSWORD = process.env.DATABASE_PASSWORD;
const USERNAME = process.env.DATABASE_USERNAME;

const CONNECTION_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.coflu6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions: ConnectOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};


async function connectToDatabase(url: string):Promise<void> {
  try {
    await mongoose.connect(url, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(`Pinged your deployment. You successfully connected to MongoDB!`);
  } catch (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
}



connectToDatabase(CONNECTION_URL);

export { CONNECTION_URL };