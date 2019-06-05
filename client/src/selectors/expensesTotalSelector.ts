import { Expense } from '../types/expensesTypes';
import { isNumber } from 'util';

export default (expenses: Expense[]) => {
  let amounts = expenses.map(e => e.amount);
  let total = amounts.reduce((a, b) => {
    return isNumber(a) && isNumber(b) ? a + b : undefined;
  }, 0);
  return total || 0;
};
