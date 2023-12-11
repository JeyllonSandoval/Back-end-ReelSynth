import { filter } from "../helpers/Filter";
import User, { IUser } from "../Models/User";
import { createToken, verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";
import Role from "../Models/Role";
import sendEmail from "../emailer";
import { htmlWelcome } from "../Mail/index";
import { UserType } from "../Types/User";
// Querys
const getUsers = async (_: any, { input }: { input: Object }) => {
    const query = filter(input);
    const Users = await User.find(query).populate("role").populate("country");

    return Users;
};

const getUser = async (_: any, { id }: { id: string }) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const user = await User.findById(id).populate("role").populate("country");

    if (!user) throw new Error("No se ha encontrado el Usuario");
    return user;
};

const getUserByToken = async (_: any, { token }: { token: string }) => {
    if (!token) throw new Error("No se ha enviado un Token");
    const userToken = verifyToken(token);
    if (typeof userToken === "string") {
        throw new Error("El token no es válido");
    }
    const user = await User.findById(userToken.id)
        .populate("role")
        .populate("country");

    if (!user) throw new Error("No se ha encontrado el Usuario");
    return user;
};

const login = async (_: any, { input }: { input: UserType }) => {
    console.log(input);
    const { userName, password, email } = input;
    if (!userName && !email)
        throw new Error("No se ha enviado un nombre de usuario o email");
    if (!password) throw new Error("No se ha enviado una contraseña");

    const userFound: (IUser & UserType) | null = await User.findOne({
        $or: [{ userName: userName }, { email: email }],
    }).populate("role");
    if (!userFound) throw new Error("Usuario/Email o contraseña incorrectos");

    const matchPassword = await User.comparePassword(
        password,
        userFound.password
    );

    if (!matchPassword)
        throw new Error("Usuario/Email o contraseña incorrectos");

    const token = createToken(userFound);
    return { token };
};

const signup = async (_: any, { input }: { input: UserType }) => {
    const { userName, password, email } = input;
    if (!userName && !email)
        throw new Error("No se ha enviado un nombre de usuario o email");
    if (!password) throw new Error("No se ha enviado una contraseña");

    const userFound = await User.findOne({
        $or: [{ userName: userName }, { email: email }],
    });
    if (userFound) throw new Error("Usuario/Email ya existe");
    const publicRole = await Role.findOne({ name: "Public" });
    if (!publicRole) throw new Error("No se ha encontrado el rol publico");
    const newUser = new User(input);
    newUser.password = await User.encryptPassword(password);
    newUser.role = publicRole?.id;
    const user = await newUser.save();
    if (!user) throw new Error("No se ha podido crear el usuario");

    const populatedUser: UserType = await user.populate("role");

    const token = createToken(populatedUser);

    const html = htmlWelcome({ userName: newUser.userName });

    sendEmail({
        to: newUser.email,
        subject: "Bienvenido a ReelSynth",
        html,
    });

    return { token };
};

const createUser = async (
    _: any,
    { input }: { input: UserType },
    { token }: { token: string }
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string")
            throw new Error("El token no es válido");
        verifyAdmin(userToken);
        console.log(userToken);
        if (!input.userName || !input.password || !input.email || !input.role)
            throw new Error("No se ha enviado todos los datos");

        input.password = await User.encryptPassword(input.password);
        const newUser = new User(input);
        await newUser.save();
        return await newUser.populate("role country");
    } catch (error) {
        throw new Error("El nombre de usuario o email ya existe");
    }
};

const updateUser = async (
    _: any,
    { id, input }: { input: UserType; id: string },
    { token }: { token: string }
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string")
            throw new Error("El token no es válido");
        if (userToken.id !== id) verifyAdmin(userToken);

        if (!id) throw new Error("No se ha enviado un ID");
        if (input.password)
            input.password = await User.encryptPassword(input.password);
        const user = await User.findByIdAndUpdate(id, input, {
            new: true,
        }).populate("role country");
        if (!user) throw new Error("No se ha encontrado el Usuario");
        return user;
    } catch (error) {
        throw new Error("El nombre de usuario o email ya existe");
    }
};

export const userResolvers = {
    Query: {
        getUsers,
        getUser,
        getUserByToken,
    },
    Mutation: {
        createUser,
        updateUser,
        login,
        signup,
    },
};
