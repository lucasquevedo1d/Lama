import { getShowByDayInputDTO } from './../types/getShowByDayInputDTO';
import { ShowsDataBase } from './../data/ShowsDataBase';
import Authenticator from '../services/Authenticator';
import { IdGenerator } from './../services/IdGenerator';
import { showInputDTO } from './../types/showInputDTO';


export class ShowBusiness {

    public checkArray = (array: any) => {
        if (array.length !== 0) {
            throw new Error("You can't schedule a show at this time! Already have a show scheduled.")
        }
    }
    // um 'erro' para conferir se o tamanho do array de shows agendados é maior que 0. se for, retornará
    // um erro ao usuário não permitindo que outro show seja agendado no mesmo dia/mesma hora.

    public async show(input: showInputDTO) {
        try {
            const { band_id, week_day, start_time, end_time, auth } = input

            if (start_time < 8 || start_time > 23) {
                throw new Error("You can't schedule a show at this time!")
            }

            if (!band_id || !week_day || !start_time || !end_time) {
                throw new Error("Please, fill in all the fiels!")
            }

            const verifyAuth = new Authenticator().getData(auth)

            if (!verifyAuth) {
                throw new Error("You need to be logged in!")
            }

            const id = new IdGenerator().generateId();

            const show = await new ShowsDataBase().checkSchedule(week_day, start_time, end_time)
            this.checkArray(show)
            // utilizando a função criada na linha 14.

            const newShow: any = {
                id,
                week_day,
                start_time,
                end_time,
                band_id
            }
            await new ShowsDataBase().signUpShow(newShow)
            // inserindo um novo show.
        } catch (error: any) {
            throw new Error(error.message || "Error. Please check your system administrator.");
        }
    }


    public checkArray2 = (array: any) => {
        if (array.length === 0) {
            throw new Error("There's no show on this day.")
        }
    }

    public async getShowByDay(input: getShowByDayInputDTO) {
        try {
            const { week_day, auth } = input

            const checkingAuth = new Authenticator().getData(auth)
            // verificando o authorization

            if (!checkingAuth) {
                throw new Error("You need to be logged in!")
            }

            const data = await new ShowsDataBase().getShowsByDay(week_day);
            this.checkArray2(data)

            return data
        } catch (error: any) {
            throw new Error(error.message || "Error. Please check your system administrator.");
        }
    }

}

