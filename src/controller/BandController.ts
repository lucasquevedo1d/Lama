import { getBandByIdInputDTO } from './../types/getBandByIdinputDTO';
import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { signupbandInputDTO } from "../types/signupbandInputDTO";
import { BandDataBase } from '../data/BandDataBase';
import { IdGenerator } from '../services/IdGenerator';
import HashManager from '../services/HashManager';
import Authenticator from '../services/Authenticator';

export default class BandController {
    public async createBand(req: Request, res: Response) {
        try {
            const { name, music_genre, responsible } = req.body
            
            const auth = req.headers.authorization as string

            const input: signupbandInputDTO = {
                name,
                music_genre,
                responsible,
                auth
            }
            await new BandBusiness(new IdGenerator(), new HashManager(), new Authenticator(), new BandDataBase()).signupBand(input)
            res.status(201).send({message: "Band registered sucessfully"})
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }

    public async getBandById(req: Request, res: Response) {
        try {
            const auth = req.headers.authorization as string;
            const id = req.params.id 

            const getBand: getBandByIdInputDTO = {
                id,
                auth
            }

            const band = await new BandBusiness(new IdGenerator(), new HashManager(), new Authenticator(), new BandDataBase()).getBandById(getBand)
            res.status(200).send({ message: "Success!", band:band })
        } catch (error: any) {
              res.status(400).send({ message: error.message })
        }
    }


}