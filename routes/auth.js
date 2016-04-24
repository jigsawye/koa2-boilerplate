import Router from 'koa-router';
import jwt from 'koa-jwt';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { User } from '../entities';

const salt = genSaltSync();
const router = Router();

router.post('signup', async ctx => {
  ctx.checkBody('email').notEmpty().isEmail();
  ctx.checkBody('password').notEmpty().len(6);

  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }

  let { email, password } = ctx.request.body;
  password = hashSync(password, salt);

  const user = new User({ email, password });
  await user.save();

  ctx.body = { email };
});

router.post('login', async ctx => {
  ctx.checkBody('email').notEmpty().isEmail();
  ctx.checkBody('password').notEmpty();

  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }

  const { email, password } = ctx.request.body;
  const user = await User.filter({ email });

  if (! compareSync(password, user[0].password)) {
    ctx.body = 'invalid credentials';
    return;
  }

  const token = jwt.sign({ email: user.email}, 'shared-secret');

  ctx.body = { token };
});

export default router;
