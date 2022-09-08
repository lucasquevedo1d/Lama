import User, { USER_ROLES } from '../model/User';
import { BaseDatabase } from './BaseDataBase';



export class UserDataBase extends BaseDatabase {
    private static TABLE_NAME = "LamaUser"

    public async signUp(user: User): Promise<void> {
        try {
            await BaseDatabase.connection
                .insert(user)
                .into(UserDataBase.TABLE_NAME)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async login(email: string): Promise<any> {
        try {
            const userLogin = await BaseDatabase.connection(UserDataBase.TABLE_NAME)
                .select("*")
                .where({ email })
            return userLogin[0]
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }



}