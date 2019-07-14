import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
});

// if (process.env.NODE_ENV === 'test') {
//   const dotenv = require('dotenv');
//   dotenv.config({ path: './.env.test' });
// }
