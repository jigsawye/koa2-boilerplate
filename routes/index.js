import Router from 'koa-router';

const router = Router();

router.get('title', async ctx => {
  ctx.body = { title: 'hello koa 2!' };
});

router.get('query/:search', async ctx => {
  ctx.body = ctx.params;
});

export default router;
