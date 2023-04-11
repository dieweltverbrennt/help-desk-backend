const TicketController = require('./api/ticketController');
const http = require('http');
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const koaBody = require('koa-body').default;
const koaStatic = require('koa-static');
const uuid = require('uuid');
const cors = require('@koa/cors');

const app = new Koa();
const port = 7070;

app.use(cors());

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    json: true,
}));

const public = path.join(__dirname, '/public')
app.use(koaStatic(public));

app.use(async (ctx, next) => {
    const origin = ctx.request.get('Origin');
    if (!origin) {
        return await next();
    }
    const headers = { 'Access-Control-Allow-Origin': '*', };
    if (ctx.method !== 'OPTIONS') {
        ctx.response.set({ ...headers });
        try {
            return await next();
        } catch (err) {
            // e.headers = { ...e.headers, ...headers };
            throw err;
        }
    }
    if (ctx.request.get('Access-Control-Request-Method')) {
        ctx.response.set({
            ...headers,
            'Access-Control-Allow-Method': 'GET, POST, PUT, DELETE, PATCH',
        });
        if (ctx.request.get('Access-Control-Request-Headers')) {
            ctx.response.set('Access-Control-Request-Headers', ctx.request.get('Access-Control-Allow-Request-Headers'));
        }
        ctx.response.status = 204;
    }
});

const tickets = [];
const ticketController = new TicketController(tickets);

app.use(async ctx => {
    const { method } = ctx.request.query;

    switch (method) {
        case 'allTickets':
            try {
                const res = ticketController.getAllTickets();
                ctx.response.body = res;
            } catch (e) {
                console.error(e);
                ctx.status = 500;
                ctx.response.body = 'Error. Method "allTickets"';
            }
            return;
        case 'ticketById':
            try {
                const { id } = ctx.request.query;
                const res = ticketController.getTicketById(id);
                ctx.response.body = res;
            } catch (e) {
                console.error(e);
                ctx.status = 500;
                ctx.response.body = 'Error. Method "ticketById"';
            }
            return;
        case 'createTicket':
            try {
                const { date, fullText, id, text } = ctx.request.body;
                const res = ticketController.createTicket(date, fullText, id, text);
                ctx.response.body = ticketController.tickets;
            }
            catch (e) {
                console.error(e);
                ctx.status = 500;
                ctx.response.body = 'Error. Method "createTicket"';
            }
            return;
        case 'deleteTicket':
            try {
                const { id } = ctx.request.query;
                ticketController.deleteTicket(id);
                ctx.response.body = ticketController.tickets;
            } catch (e) {
                console.error(e);
                ctx.status = 500;
                ctx.response.body = 'Error. Method "deleteTicket"';
            }
            return;
        case 'editTicket':
            try {
                const { id, text, fullText } = ctx.request.body;
                ticketController.editTicket(id, text, fullText);
                ctx.response.body = ticketController.tickets;

            } catch (e) {
                console.error(e);
                ctx.status = 500;
                ctx.response.body = 'Error. Method "editTicket"';
            }
            return;
        case 'changeStatus':
            try {
                const { id } = ctx.request.query;
                ticketController.changeStatus(id);
                ctx.response.body = ticketController.tickets;
            } catch (e) {
                console.error(e);
                ctx.status = 500;
                ctx.response.body = 'Error. Method "changeTicket"';
            }
            return;
        default:
            ctx.response.status = 404;
            return;
    }
});

app.listen(port, () => console.log(`The server is running on port ${port}`));