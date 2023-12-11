
import { EntityIDType } from "./EntityID"
import { UserType } from "./User"

export type CommentType ={
    id: string,
    user: UserType,
    entityID: EntityIDType,
    entityType: "Movie" | "Serie" | "Season" | "Episode" | "Comment",
    content: string,
    parent: string,
    commentCount: number,
    status: string,
    createdAt: string,
    updatedAt: string
}