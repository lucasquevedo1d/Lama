import { USER_ROLES } from "../model/User"

//tipagem para transferir dados para função.
export type signupInputDTO = {
    name:string,
    email:string,
    password:string,
    role:USER_ROLES
}