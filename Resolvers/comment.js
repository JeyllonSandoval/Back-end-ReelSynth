import Comment from "../Models/Comment.js"
import User from "../Models/User.js"
import { filter } from "../helpers/Filter.js"
import { verifyAdmin } from "../utils/auth.js"
import { verifyToken } from "../utils/Token.js"
import { getModel } from "../helpers/models.js"


const updateCounter = async (comment) => {
    const { entityID, entityType, status } = comment;
  
    try {
      const entity = await getModel(entityType).findByIdAndUpdate(entityID, {
        $inc: {
          commentCount: status !== 'DELETED' ? 1 : -1,
        },
      }, { new: true });
      return entity
    } catch (error) {
      console.error('Error updating comment count:', error.message || error);
    }
  };
// Querys
const getComments = async (_, { input }) => {
    console.log(input)
    const query = filter(input)
    const comment = await Comment.find(query).populate({
        path: 'entityID'
    }).populate({
        path: 'user',
        populate: {
          path: 'role country'
        }
    }).populate({
        path: 'parent',
        populate: {
            path: 'user'
        },
        strictPopulate: false
    })

    return comment
  }
  
const getComment = async (_, { entityID }, { token }) => { 
    const userToken = verifyToken(token)
    const comment = await Comment.findOne({user: userToken.id, entityID}).populate({
      path: 'entityID'
  }).populate({
      path: 'user',
      populate: {
        path: 'role country'
      }
  }).populate({
        path: 'parent',
        populate: {
            path: 'user'
        },
        strictPopulate: false
  })

  
    return comment 
  }


// Mutations
const createComment = async (_, { input }, { token }) => {
    try {
        if(!input) throw new Error("No se ha enviado el input")
        const userToken = verifyToken(token)
        const newComment = new Comment({...input, user: userToken.id})
        await newComment.save()

      if(newComment.parent){
          const parent = await Comment.findById(newComment.parent)

          parent.commentCount += 1;

          await parent.save()

          newComment.parent = await parent.populate({
            path: 'user',
            populate: {
                path: 'role country'
            }
          })
      }
        newComment.entityID = await getModel(newComment.entityType).findById(newComment.entityID)
        newComment.user = await User.findById(newComment.user).populate({
            path: 'role country'
        })
        
        await updateCounter(newComment)

        return newComment
        
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el Comment: "+error.message || error)
    }
}

const updateComment = async (_, {id, input }, { token }) => {
      // genera este codigo
      const userToken = verifyToken(token)
      const comment = await Comment.findById(id);
  
      if(!comment) throw new Error("No se encontro el comment")
  
      if (comment.user.toString() !== userToken.id && !verifyAdmin(userToken)) {
        throw new Error("No tienes permisos para actualizar este Comment");
      }
      
      comment.content = input.content;
      comment.status = 'EDITED';
      await comment.save();
      
      return comment;
}

  export const commentResolvers = {
    Query: {
        getComments,
        getComment
    },
    Mutation: {
        createComment,
        updateComment
    }
}