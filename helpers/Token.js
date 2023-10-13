import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const { id, userName, email, role } = user;
  return jwt.sign({ id, userName, email, role }, process.env.SECRET_KEY, { expiresIn: "1d" });
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}


