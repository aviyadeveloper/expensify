import { Expense } from '../types/expensesTypes';
import { FiltersReducerState, FiltersSortBy } from '../types/filtersTypes';
import moment from 'moment';

export default (
  expenses: Expense[],
  { name, startDate, endDate, sortBy, tags }: FiltersReducerState
): Expense[] => {
  return expenses
    .filter(expense => {
      const startDateMatch = startDate
        ? moment(startDate).isSameOrBefore(moment(expense.createdAt))
        : true;

      const endDateMatch = endDate
        ? moment(endDate).isSameOrAfter(moment(expense.createdAt))
        : true;

      const nameMatch =
        typeof name === 'string' && !!expense.name
          ? expense.name.toLocaleLowerCase().includes(name.toLowerCase())
          : false;

      const tagsMatch =
        tags !== [] && tags !== 0 && tags.length > 0
          ? tags.some(e => {
              if (expense.tags) {
                return expense.tags.includes(e);
              } else {
                return false;
              }
            })
          : true;
      return (
        startDateMatch && endDateMatch && nameMatch && expense && tagsMatch
      );
    })
    .sort(
      (a, b): number => {
        if (sortBy === FiltersSortBy.Date) {
          if (a.createdAt && b.createdAt) {
            return a.createdAt > b.createdAt ? 1 : -1;
          } else {
            return 0;
          }
        } else {
          if (a.amount && b.amount) {
            return a.amount > b.amount ? 1 : -1;
          } else {
            return 0;
          }
        }
      }
    );
};
