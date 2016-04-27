import Router from 'koa-router';
import jwt from 'koa-jwt';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { User } from '../entities';
import config from '../config';

const salt = genSaltSync();
const router = new Router();

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
  const { email } = ctx.request.body;
  let { password } = ctx.request.body;
  password = hashSync(password, salt);

  const user = new User({ email, password });
  await user.save();

  ctx.body = { email };
});

router.post('login', async ctx => {
  const { email, password } = ctx.request.body;
  const user = await User.filter({ email });

  if (! compareSync(password, user[0].password)) {
    ctx.body = 'invalid credentials';
    return;
  }

  const token = jwt.sign({ email: user[0].email }, config.JWT_SECRET_KEY);
  ctx.body = { token };
});

export default router;
