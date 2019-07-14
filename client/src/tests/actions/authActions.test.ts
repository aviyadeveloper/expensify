import { login, logout } from '../../actions/auth';

test('Should make a login action object', () => {
  const uid = 'foobar';
  const actionObject = login(uid);
  expect(actionObject).toEqual({
    type: 'LOG_IN',
    uid
  });
});

test('Should make a logout action object', () => {
  const actionObject = logout();
  expect(actionObject).toEqual({
    type: 'LOG_OUT'
  });
});
