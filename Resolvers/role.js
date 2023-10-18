
import Role from "../Models/Role.js"
import { filter } from "../helpers/Filter.js"

// Querys
const getRoles = async (_, { input }) => {
    const query = filter(input)
    const Roles = await Role.find(query)

    return Roles
  }
  
const getRole = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const role = await Role.findById(id)
    if(!role) throw new Error("No se ha encontrado el rol")
    return role 
  }


// Mutations
const createRole = async (_, { input }, { token }) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        const {name, description} = input
        const newRole = new Role({name,description})
        await newRole.save()
        return newRole
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el rol: "+error.message || error)
    }
}

const updateRole = async (_, { id,input }, { token }) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        if(!id) throw new Error("No se ha enviado un ID")
        const role = await Role.findByIdAndUpdate(id, input, {new: true})
        if(!role) throw new Error("No se ha encontrado el rol")
        return role
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar el rol: "+error.message || error)
    }
}

  export const roleResolvers = {
    Query: {
        getRoles,
        getRole
    },
    Mutation: {
        createRole,
        updateRole
    }
}