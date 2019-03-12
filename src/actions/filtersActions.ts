// SET_NAME_FILTER
export const setNameFilter = (
  name: string = ""
): { type: string; name: string } => ({
  type: "SET_NAME_FILTER",
  name
});

// SORT_BY_DATE
export const sortByDate = (): { type: string } => ({
  type: "SORT_BY_DATE"
});

// SORT_BY_AMOUNT
export const sortByAmount = (): { type: string } => ({
  type: "SORT_BY_AMOUNT"
});

// SET_START_DATE
export const setStartDate = (
  date?: number
): { type: string; date?: number } => ({
  type: "SET_START_DATE",
  date
});

// SET_END_DATE
export const setEndDate = (date?: number): { type: string; date?: number } => ({
  type: "SET_END_DATE",
  date
});
