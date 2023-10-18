
import Comment from "../Models/Comment.js"
import { filter } from "../helpers/Filter.js"
import { verifyAdmin } from "../utils/auth.js"
import { verifyToken } from "../utils/Token.js"

// Querys
const getComments = async (_, { input }) => {
    console.log(input)
    const query = filter(input)
    const comments = await Comment.find(query).populate({
        path: 'user serie season episode movie',
        strictPopulate: false
    }).populate({
        path: 'parent',
        populate: {
            path: 'user'
        },
        match: { parent: input.parent },
        strictPopulate: false
    })

    return comments
  }
  
const getComment = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const comment = await Comment.findById(id).populate({
        path: 'user serie season episode movie',
        strictPopulate: false
    }).populate({
        path: 'parent',
        populate: {
            path: 'user'
        },
        strictPopulate: false
    })
    if(!comment) throw new Error("No se ha encontrado el comment")
    return comment 
  }


// Mutations
const createComment = async (_, { input }, { token }) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        const newComment = new Comment({...input, user: userToken.id})
        await newComment.save()
        return await newComment.populate({
            path: 'user serie season episode movie',
            strictPopulate: false
        }).populate({
            path: 'parent',
            populate: {
                path: 'user'
            },
            match: { parent: input.parent },
            strictPopulate: false
        })
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el comment: "+error.message || error)
    }
}

const updateComment = async (_, { id,input }, { token }) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        if(!id) throw new Error("No se ha enviado un ID")
        const comment = await Comment.findByIdAndUpdate(id, input, {new: true}).populate({
            path: 'user serie season episode movie',
            strictPopulate: false
        }).populate({
            path: 'parent',
            populate: {
                path: 'user'
            },
            match: { parent: input.parent },
            strictPopulate: false
        })
        if(!comment) throw new Error("No se ha encontrado el comment")
        return comment
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar el comment: "+error.message || error)
    }
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