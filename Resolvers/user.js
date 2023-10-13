
import User from "../Models/User.js"

// Querys
const getUsers = async (_, { input }) => {
    const Users = await User.find().populate("role")
    console.log(Users)
    if(!input) return Users
    return Users.filter( (User) => User.name.toUpperCase().includes(input.name.toUpperCase()) ||  User.description.includes(input.description) || User.id === input.id )
  }
  
const getUser = async (_, {id}) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const user = await User.findById(id).populate("role")

    if(!user) throw new Error("No se ha encontrado el Usuario")
    return user 
  }


// Mutations
const createUser = async (_, { input }) => {
    try {
        if(!input.userName) throw new Error("No se ha enviado un nombre de usuario")
        if(!input.password) throw new Error("No se ha enviado una contraseña")
        if(!input.email) throw new Error("No se ha enviado un email")
        if(!input.role) throw new Error("No se ha enviado un rol")

        input.password = await User.encryptPassword(input.password)
        const newUser = new User(input)
        await newUser.save()
        return await newUser.populate("role")
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el usuario")
    }
    
}


const updateUser = async (_, { id, input }) => {
    try{
        if(!id) throw new Error("No se ha enviado un ID")
        const user = await User.findByIdAndUpdate(id, input, {new: true}).populate("role")
        if(!user) throw new Error("No se ha encontrado el Usuario")
        return user
    }catch(error){
        console.log(error)
        throw new Error("Error al actualizar el usuario")
    }
}


  export const userResolvers = {
    Query: {
        getUsers,
        getUser
    },
    Mutation: {
        createUser,
        updateUser
    }
}