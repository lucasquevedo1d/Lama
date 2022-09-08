import Photo from '../model/Photo';
import { BaseDatabase } from './BaseDataBase';



export class PhotoDataBase extends BaseDatabase {
    private static TABLE_NAME = "LamaPhotos"

    public async insertPhoto(photo: Photo) {

        try {
            const result = await BaseDatabase.connection
                .insert(photo)
                .into(PhotoDataBase.TABLE_NAME)
            return result
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getAllPhotosById(show_id: string) {
        try {
            const result = await BaseDatabase.connection
                .select("photo")
                .from(PhotoDataBase.TABLE_NAME)
                .where({ show_id })
            return result
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
