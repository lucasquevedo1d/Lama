import { USER_ROLES } from "../../src/model/User"
import { authenticationData } from "../../src/model/model"

/* export class IdGeneratorMock {
    public generateId = (input: authenticationData): string => {
        return "token"
    }

    public verify(token: string) {
        return {
            id: "idmocknormal",
            role: USER_ROLES.NORMAL
        }
    }
}  */

export class IdGeneratorMock {
    public generateId(): string {
        return "id"
    }
}