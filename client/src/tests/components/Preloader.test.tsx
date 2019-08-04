import React from 'react';
import { shallow } from 'enzyme';
import { Preloader } from '../../components/Preloader';

test('should render preloarder', () => {
  const wrapper = shallow(<Preloader />);
  expect(wrapper).toMatchSnapshot();
});
