import { getShowByDayInputDTO } from './../types/getShowByDayInputDTO';
import { ShowBusiness } from './../business/ShowsBusiness';
import { showInputDTO } from './../types/showInputDTO';
import { Request, Response } from "express"



export class ShowController {

    public async scheduleShow(req: Request, res: Response): Promise<void> {
        try {
            const { band_id, week_day, start_time, end_time } = req.body

            const auth = req.headers.authorization as string;

            const schedule: showInputDTO = {
                band_id,
                week_day,
                start_time,
                end_time,
                auth
            }

            await new ShowBusiness().show(schedule)
            res.status(200).send({ message: "Show successfully scheduled!" })
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }

    public async getShowByDay(req: Request, res: Response) {
        try {
            const { week_day } = req.params
            const auth = req.headers.authorization as string;

            if (!week_day) {
                throw new Error("Pass the date correctly");
            }

            const getShow: getShowByDayInputDTO = {
                week_day,
                auth
            }

            const result = await new ShowBusiness().getShowByDay(getShow)
            res.status(200).send({ result })
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }
}