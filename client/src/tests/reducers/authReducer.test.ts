import authReducer from '../../reducers/authReducer';

test('Should init an empty auth reducer state', () => {
  const state = authReducer(undefined, '@@INIT');
  expect(state).toEqual({});
});

test('Should set auth state with uid on login', () => {
  const prevState = { uid: undefined };
  const uid = 'foobar';
  const action = {
    type: 'LOG_IN',
    uid
  };
  const state = authReducer(prevState, action);
  expect(state).toEqual({ uid });
});

test('Should reset auth state uid undefined on logout', () => {
  const prevState = { uid: 'foobar' };
  const action = {
    type: 'LOG_OUT'
  };
  const state = authReducer(prevState, action);
  expect(state).toEqual({});
});
