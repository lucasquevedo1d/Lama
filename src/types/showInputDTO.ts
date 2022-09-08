import { SHOW_ROLE } from "../model/Show"

export type showInputDTO = {
    band_id: string,
    week_day: SHOW_ROLE,
    start_time: number,
    end_time: number,
    auth: string
}