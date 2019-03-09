import React from "react";
import { RouteProps } from "react-router";

interface INotFoundPageProps {}

export const NotFoundPage: React.SFC<RouteProps> = props => <h2>404!</h2>;
