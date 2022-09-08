import { IdGenerator } from './../services/IdGenerator';
import { loginInputDTO } from './../types/loginInputDTO';
import { UserDataBase } from './../data/UserDataBase';
import HashManager from '../services/HashManager';
import { signupInputDTO } from './../types/signupInputDTO';
import User from '../model/User';
import Authenticator from '../services/Authenticator';


export class UserBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenGenerator: Authenticator,
        private userDataBase: UserDataBase
    ) {}

    public async createUser(input: signupInputDTO): Promise<any> {
        try {
            const { name, password, email, role } = input
            // campos que serão preenchidos no body da requisição
            if (email.indexOf("@") === -1) {
                throw new Error("Invalid email!");
             }

             if (!name || !password || !email || !role) {
                throw new Error("Please, fill in all fields!");
             }

             if (password.length < 6) {
                throw new Error("Invalid password!");
             }
            const id = new IdGenerator().generateId()
            // função que gera o id automático
            const hashPassword = await new HashManager().hash(password)
            // função que guarda a senha 'hasheada' no banco de dados
            const newUser: User = new User(
                id,
                name,
                email,
                hashPassword,
                role
            )
            // criando um novo usuário
            await new UserDataBase().signUp(newUser)
            // inserindo o novo usuário no banco de dados
            const token = new Authenticator().generateToken({
                id,
                role: role
            })
            // gerando o token automático
            return token
            // retornando token
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async login(input: loginInputDTO) {
        try {
            const { email, password } = input

            
         if (email.indexOf("@") === -1) {
            throw new Error("Invalid email!");
            
         }

            const user = {
                email,
                password
            }

            const login = await new UserDataBase().login(email)
            
            if (!login) {
                throw new Error("Invalid credentials!")
            }

            const hashManager: HashManager = new HashManager()

            const compareResult = hashManager.compareHash(
                user.password,
                login.password
            )
            // comparando a senha do meu banco de dados com a senha que foi enviada no body da requisição pelo usuário.

            if (!compareResult) {
                throw new Error("Invalid credentials!")
            }

            const newAuthenticator = new Authenticator()
            const token = newAuthenticator.generateToken({
                id: login.id,
                role: login.role
            })

            return token
        } catch (error: any) {
            throw new Error(error.message || "Error to login. Please check your system administrator.");
        }
    }

}



