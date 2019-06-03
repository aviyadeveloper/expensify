import React from 'react';
import { RouteProps } from 'react-router';
import ExpenseList from './ExpenseList';
import { filtersReducerDefaultState } from '../reducers/filtersReducer';

export const DashboardPage: React.SFC<RouteProps> = props => (
  <div>
    <ExpenseList filters={filtersReducerDefaultState} />
  </div>
);
