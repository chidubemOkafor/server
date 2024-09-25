import { IAnimeContent } from "./interface/AnimeArray"
import anime from "./routes/addAnime"
import { Animecollection } from "./schema/animeSchema"
import { User, UserAnime } from "./schema/userSchema"

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// a cron job will run this every 12 o'clock
const notification = async() => {
    const trackingArray: any = []
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    console.log(`current_date: ${day}, ${shortMonths[month]}, ${year}`)
    //"Friday 27 Sep, 04:30 PM"
    try {
        const user = await User.find({})
        for(let i = 0; i < user.length; i++) {
            const animeId = user[i].trackingAnimeId
            const animes = await UserAnime.findById(animeId)
            if(animes?.trackingAnime != null) {
                for(let i = 0; i < animes?.trackingAnime.length; i++) {
                    const animeDetail: IAnimeContent | null = await Animecollection.findOne({name: animes.trackingAnime[i].name})
                    if (!animeDetail || !animeDetail.name) {
                        continue;
                    }

                    if(animeDetail["release_time(sub)"] == "N/A") {
                        console.log(animeDetail.launch_date)
                    } else {
                        console.log(animeDetail["release_time(sub)"])
                    }
                    // console.log(animeDetail["release_time(sub)"])
                    
                    //   trackingArray.push(...animeDetail)
                }
            }
        }
        // console.log(trackingArray)
    } catch (error) {
        console.error(error)
    }
}

export {notification}