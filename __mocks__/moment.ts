const moment = require.requireActual('moment');

export default (timestamp: String | 0 = 0) => {
  return moment(timestamp);
};
