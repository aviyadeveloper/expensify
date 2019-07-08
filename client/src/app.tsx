import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import configureStore from './store/configureStore';
import './firebase/firebase';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { runSetExpenses } from './actions/expensesActions';
import { sortByAmount } from './actions/filtersActions';
import moment from 'moment';

const store: any = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(<p>loading...</p>, document.getElementById('myApp'));

store.dispatch(runSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('myApp'));
});
