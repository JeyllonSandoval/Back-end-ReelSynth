import Country from "../Models/Country";
import { filter } from "../helpers/Filter";
import { verifyAdmin } from "../utils/auth";
import { verifyToken } from "../utils/Token";
import { ContextInput } from "../Types/Context";
import { CountryType } from "../Types/Country";

interface CountryInput {
    id: string;
    input: CountryType;
}
// Querys
const getCountrys = async (_: any, { input }: CountryInput) => {
    const query = filter(input);
    const countrys = await Country.find(query);

    return countrys;
};

const getCountry = async (_: any, { id }: CountryInput) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const country = await Country.findById(id);
    if (!country) throw new Error("No se ha encontrado el country");
    return country;
};

// Mutations
const createCountry = async (
    _: any,
    { input }: CountryInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        const newCountry = new Country(input);
        await newCountry.save();
        return newCountry;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el country: " + error);
    }
};

const updateCountry = async (
    _: any,
    { id, input }: CountryInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        const country = await Country.findByIdAndUpdate(id, input, {
            new: true,
        });
        if (!country) throw new Error("No se ha encontrado el country");
        return country;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el country: " + error);
    }
};

export const countryResolvers = {
    Query: {
        getCountrys,
        getCountry,
    },
    Mutation: {
        createCountry,
        updateCountry,
    },
};
