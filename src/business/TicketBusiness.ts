import { USER_ROLES } from './../model/User';
import { IdGenerator } from "../services/IdGenerator"
import { inputCreateTicketDTO } from "../types/inputCreateTicketDTO"
import { TicketDataBase } from "../data/TicketDataBase"
import Ticket from "../model/Ticket"
import Authenticator from "../services/Authenticator"
import { inputBuyTicketDTO } from '../types/inputBuyTicketDTO';


export class TicketBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private ticketDatabase: TicketDataBase,
        private Authenticator: Authenticator
    ) { }

    createTicket = async (input: inputCreateTicketDTO) => {
        try {
            const { ticketname, price, quantityTotal, show_id, auth } = input

            if (!ticketname || !price || !quantityTotal || !show_id) {
                throw new Error("Invalid values to create a ticket!")
            }

            const userData = this.Authenticator.getData(auth)

            if (userData.role !== USER_ROLES.ADMIN) {
                throw new Error("Invalid role. You can only create tickets if you are role 'ADMIN'")
            }

            const id = this.idGenerator.generateId();
            const newTicket = new Ticket(
                id,
                ticketname,
                price,
                quantityTotal,
                show_id
            )
            await this.ticketDatabase.createTicket(newTicket);

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    buyTicket = async (input: inputBuyTicketDTO) => {
        try {
            const { ticketname, quantity, auth } = input

            if (!ticketname || !quantity) {
                throw new Error("Please check your infos, ticketname or quantity!")
            }

            const userData = this.Authenticator.getData(auth)

            if (!userData) {
                throw new Error("You need be logged to buy a ticket!");
            }

            const showTicket = await new TicketDataBase().buyTicket(ticketname)
            const availableQuantity = showTicket.quantityTotal - showTicket.quantitySold
            // diminuindo o valor de quantidade de ingressos total pela quantidade de ingressos vendidos.

            if (quantity > availableQuantity) {
                throw new Error(`You are trying to buy a quantity of non-existent. There's only ${availableQuantity} ticket's available.`)
            }

            const quantityUpdate = showTicket.quantitySold + quantity
            await new TicketDataBase().updateSoldTickets(quantityUpdate)
            // atualizando o valor de ingressos disponíveis.
        } catch (error: any) {
            throw new Error(error.message);
        }


    }



}