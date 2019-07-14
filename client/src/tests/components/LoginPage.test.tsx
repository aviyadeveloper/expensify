import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

let runLoginSpy: () => void;
beforeEach(() => {
  runLoginSpy = jest.fn();
});

test('should render LoginPage', () => {
  const wrapper = shallow(<LoginPage runLogin={runLoginSpy} />);
  expect(wrapper).toMatchSnapshot();
});

test('should invoke runLogin when login button clicked', () => {
  const wrapper = shallow(<LoginPage runLogin={runLoginSpy} />);
  wrapper.find('button#login-button').simulate('click');
  expect(runLoginSpy).toHaveBeenCalled();
});
