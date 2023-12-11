import Producer from "../Models/Producer";
import { verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";
import { filter } from "../helpers/Filter";
import { ProducerType } from "../Types/Producer";
import { ContextInput } from "../Types/Context";

interface ProducerInput {
    id: string;
    input: ProducerType;
}
// Querys
const getProducers = async (_: any, { input }: ProducerInput) => {
    const query = filter(input);
    const producers = await Producer.find(query);
    return producers;
};

const getProducer = async (_: any, { id }: ProducerInput) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const producer = await Producer.findById(id);
    if (!producer) throw new Error("No se ha encontrado la Producer");
    return producer;
};

// Mutations
const createProducer = async (
    _: any,
    { input }: ProducerInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        const newProducer = new Producer(input);
        await newProducer.save();
        return newProducer;
    } catch (error) {
        throw new Error("Error al crear la Producer: " + error);
    }
};

const updateProducer = async (
    _: any,
    { id, input }: ProducerInput,
    { token }: ContextInput
) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        const producer = await Producer.findByIdAndUpdate(id, input, {
            new: true,
        });
        if (!producer) throw new Error("No se ha encontrado la Producer");
        return producer;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Producer: " + error);
    }
};

export const producerResolvers = {
    Query: {
        getProducers,
        getProducer,
    },
    Mutation: {
        createProducer,
        updateProducer,
    },
};
