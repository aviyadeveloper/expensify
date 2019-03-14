import { Expense } from "../types/expensesTypes";
import { FiltersReducerState, FiltersSortBy } from "../types/filtersTypes";

export default (
  expenses: Expense[],
  { name, startDate, endDate, sortBy }: FiltersReducerState
): Expense[] => {
  return expenses
    .filter(expense => {
      // const startDateMatch =
      //   typeof startDate !== "number" || expense.createdAt >= startDate;
      // const endDateMatch =
      //   typeof endDate !== "number" || expense.createdAt <= endDate;
      const nameMatch =
        typeof name !== "string" ||
        expense.name.toLocaleLowerCase().includes(name.toLowerCase());
      return /*startDateMatch && endDateMatch &&*/ nameMatch && expense;
    })
    .sort(
      (a, b): number => {
        if (sortBy === FiltersSortBy.Date) {
          return a.createdAt > b.createdAt ? 1 : -1;
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
