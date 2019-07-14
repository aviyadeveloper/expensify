import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppRouter, history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import './firebase/firebase';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { login, logout } from './actions/auth';
import { runSetExpenses } from './actions/expensesActions';
import { firebase } from './firebase/firebase';

const store: any = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(<p>loading...</p>, document.getElementById('myApp'));

let hasRendered = false;
const renderApp = () => {
  !hasRendered && ReactDOM.render(jsx, document.getElementById('myApp'));
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // Update store with login
    store.dispatch(login(user.uid));

    // Get expenses
    store
      .dispatch(runSetExpenses())
      .then(() => {
        //render app.
        renderApp();
      })
      .then(() => {
        // Redirect from login page to dashboard.
        history.location.pathname === '/' && history.push('/dashboard');
      });
  } else {
    // If not logged in make sure store is logged out and redirect to login page
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
