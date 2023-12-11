import sendEmail from "../emailer";
import Like from "../Models/Like";
import { filter } from "./Filter";
import { htmlSerieUpdated, htmlTemporada } from "../Mail/index";
import { LikeType } from "../Types/Like";

export const SendEmailFollowers = async (input: Object) => {
    const query = filter(input);

    const likes: LikeType[] = await Like.find(query).populate("user entityID");

    if (likes.length === 0) return;

    const html = await htmlSerieUpdated({
        serieName: likes[0].entityID.title,
        imgURL: likes[0].entityID.imgURL,
    });

    const followers = likes.map((like) => like.user);
    const users = [...new Set(followers)];
    const to = users.map((user) => user.email);
    const subject = `Nueva temporada de ${likes[0].entityID.title}`;

    await sendEmail({ to, subject, html });
};

export const SendEmailFollowersEpisode = async (
    input: Object,
    numCap: string,
    numTemp: string
) => {
    const query = filter(input);

    const likes: LikeType[] = await Like.find(query).populate("user entityID");

    if (likes.length === 0) return;

    const html = await htmlTemporada({
        serieName: likes[0].entityID.title,
        numCap,
        numTemp,
        imgURL: likes[0].entityID.imgURL,
    });

    const followers = likes.map((like) => like.user);
    const users = [...new Set(followers)];
    const to = users.map((user) => user.email);
    const subject = `Nueva Episodio de ${likes[0].entityID.title} Temporada ${numTemp} Capitulo ${numCap}`;

    await sendEmail({ to, subject, html });
};
