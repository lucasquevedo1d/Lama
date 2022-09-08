import { PhotoDataBase } from './../data/PhotoDataBase';
import { PhotoBusiness } from './../business/PhotoBusiness';
import { Request, Response } from 'express';
import { IdGenerator } from '../services/IdGenerator';
import Authenticator from '../services/Authenticator';
import { inputGetId } from '../types/inputAddPhotoDTO';



export class PhotoController {

    public async insertPhoto(req: Request, res: Response) {
        try {
            const auth = req.headers.authorization as string
            const { photo, show_id } = req.body

            const input = {
                photo,
                show_id,
                auth
            }
            await new PhotoBusiness(new IdGenerator(), new PhotoDataBase(), new Authenticator()).addPhoto(input)

            res.status(201).send({ message: "Successfully created photo" })
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }
    public async getAllPhotosById(req: Request, res: Response) {
        try {
            const auth = req.headers.authorization as string
            const show_id = req.params.id as string

            const input: inputGetId = {
                show_id,
                auth
            }

            const listOfPhotos = await new PhotoBusiness(new IdGenerator(), new PhotoDataBase(), new Authenticator()).getPhotoById(input)
            res.status(201).send({ photos: listOfPhotos })
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }

    }
}
