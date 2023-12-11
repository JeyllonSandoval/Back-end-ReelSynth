import { VideoType } from "./Video"
import { SeasonType } from "./Season"
export type EpisodeType = {
    id: string,
    number: number,
    title: string,
    description: string,
    duration: number,
    imgURL: string,
    video: VideoType,
    season: SeasonType,
    createdAt: string,
    updatedAt: string
}