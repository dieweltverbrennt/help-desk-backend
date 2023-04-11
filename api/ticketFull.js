const { v4: uuidv4 } = require('uuid');

class TicketFull {
    constructor(name, description) {
        this.id = uuidv4();;
        this.name = name;
        this.description = description;
        this.status = false;
        this.created = this.getDate();
    }

    getDate() {
        const currentDate = new Date();

        const curYear = currentDate.getFullYear();
        let curMonth = currentDate.getMonth() + 1;
        if (curMonth < 10) {
            curMonth = `0${curMonth}`;
        }
        let curDate = currentDate.getDate();
        if (curDate < 10) {
            curDate = `0${curDate}`;
        }

        let curHours = currentDate.getHours();
        if (curHours < 10) {
            curHours = `0${curHours}`;
        }
        let curMinutes = currentDate.getMinutes();
        if (curMinutes < 10) {
            curMinutes = `0${curMinutes}`;
        }
        return `${curHours}:${curMinutes} ${curDate}.${curMonth}.${curYear}`;
    }
}

module.exports = TicketFull;