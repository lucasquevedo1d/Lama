import { TicketBusiness } from './../business/TicketBusiness';
import { inputCreateTicketDTO } from './../types/inputCreateTicketDTO';
import { Request, Response } from "express";
import { IdGenerator } from '../services/IdGenerator';
import { TicketDataBase } from '../data/TicketDataBase';
import Authenticator from '../services/Authenticator';


export class TicketController {


    public async createTicket(req: Request, res: Response) {
        try {
            const auth = req.headers.authorization as string
            const { ticketname, price, quantityTotal, show_id } = req.body

            const input: inputCreateTicketDTO = {
                ticketname,
                price,
                quantityTotal,
                show_id,
                auth
            }
            await new TicketBusiness(new IdGenerator(), new TicketDataBase(), new Authenticator()).createTicket(input)
            res.status(400)
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }

    }
    public async buyTicket(req: Request, res: Response) {
        try {
            const auth = req.headers.authorization as string
            const { ticketname, quantity } = req.body

            const input = {
                ticketname,
                quantity,
                auth
            }
            await new TicketBusiness(new IdGenerator(), new TicketDataBase(), new Authenticator()).buyTicket(input)

            res.status(200).send({message:"ticket purchased successfully"})
        } catch (error: any) {
            res.status(400).send({ message: error.message })
        }
    }
}