import mongoose from "mongoose"
import { UserType } from "./User"
import { GenrerType } from "./Genrer"
export type EntityIDType = {
    id: mongoose.Types.ObjectId
    title: string
    description: string
    imgURL: string
    content: string
    user: UserType | mongoose.Types.ObjectId
    status: string
    likeCount: number
    commentCount: number
    year: number
    genrers: [GenrerType | mongoose.Types.ObjectId]
    seasons: number
    rating: number
    rateCount: number
    createdAt: String
    updatedAt: String
    duration: number
}