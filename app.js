import Koa from 'koa';
import convert from 'koa-convert';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import validator from 'koa-validate';

import router from './routes';

const app = new Koa();

app.use(convert(logger()));
app.use(convert(validator()));
app.use(bodyParser());
app.use(router.routes())

app.listen(3000, () => console.log('Listening on 3000.'));

export default app;
