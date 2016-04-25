import Router from 'koa-router';
import auth from './auth';
import demo from './demo';

const router = new Router({ prefix: '/api' });

router.use('/auth/', auth.routes());
router.use('/', demo.routes());

export default router;
