import { v1 } from "uuid/interfaces";
import { Moment } from "moment";

type Expense = {
  id?: string;
  name: string;
  description: string;
  amount: number | undefined;
  createdAt: Moment;
  [propName: string]: any;
};

export { Expense };
