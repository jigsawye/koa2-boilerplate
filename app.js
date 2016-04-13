import Koa from 'koa';
import convert from 'koa-convert';
import Router from 'koa-router';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

import index from './routes/index';

const app = new Koa();
const router = new Router({ prefix: '/api' });

app.use(convert(logger()));
app.use(bodyParser());

router.use('/', index.routes());

app.use(router.routes())

app.listen(3000, () => console.log('Listening on 3000.'));

export default app;
