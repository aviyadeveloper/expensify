import { v1 } from "uuid/interfaces";

type Expense = {
  id: v1;
  name: string;
  description: string;
  amount: number;
  createdAt: number;
};

export { Expense };
