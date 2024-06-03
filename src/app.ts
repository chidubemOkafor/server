import "./connection"
import express from "express"
import dotenv from "dotenv"
import router from "./routes/authentication"
import { CONNECTION_URL  } from "./connection"
import MongoStore from "connect-mongo"
import session from "express-session"
import passport from "passport"
import cookieParser from "cookie-parser"
import "./strategies/localStrategy"

dotenv.config()
const PORT = process.env.PORT

const app = express()

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
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 *24 // 24hrs
     }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1', router)

app.listen(PORT, () => {

    console.log(`app is listening on port ${PORT}`)
})
