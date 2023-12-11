import { GenrerType } from "./Genrer";
import { StudioType } from "./Studio";
export type SerieType = {
    id: string;
    title: string;
    description: string;
    imgURL: string;
    seasons: number;
    studio: StudioType;
    genrers: GenrerType[];
    createdAt: string;
    updatedAt: string;
};
