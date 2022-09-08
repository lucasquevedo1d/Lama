import { SHOW_ROLE } from './../model/Show';
import Show from '../model/Show';
import { BaseDatabase } from './BaseDataBase';




export class ShowsDataBase extends BaseDatabase {
    private static TABLE_NAME = "LamaShow"


    public async signUpShow(show: Show) {
        try {
            await BaseDatabase.connection
                .insert(show)
                .into(ShowsDataBase.TABLE_NAME)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async checkSchedule(week_day: SHOW_ROLE, start_time: number, end_time: number) {
        try {
            const result = await BaseDatabase.connection
                .select("*")
                .from(ShowsDataBase.TABLE_NAME)
                .where({ week_day: week_day })
                .whereBetween('start_time', [start_time, end_time])
            return result
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getShowsByDay(week_day: string) {
        try {
            const result = await BaseDatabase.connection
                .select("LamaBand.name", "LamaBand.music_genre")
                .from('LamaBand')
                .innerJoin('LamaShow', 'LamaBand.id', "LamaShow.band_id")
                .orderBy('start_time', 'asc')
            return result
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }


}