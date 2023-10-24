import Movie from "../Models/Movie.js"
import Season from "../Models/Season.js"
import Serie from "../Models/Serie.js"
import Episode from "../Models/Episode.js"
import Comment from "../Models/Comment.js"

export const getModel = (entityType) => {
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