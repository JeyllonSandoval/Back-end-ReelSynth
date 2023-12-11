import { EntityIDType } from "./EntityID";
import { UserType } from "./User";

export type LikeType = {
    id: string;
    user: UserType;
    entityID: EntityIDType;
    entityType: "Movie" | "Serie" | "Season" | "Episode" | "Comment";
    liked: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
};
