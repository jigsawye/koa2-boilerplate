import Thinky from 'thinky';

const thinky = Thinky();
const { type } = thinky;

export default thinky.createModel('demos', {
  id: type.string(),
  title: type.string(),
});
