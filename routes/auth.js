import Router from 'koa-router';
import jwt from 'koa-jwt';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { User } from '../entities';

const salt = genSaltSync();
const router = Router();

router.use(async (ctx, next) => {
  ctx.checkBody('email').notEmpty().isEmail();
  ctx.checkBody('password').notEmpty().len(6);

  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }

  await next();
});

router.post('signup', async ctx => {
  let { email, password } = ctx.request.body;
  password = hashSync(password, salt);

  const user = new User({ email, password });
  await user.save();

  ctx.body = { email };
});

router.post('login', async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = await User.filter({ email });

  if (! compareSync(password, user[0].password)) {
    ctx.body = 'invalid credentials';
    return;
  }

  const token = jwt.sign({ email: user[0].email}, 'shared-secret');
  ctx.body = { token };
});

export default router;
