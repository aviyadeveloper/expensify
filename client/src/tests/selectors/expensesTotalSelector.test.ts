import expensesTotalSelector from '../../selectors/expensesTotalSelector';
import { expenses } from '../fixtures/expensesStateFixture';

test('Should return 0 if no expenses found', () => {
  expect(expensesTotalSelector([])).toBe(0);
});

test('Should return total of 1 expense', () => {
  expect(expensesTotalSelector([expenses[0]])).toBe(100000);
  expect(expensesTotalSelector([expenses[1]])).toBe(50000);
});

test('Should return total of multiple expenses', () => {
  expect(expensesTotalSelector(expenses)).toBe(183000);
});
