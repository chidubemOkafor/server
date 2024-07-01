import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../schema/userSchema";
import { IUser } from "../interface/User";
import "../connection"
import bcrypt from 'bcrypt'

export default passport.use(
    new Strategy({usernameField: "email"}, async (email, password, done) => {

        console.log({"email": email, "password": password})

        try {
            const user = await User.findOne({email})

            if (!user) throw new Error("user is not found")
    
            const checkPassword = await bcrypt.compare(password, user.password)

            if(!checkPassword) throw new Error("invalid credentials")
            
            console.log("password is correct")

            done(null, user)
        } catch (err) {
            done(err, false)
        }
    })
)

passport.serializeUser((user, done) => {
    const newUser = user as IUser
    done(null, newUser)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({_id: id})
        if(!user) {
            throw new Error("user not found")
        }
        done(null, user)
    } catch (error) {
        done(error, null)
    } 
})