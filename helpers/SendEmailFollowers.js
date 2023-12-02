

import sendEmail from "../emailer.js";
import Like from "../Models/Like.js";
import { filter } from "./Filter.js";
import { htmlSerieUpdated } from "../Mail/index.js";

export const SendEmailFollowers = async (input) => {

    const query = filter(input)
        
    const likes = await Like.find(query).populate("user entityID")

    if(likes.length === 0) return
    
    const html = await htmlSerieUpdated({
        serieName: likes[0].entityID.title,
        imgURL: likes[0].entityID.imgURL
    })
    


    const followers = likes.map(like => like.user)
    const users = [...new Set(followers)]
    const to = users.map(user => user.email)
    const subject = `Nueva temporada de ${likes[0].entityID.title}`

    await sendEmail({to, subject, html})

}