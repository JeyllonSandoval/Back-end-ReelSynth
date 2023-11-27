import Company from "../Models/Company.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"
import { filter } from "../helpers/Filter.js"
// Querys
const getCompanys = async (_, { input }) => {
    const query = filter(input)
    const companys = await Company.find(query)
    return Companys
}

const getCompany = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const company = await Company.findById(id)
    if(!Company) throw new Error("No se ha encontrado la Company")
    return company
    }


// Mutations
const createCompany = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        const newCompany = new Company(input) 
        await newCompany.save()
        return newCompany
    } catch (error) {
        throw new Error("Error al crear la Company: "+error.message || error)
    }
}

const updateCompany = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        const company = await Company.findByIdAndUpdate(id, input, {new: true})
        if(!company) throw new Error("No se ha encontrado la Company")
        return company
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Company: "+error.message || error)
    }
}

  export const companyResolvers = {
    Query: {
        getCompanys,
        getCompany
    },
    Mutation: {
        createCompany,
        updateCompany
    }
}