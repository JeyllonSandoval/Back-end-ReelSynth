import { GenrerType } from "./Genrer"
export type SerieType = {
    id: string,
    title: string,
    description: string,
    imgURL: string,
    seasons: number,
    genrers: GenrerType[],
    createdAt: string,
    updatedAt: string
}