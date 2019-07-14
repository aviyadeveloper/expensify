import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import {
  createBrowserHistory,
  createLocation,
  createPath,
  History,
  Location
} from 'history';
import { match } from 'react-router-dom';

interface HeaderTestProps {
  runLogout: () => void;
  history: History;
  location: Location;
  match: match;
}
let HeaderTestProps: HeaderTestProps;

beforeEach(() => {
  HeaderTestProps = {
    runLogout: jest.fn(),
    history: createBrowserHistory(),
    location: createLocation(createPath({})),
    match: { params: {}, isExact: false, path: '', url: '' }
  };
});

test('should render Header component', () => {
  const wrapper = shallow(<Header {...HeaderTestProps} />);
  expect(wrapper).toMatchSnapshot();
});

test('should invoke runLogout when logout button clicked', () => {
  const wrapper = shallow(<Header {...HeaderTestProps} />);
  wrapper.find('button#logout-button').simulate('click');
  expect(HeaderTestProps.runLogout).toHaveBeenCalled();
});
