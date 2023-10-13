
import Role from "../Models/Role.js"

// Querys
const getRoles = async (_, { input }) => {
    const Roles = await Role.find()
    if(!input) return Roles
    return Roles.filter( (role) => role.name.toUpperCase().includes(input.name.toUpperCase()) ||  role.description.includes(input.description) || role.id === input.id )
  }
  
const getRole = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const role = await Role.findById(id)
    if(!role) throw new Error("No se ha encontrado el rol")
    return role 
  }


// Mutations
const createRole = async (_, { input }) => {
    try {
        const {name, description} = input
        const newRole = new Role({name,description})
        await newRole.save()
        return newRole
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el rol")
    }
    
}


  export const roleResolvers = {
    Query: {
        getRoles,
        getRole
    },
    Mutation: {
        createRole
    }
}