import Router from 'koa-router';
import { Demo } from '../entities';

const router = new Router();

router.get('demo', async ctx => {
  const demos = await Demo;

  ctx.body = demos;
});

router.post('demo', async ctx => {
  ctx.checkBody('title').notEmpty().len(4, 20);

  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }

  const { title } = ctx.request.body;

  const demo = new Demo({ title });
  await demo.save();

  ctx.body = demo;
});

export default router;
