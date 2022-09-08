import { USER_ROLES } from "../../src/model/User"
import { authenticationData } from "../../src/model/model"

export class TokenGeneratorMock {
    public generateToken = (input: authenticationData) => {
        return "token"
    }

    public getData(token: string) {
        return {
            id: "id_mock",
            role: USER_ROLES.NORMAL
        }
    }
}