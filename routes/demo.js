import Router from 'koa-router';
import Demo from '../entities/demo';

const router = Router();

router.get('demo', async ctx => {
  const demos = await Demo;

  ctx.body = demos;
});

router.post('demo', async ctx => {
  const { title } = ctx.request.body;

  const demo = new Demo({ title });
  await demo.save();

  ctx.body = demo;
});

export default router;
