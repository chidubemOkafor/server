import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../schema/userSchema";
import { IUser } from "../interface/User";
import "../connection";
import bcrypt from 'bcrypt';

export default passport.use(
    new Strategy({usernameField: "email"}, async (email, password, done) => {

        console.log({"email": email, "password": password});

        try {
            const user = await User.findOne({ email });

            if (!user) {
                // No user found, authentication fails
                return done(null, false, { message: "User not found" });
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                // Password does not match, authentication fails
                return done(null, false, { message: "Incorrect password" });
            }

            // Password is correct, authentication succeeds
            console.log("Password is correct");
            return done(null, user); // Call done with the user object
        } catch (err) {
            // Handle any errors during authentication
            return done(err, false); // Send error if something goes wrong
        }
    })
);

// Serialize user instance to the session
passport.serializeUser((user, done) => {
    const newUser = user as IUser;
    done(null, newUser._id); // Serialize the user ID
});

// Deserialize user instance from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return done(null, false); // User not found
        }
        return done(null, user); // User found
    } catch (error) {
        return done(error, null); // Handle any errors during deserialization
    }
});
