import Ticket from '../model/Ticket';
import { inputBuyTicketDTO } from '../types/inputBuyTicketDTO';
import { responseBuyTicket } from '../types/responseBuyTicket';
import { BaseDatabase } from './BaseDataBase';




export class TicketDataBase extends BaseDatabase {
    private static TABLE_NAME = "LamaTicket"

    public async createTicket(ticket: Ticket) {
        try {
            await BaseDatabase.connection
                .insert(ticket)
                .into(TicketDataBase.TABLE_NAME)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async buyTicket(ticketname: string): Promise<responseBuyTicket> {
        try {
            const result = await BaseDatabase.connection
                .select("*")
                .from(TicketDataBase.TABLE_NAME)
                .where({ ticketname })
            return result[0]
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async updateSoldTickets(quantity: number) {
        try {
            await BaseDatabase.connection(TicketDataBase.TABLE_NAME)
                .update({ quantitySold: quantity })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}