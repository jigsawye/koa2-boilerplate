import Thinky from 'thinky';

const thinky = Thinky();
const { type } = thinky;

export const Demo = thinky.createModel('demos', {
  id: type.string(),
  title: type.string(),
});

export const User = thinky.createModel('users', {
  id: type.string(),
  email: type.string(),
  password: type.string(),
});
