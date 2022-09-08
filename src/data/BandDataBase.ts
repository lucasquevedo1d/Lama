import Band from '../model/Band';
import { BaseDatabase } from './BaseDataBase';




export class BandDataBase extends BaseDatabase {
    private static TABLE_NAME = "LamaBand"


    public async signUpBand(band:Band): Promise<any> {
        try {
            await BaseDatabase.connection
                .insert(band)
                .into(BandDataBase.TABLE_NAME)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getBandById(id: string): Promise<any> {
        try {
            const result = await BaseDatabase.connection
                .select("*")
                .from(BandDataBase.TABLE_NAME)
                .where({ id })
            return result[0]
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}