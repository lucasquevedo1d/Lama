import { UserDataBase } from './../src/data/UserDataBase';
import { TokenGeneratorMock } from './mocks/tokenGeneratorMock';
import { UserBusiness } from "../src/business/UserBusiness";
import { HashGeneratorMock } from "./mocks/hashGeneratorMock";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import UserDatabaseMock from "./mocks/UserDataBaseMock";
import { USER_ROLES } from '../src/model/User';


const userBusinessMock = new UserBusiness(
    new IdGeneratorMock(),
    new HashGeneratorMock(),
    new TokenGeneratorMock(),
    new UserDatabaseMock() as UserDataBase
)

describe("Testando o signup", () => {
    test("Should return error when name is empty", async () => {
        try {
            await userBusinessMock.createUser({
                name: "",
                email: "vitor@email.com",
                password: "123456",
                role: USER_ROLES.NORMAL
            })
        } catch (error: any) {
            expect(error.message).toEqual("Please, fill in all fields!")
        } finally {
            expect.assertions(1)
        }
    })

    test("Should return error when invalid email (@ missing)", async () => {
        try {
            await userBusinessMock.createUser({
                name: "Vitor",
                email: "vitoremail.com",
                password: "123456",
                role: USER_ROLES.NORMAL
            })
        } catch (error: any) {
            expect(error.message).toEqual("Invalid email!")
        } finally {
            expect.assertions(1)
        }
    })

    test("Should return error if password is invalid(less than 6 characters)", async () => {
        try {
            await userBusinessMock.createUser({
                name: "Vitor",
                email: "vitor@email.com",
                password: "12345",
                role: USER_ROLES.NORMAL
            })
        } catch (error: any) {
            expect(error.message).toEqual("Invalid password!")
        } finally {
            expect.assertions(1)
        }
    })


    test("Success registering", async () => {
        try {
            const { accessToken } = await userBusinessMock.createUser({
                name: "Vitor",
                email: "vitor@email.com",
                password: "123456",
                role: USER_ROLES.NORMAL
            })
            expect(accessToken).toEqual("token")
        } catch (error: any) {
            console.log(error)
        }
    })

})


describe("testes no login", () => {
    test("Should return an error if email provided doesn't exist", async () => {
        try {
            await userBusinessMock.login({
                email: "batata@email.com",
                password: "123456"
            })
        } catch (error: any) {
            expect(error.message).toEqual("Invalid credentials!")
        } finally {
            expect.assertions(1)
        }
    })

    test("Should return an error if invalid password", async () => {
        try {
            await userBusinessMock.login({
                email: "user2@gmail.com",
                password: "1234567"
            })
        } catch (error: any) {
            expect(error.message).toEqual("Invalid credentials!")
        } finally {
            expect.assertions(1)
        }
    })


    test("Login success", async () => {
        try {
            const accessToken = await userBusinessMock.login({
                email: "user1@gmail.com",
                password: "user1password"
            })
            expect(accessToken).toEqual("token")

        } catch (error: any) {
            console.log(error)
        }
    })

})
