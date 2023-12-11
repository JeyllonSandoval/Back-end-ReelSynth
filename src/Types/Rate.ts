import { EntityIDType } from "./EntityID";
import { UserType } from "./User";
export type RateType = {
    id: string;
    entityID: EntityIDType;
    entityType: "Movie" | "Serie" | "Comment" | "Episode" | "Season";
    user: UserType;
    rate: number;
    status: string;
    createdAt: string;
    updatedAt: string;
};
