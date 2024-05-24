import dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose'

dotenv.config()

const PASSWORD = process.env.DATABASE_PASSWORD
const USERNAME = process.env.DATABASE_USERNAME

export const CONNECTION_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.coflu6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run(): Promise<void> {
    try {
      await mongoose.connect(CONNECTION_URL,clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error(err)
    }
  }

  run()

  