import User, { USER_ROLES } from './../src/model/User'

export const UserMockNormal = new User(
    "idmocknormal",
    "eduarda",
    "eduardamocknormal@hotmail.com",
    "123456",
    USER_ROLES.NORMAL
)

export const UserMockAdmin = new User(
    "idmockadmin",
    "Lucas",
    "lucasmockadmin@hotmail.com",
    "123456",
    USER_ROLES.ADMIN
)
