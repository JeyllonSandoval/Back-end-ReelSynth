import { SerieType } from "./Serie";

export type SeasonType = {
    id: string;
    number: number;
    title: string;
    description: string;
    imgURL: string;
    serie: SerieType;
    episodesCount: number;
    createdAt: string;
    updatedAt: string;
};
