import jwt from "jsonwebtoken";

export const createToken = (user) => {
  try {

    const { id, userName, email, role } = user;
    const payload = {
      id,
      userName,
      email,
      role: {
        name: role.name
      },
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el token");
  }
}

export const verifyToken = (token) => {
  if(!token) throw new Error("No se ha enviado un token")
  const tokenInfo = jwt.verify(token, process.env.SECRET_KEY)
  if(!tokenInfo) throw new Error("Token invalido")
  return tokenInfo
}


