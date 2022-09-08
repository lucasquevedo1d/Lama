import { UserDataBase } from './../data/UserDataBase';
import { IdGenerator } from './../services/IdGenerator';
import { Request, Response } from "express";
import { signupInputDTO } from "../types/signupInputDTO";
import { UserBusiness } from "../business/UserBusiness";
import { loginInputDTO } from "../types/loginInputDTO";
import HashManager from '../services/HashManager';
import Authenticator from '../services/Authenticator';



export default class UserController {

    signup = async (req: Request, res: Response) => {
        try {
            const { name, email, password, role } = req.body

            const input: signupInputDTO = {
                name,
                email,
                password,
                role
            }

            const token = await new UserBusiness(new IdGenerator(), new HashManager(), new Authenticator(), new UserDataBase()).createUser(input)
            res.status(200).send({ token })
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const input: loginInputDTO = {
                email,
                password
            }
            const token = await new UserBusiness(new IdGenerator(), new HashManager(), new Authenticator(), new UserDataBase()).login(input)

            res.status(200).send({ message: "user logged in successfully", token })
        } catch (error: any) {
            res.status(404).send({ message: error.message });
        }
    }
}