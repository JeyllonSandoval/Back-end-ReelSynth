import { GenrerType } from "./Genrer";
import { StudioType } from "./Studio";
export type MovieType = {
    id: string;
    title: string;
    description: string;
    imgURL: string;
    duration: number;
    studio: StudioType;
    genrers: GenrerType[];
    createdAt: string;
    updatedAt: string;
};
