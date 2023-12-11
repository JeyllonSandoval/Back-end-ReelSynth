import { ProducerType } from "./Producer";
export type StudioType = {
    id: string;
    name: string;
    description: string;
    imgURL: string;
    status: string;
    producer: ProducerType;
    createdAt: Date;
    updatedAt: Date;
};
