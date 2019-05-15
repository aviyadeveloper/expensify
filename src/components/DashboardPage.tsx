import React from "react";
import { RouteProps } from "react-router";
import ExpenseList from "./ExpenseList";

export const DashboardPage: React.SFC<RouteProps> = props => (
  <div>
    <ExpenseList />
  </div>
);
