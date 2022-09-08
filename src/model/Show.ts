export default class Show {
    constructor(
        private id: string,
        private band_id: string,
        private week_day: SHOW_ROLE,
        private start_time: number,
        private end_time: number
    ) { }
}

export enum SHOW_ROLE {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}