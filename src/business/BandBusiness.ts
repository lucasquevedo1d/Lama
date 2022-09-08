import { BandDataBase } from './../data/BandDataBase';
import { getBandByIdInputDTO } from './../types/getBandByIdinputDTO';
import Band from '../model/Band';
import { USER_ROLES } from '../model/User';
import Authenticator from '../services/Authenticator';
import { IdGenerator } from './../services/IdGenerator';
import { signupbandInputDTO } from './../types/signupbandInputDTO';
import HashManager from '../services/HashManager';



export class BandBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenGenerator: Authenticator,
        private BandDataBase: BandDataBase
    ) { }

    public async signupBand(input: signupbandInputDTO) {
        try {
            const { name, music_genre, responsible, auth } = input
            const compareToken = new Authenticator().getData(auth)

            if (!compareToken && compareToken !== USER_ROLES.ADMIN) {
                throw new Error("You need to be logged in and role admin to register a band!")
            }

            if (!name || !music_genre || !responsible) {
                throw new Error("Fill in the fields correctly!");
            }
            const id = new IdGenerator().generateId()

            const newBand: Band = new Band(
                id,
                name,
                music_genre,
                responsible
            )

            await new BandDataBase().signUpBand(newBand)
        } catch (error: any) {
            throw new Error(error.message || "Error. Please check your system administrator.");

        }
    }


    public async getBandById(input: getBandByIdInputDTO) {
        try {
            const { id, auth } = input
            const compareToken = new Authenticator().getData(auth)

            if (!compareToken) {
                throw new Error("You need to be logged in and role admin to register a band!")
            }

            if (!id) {
                throw new Error("Please, enter the band id you want to search!")
            }

            const searchBand = await new BandDataBase().getBandById(id)


            const band = {
                id: searchBand.id,
                name: searchBand.name,
                music_genre: searchBand.music_genre,
                responsible: searchBand.responsible
            }
            return band

        } catch (error: any) {
            throw new Error(error.message || "Error. Please check your system administrator.");
        }
    }
}