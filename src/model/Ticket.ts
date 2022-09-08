export default class Ticket {
    constructor(
        private id: string,
        private ticketname: string,
        private price: number,
        private quantityTotal: number,
        private show_id: string
    ) { }
}