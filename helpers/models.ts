import Movie from "../Models/Movie"
import Season from "../Models/Season"
import Serie from "../Models/Serie"
import Episode from "../Models/Episode"
import Comment from "../Models/Comment"
type EntityType =
  | "Movie"
  | "Serie"
  | "Season"
  | "Episode"
  | "Comment";


export const getModel = (entityType: EntityType) => {
    switch (entityType) {
      case 'Movie':
        return Movie;
      case 'Season':
        return Season;
      case 'Episode':
        return Episode;
      case 'Serie':
        return Serie;
      case 'Comment':
        return Comment;
      default:
        throw new Error('Invalid entity type.');
    }
};