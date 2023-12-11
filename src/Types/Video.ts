import { EntityIDType } from "./EntityID";
import { HostType } from "./Host";
export type VideoType = {
    id?: string;
    url: string;
    duration: number;
    entityType: string;
    entityID: EntityIDType | string;
    status: string;
    host: string | HostType;
};
