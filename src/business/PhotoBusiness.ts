import { inputGetId } from './../types/inputAddPhotoDTO';
import { PhotoDataBase } from './../data/PhotoDataBase';
import { IdGenerator } from './../services/IdGenerator';
import { inputAddPhotoDTO } from "../types/inputAddPhotoDTO";
import Authenticator from '../services/Authenticator';
import Photo from '../model/Photo';



export class PhotoBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private photoDatabase: PhotoDataBase,
        private Authenticator: Authenticator
    ) { }

    addPhoto = async (input: inputAddPhotoDTO) => {
        try {
            const { photo, show_id, auth } = input

            if (!photo || !show_id) {
                throw new Error("Invalid values to add photo!")
            }

            const userData = this.Authenticator.getData(auth)

            if (!userData) {
                throw new Error("Make sure you are loged in before proceeding!")
            }

            const id = this.idGenerator.generateId();

            const newPhoto = new Photo(
                id,
                photo,
                show_id
            )

            await this.photoDatabase.insertPhoto(newPhoto)
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    getPhotoById = async (input: inputGetId) => {
        try {
            const { show_id, auth } = input

            if (!show_id || !auth) {
                throw new Error("Please, check the ID and authorization!")
            }

            const data = await new PhotoDataBase().getAllPhotosById(show_id)
            return data
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
