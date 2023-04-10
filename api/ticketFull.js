class TicketFull {
    constructor(id, name, description, created) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = false;
        this.created = created;
    }
}

module.exports = TicketFull;