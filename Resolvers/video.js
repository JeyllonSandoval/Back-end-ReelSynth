
import Video from "../Models/Video.js"
import { filter } from "../helpers/Filter.js"
import User from "../Models/User.js"
import { verifyAdmin } from "../utils/auth.js"
import { verifyToken } from "../utils/Token.js"
import { getModel } from "../helpers/models.js"
import Host from "../Models/Host.js"

// Querys
const getVideos = async (_, { input }) => {
    const query = filter(input)
    const videos = await Video.find(query).populate({
        path: 'entityID'
    }).populate({
        path: 'user',
        populate: {
          path: 'role country'
        }
    }).populate('host')

    return videos
  }
  

  
const getVideo = async (_, { id }) => { 

    const video = await Video.findById(id).populate({
      path: 'entityID'
  }).populate({
      path: 'user',
      populate: {
        path: 'role country'
      }
  }).populate('host')

  
    return video 
  }




// Mutations
const createVideo = async (_, { input }, { token }) => {
    try {
        if(!input) throw new Error("No se ha enviado el input")
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        const newVideo = new Video({...input, user: userToken.id})
        await newVideo.save()

        newVideo.entityID = await getModel(newVideo.entityType).findById(newVideo.entityID)
        newVideo.user = await User.findById(newVideo.user).populate({
            path: 'role country'
        })

        newVideo.host = await Host.findById(newVideo.host)

        return newVideo
        
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el Video: "+error.message || error)
    }
}

const updateVideo = async (_, { id, input }, { token }) =>{
    // genera este codigo
    const userToken = verifyToken(token);
    verifyAdmin(userToken);

    const video = await Video.findByIdAndUpdate(id, input, {new: true});
    if(!video) throw new Error("No se encontro el video")


    const entity = await getModel(video.entityType).findById(video.entityID);

    video.entityID = entity

    video.user = await User.findById(video.user).populate({
            path: 'role country'
        })

    video.host = await Host.findById(video.host)

    return video

}

const deleteVideo = async (_, { id }, { token }) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        const video = await Video.findByIdAndDelete(id).populate({
            path: 'entityID'
        }).populate({
            path: 'user',
            populate: {
              path: 'role country'
            }
        }).populate('host')
        if(!video) throw new Error("No se ha encontrado el Video")
        video.status = 'DELETED'
        return video
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar el Video: "+error.message || error)
    }
}

  export const videoResolvers = {
    Query: {
        getVideos,
        getVideo
    },
    Mutation: {
        createVideo,
        updateVideo,
        deleteVideo
    }
}