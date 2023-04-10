const Ticket = require("./ticket");
const TicketFull = require("./ticketFull");

class TicketController {
    constructor(tickets) {
        this.tickets = tickets;
    }

    getAllTickets() {
        const allTickets =  this.tickets.map((item) => new Ticket(item));
        return allTickets;
    }

    getTicketById(id) {
        const data = this.tickets.find((item) => item.id === id);
        if (data !== -1) {
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

    deleteTicket(id) {
        this.tickets = this.tickets.filter((item) => item.id !== id);
    }

    editTicket(id, name, description) {
        const cur = this.getTicketById(id);
        cur.name = name;
        cur.description = description;
    }

}

module.exports = TicketController;