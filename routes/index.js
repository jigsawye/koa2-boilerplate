import Router from 'koa-router';
import demo from './demo';

const router = new Router({ prefix: '/api' });

router.use('/', demo.routes());

export default router
