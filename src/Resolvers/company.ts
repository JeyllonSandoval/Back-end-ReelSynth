import Company from "../Models/Company";
import { verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";
import { filter } from "../helpers/Filter";

import { ContextInput } from "../Types/Context";

interface Company {
    name: string;
    description: string;
    url: string;
    status: string;
    entityType: string;
    entityID: string;
    host: string;
}

interface CompanyInput {
    id: string;
    input: Company;
}
// Querys
const getCompanys = async (_: any, { input }: CompanyInput) => {
    const query = filter(input);
    const companys = await Company.find(query);
    return companys;
};

const getCompany = async (_: any, { id }: CompanyInput) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const company = await Company.findById(id);
    if (!Company) throw new Error("No se ha encontrado la Company");
    return company;
};

// Mutations
const createCompany = async (
    _: any,
    { input }: CompanyInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        const newCompany = new Company(input);
        await newCompany.save();
        return newCompany;
    } catch (error) {
        throw new Error("Error al crear la Company: " + error);
    }
};

const updateCompany = async (
    _: any,
    { id, input }: CompanyInput,
    { token }: ContextInput
) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        const company = await Company.findByIdAndUpdate(id, input, {
            new: true,
        });
        if (!company) throw new Error("No se ha encontrado la Company");
        return company;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Company: " + error);
    }
};

export const companyResolvers = {
    Query: {
        getCompanys,
        getCompany,
    },
    Mutation: {
        createCompany,
        updateCompany,
    },
};
