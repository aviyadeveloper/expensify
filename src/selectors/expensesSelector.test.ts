import expensesSelector from "./expensesSelector";
import { FiltersReducerState, FiltersSortBy } from "../types/filtersTypes";
import moment from "moment";

const expenses = [
  {
    name: "Gas Bill",
    description: "Gas bill for 2010",
    amount: 100000,
    createdAt: moment("2011-12-31")
  },
  {
    name: "Water Bill",
    description: "Water bill for 2012",
    amount: 50000,
    createdAt: moment("2013-12-31")
  },
  {
    name: "New Sofa",
    description: "New sofa for living room",
    amount: 25000,
    createdAt: moment("2015-06-05")
  },
  {
    name: "Groceries",
    description: "Some basics",
    amount: 8000,
    createdAt: moment("2015-07-10")
  }
];

describe("Expense Selector", () => {
  // Filter: Empty, SortBy: Date
  test("Empty conditions should return all expenses sorted by date", () => {
    const conditions = {
      name: "",
      sortBy: FiltersSortBy.Date,
      startDate: null,
      endDate: null
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual(expenses);
  });

  // Filter: Empty, SortBy: Amount
  test("Empty conditions should return all expenses sorted by amount", () => {
    const conditions = {
      name: "",
      sortBy: FiltersSortBy.Amount,
      startDate: null,
      endDate: null
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([
      expenses[3],
      expenses[2],
      expenses[1],
      expenses[0]
    ]);
  });

  // Filter: name | SortBy: date
  test("Should filter by name value sort by date", () => {
    const conditions = {
      name: "bil",
      sortBy: FiltersSortBy.Date,
      startDate: null,
      endDate: null
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[0], expenses[1]]);
  });

  // Filter: name | SortBy: amount
  test("Should filter by name value sort by amount", () => {
    const conditions = {
      name: "er",
      sortBy: FiltersSortBy.Amount,
      startDate: null,
      endDate: null
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[3], expenses[1]]);
  });

  // Filter: startDate | SortBy: date
  test("Should filter by startDate value sort by date", () => {
    const conditions = {
      name: "",
      sortBy: FiltersSortBy.Date,
      startDate: moment("2014-01-01"),
      endDate: null
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[2], expenses[3]]);
  });

  // Filter: startDate | SortBy: amount
  test("Should filter by startDate value sort by amount", () => {
    const conditions = {
      name: "",
      sortBy: FiltersSortBy.Amount,
      startDate: moment("2014-01-01"),
      endDate: null
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[3], expenses[2]]);
  });

  // Filter: endDate | SortBy: date
  test("Should filter by endDate value sort by date", () => {
    const conditions = {
      name: "",
      sortBy: FiltersSortBy.Date,
      startDate: null,
      endDate: moment("2014-01-01")
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[0], expenses[1]]);
  });

  // Filter: endDate | SortBy: amount
  test("Should filter by endDate value sort by amount", () => {
    const conditions = {
      name: "",
      sortBy: FiltersSortBy.Amount,
      startDate: null,
      endDate: moment("2014-01-01")
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[1], expenses[0]]);
  });

  // Filter: startDate, endDate | SortBy: date
  test("Should filter by date range sort by date", () => {
    const conditions = {
      name: "",
      sortBy: FiltersSortBy.Date,
      startDate: moment("2012-01-20"),
      endDate: moment("2015-06-20")
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[1], expenses[2]]);
  });

  // Filter: startDate, endDate | SortBy: amount
  test("Should filter by date range sort by amount", () => {
    const conditions = {
      name: "",
      sortBy: FiltersSortBy.Amount,
      startDate: moment("2012-01-20"),
      endDate: moment("2015-06-20")
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[2], expenses[1]]);
  });

  // Filter: name, startDate, endDate |SortBy: date
  test("Should filter by name and date range, sort by date", () => {
    const conditions = {
      name: " ",
      sortBy: FiltersSortBy.Date,
      startDate: moment("2012-01-20"),
      endDate: moment("2016-12-31")
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[1], expenses[2]]);
  });

  // Filter: name, startDate, endDate | SortBy: amount
  test("Should filter by name and date range, sort by amount", () => {
    const conditions = {
      name: " ",
      sortBy: FiltersSortBy.Amount,
      startDate: moment("2012-01-20"),
      endDate: moment("2016-12-31")
    };
    const filtered = expensesSelector(expenses, conditions);
    expect(filtered).toEqual([expenses[2], expenses[1]]);
  });
});
