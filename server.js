// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const Koa = require('koa');
// const koaBody = require('koa-body');
// const koaStatic = require('koa-static');
// const uuid = require('uuid');

// const port = 7070;
// const app = new Koa();

// const public = path.join(__dirname, '/public')
// app.use(koaStatic(public));

// app.use(koaBody({
//     urlencoded: true,
//     multipart: true,
//     json: true,
//   }));

//   app.use(async (ctx, next) => {
//     const origin = ctx.request.get('Origin');
//     if (!origin) {
//         return await next();
//     }
//     const headers = {'Access-Control-Allow-Origin': '*',};
//     if (ctx.method !== 'OPTIONS') {
//         ctx.response.set({...headers});
//         try {
//             return await next();
//         } catch (err) {
//             e.headers = {...e.headers, ...headers};
//             throw err;
//         }
//     }
//     if (ctx.request.get('Access-Control-Request-Method')) {
//         ctx.response.set({
//             ...headers,
//             'Access-Control-Allow-Method': 'GET, POST, PUT, DELETE, PATCH',
//         });
//         if (ctx.request.get('Access-Control-Request-Headers')) {
//             ctx.response.set('Access-Control-Request-Headers', ctx.request.get('Access-Control-Allow-Request-Headers'));
//         }
//         ctx.response.status = 204;
//     }
//   });

const http = require('http');
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    console.log(ctx.request.query);

    ctx.response.body = 'server works';

    next();
});

app.use((ctx) => {
    console.log('I am a second middleware');
})

const server = http.createServer(app.callback())

const port = 7070;

server.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Server is listening to ' + port);
});