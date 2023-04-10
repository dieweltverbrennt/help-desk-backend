const Ticket = require("./ticket");
const TicketFull = require("./ticketFull");

class TicketController {
    constructor(tickets) {
        this.tickets = tickets;
    }

    getAllTickets() {
        const allTickets =  this.tickets.forEach((item) => new Ticket(item));
        return allTickets;
    }

    getTicketById(id) {
        const data = this.data.find((item) => item.id === id);
        if (data) {
            return data;
        } else {
            throw new Error('Invalid id');
        }
    }

    createTicket(created, description, id, name) {
        const newTicket = new TicketFull(id, name, description, created);
        this.tickets.push(newTicket);
        console.log(this.tickets)
    }


}

module.exports = TicketController;