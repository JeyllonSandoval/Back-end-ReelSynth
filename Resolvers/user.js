import { filter } from "../helpers/Filter.js"
import User from "../Models/User.js"
import { createToken, verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"
// Querys
const getUsers = async (_, { input }) => {
    const query = filter(input)
    const Users = await User.find(query).populate("role")

    return Users
  }
  
const getUser = async (_, {id}) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const user = await User.findById(id).populate("role")

    if(!user) throw new Error("No se ha encontrado el Usuario")
    return user 
  }

const login = async (_, {input}) => { 
    console.log(input);
    const {userName, password, email} = input
    if(!userName && !email) throw new Error("No se ha enviado un nombre de usuario o email")
    if(!password) throw new Error("No se ha enviado una contraseña")

    const userFound = await User.findOne({ $or: [{ userName: userName }, { email: email }] }).populate('role')
    console.log(userFound);
    if(!userFound) throw new Error("Usuario/Email o contraseña incorrectos")
    
    const matchPassword = await User.comparePassword(password, userFound.password)
    if(!matchPassword) throw new Error("Usuario/Email o contraseña incorrectos")

    const token = createToken(userFound)
    return { token }
}


const createUser = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        console.log(userToken);
        if(!input.userName || !input.password || !input.email || !input.role) 
            throw new Error("No se ha enviado todos los datos");

        input.password = await User.encryptPassword(input.password)
        const newUser = new User(input)
        await newUser.save()
        return await newUser.populate("role")
    } catch (error) {
        if(error.code === 11000) throw new Error("El nombre de usuario o email ya existe")
        throw new Error(error)
    }
    
}

const updateUser = async (_, { id, input }, {token}) => {
    try{
        const userToken = verifyToken(token)
        verifyAdmin(userToken);
        console.log(userToken);
        if(!id) throw new Error("No se ha enviado un ID")
        const user = await User.findByIdAndUpdate(id, input, {new: true}).populate("role")
        if(!user) throw new Error("No se ha encontrado el Usuario")
        return user
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}


  export const userResolvers = {
    Query: {
        getUsers,
        getUser
    },
    Mutation: {
        createUser,
        updateUser,
        login
    }
}