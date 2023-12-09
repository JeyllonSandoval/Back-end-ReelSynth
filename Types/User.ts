
import { RoleType } from "./Role"
import { CountryType } from "./Country"
export type UserType = {
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    imgURL: string,
    email: string,
    password: string,
    role: RoleType,
    country: CountryType,
    status: string,
    createdAt: string,
    updatedAt: string
}