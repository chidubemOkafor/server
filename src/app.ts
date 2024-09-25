import "./connection"
import express from "express"
import dotenv from "dotenv"
import auth from "./routes/authentication"
import { CONNECTION_URL  } from "./connection"
import MongoStore from "connect-mongo"
import session from "express-session"
import passport from "passport"
import cookieParser from "cookie-parser"
import "./strategies/localStrategy"
import anime from "./routes/addAnime"
import homeAnime from './routes/homeAnime'
import cors from 'cors'
import { notification } from "./notification"

dotenv.config()
notification()
const PORT = process.env.PORT || 8000

const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    credentials: true
  }));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const sessionStore = MongoStore.create(
    {
        mongoUrl: CONNECTION_URL,
        collectionName: "sessions"
    }
)

app.use(session({
    secret: process.env.SECRET as string,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 *24 // 24hrs
     }
}))

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1', auth)
app.use('/api/v1', anime)
app.use('/api/v1', homeAnime)

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT} here`)
})
