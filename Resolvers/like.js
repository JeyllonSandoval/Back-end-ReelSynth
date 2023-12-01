
import Like from "../Models/Like.js"
import { filter } from "../helpers/Filter.js"
import User from "../Models/User.js"
import { verifyToken } from "../utils/Token.js"
import { getModel } from "../helpers/models.js"
import Genrer from "../Models/Genrer.js"



const updateCounter = async (like) => {

    const { entityID, entityType, liked } = like;
  
    try {
      const entity = await getModel(entityType).findByIdAndUpdate(entityID, {
        $inc: {
          likeCount: liked ? 1 : -1,
        },
      }, { new: true });
      return entity
    } catch (error) {
      console.error('Error updating like count:', error.message || error);
    }
  };


// Querys
const getLikes = async (_, { input }, {token}) => {
    console.log(input)

    const userToken = verifyToken(token)

    const query = filter(input)
    const likes = await Like.find({user: userToken.id, ...query}).populate({
        path: 'entityID',
        populate: {
          path: 'genrers'
        }
    }).populate({
        path: 'user',
        populate: {
          path: 'role country'
        }
    }).sort({updatedAt: -1})

    

    return likes
  }
  

  
const getLike = async (_, { entityID }, { token }) => { 

    const userToken = verifyToken(token)
    const like = await Like.findOne({user: userToken.id, entityID}).populate({
      path: 'entityID'
  }).populate({
      path: 'user',
      populate: {
        path: 'role country'
      }
  })

  
    return like 
  }




// Mutations
const createLike = async (_, { input }, { token }) => {
    try {
        if(!input) throw new Error("No se ha enviado el input")
        const userToken = verifyToken(token)
        const newLike = new Like({...input, user: userToken.id})
        await newLike.save()

        newLike.entityID = await getModel(newLike.entityType).findById(newLike.entityID)
        newLike.user = await User.findById(newLike.user).populate({
            path: 'role country'
        })
        await updateCounter(newLike)

        return newLike
        
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el Like: "+error.message || error)
    }
}

const deleteLike = async (_, { entityID }, { token }) => {
    try {
        const userToken = verifyToken(token)
        const like = await Like.findOneAndDelete({
            user: userToken.id,
            entityID
        }, {new: true}).populate({
            path: 'entityID'
        }).populate({
            path: 'user',
            populate: {
              path: 'role country'
            }
        })
        if(!like) throw new Error("No se ha encontrado el Like")
        like.liked = false
        updateCounter(like)
        return like
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar el Like: "+error.message || error)
    }
}

  export const likeResolvers = {
    Query: {
        getLikes,
        getLike
    },
    Mutation: {
        createLike,
        deleteLike
    }
}