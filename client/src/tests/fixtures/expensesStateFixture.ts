import { Expense } from '../../types/expensesTypes';
import moment from 'moment';

export const expenses: Expense[] = [
  {
    id: '1000',
    name: 'Gas Bill',
    description: 'Gas bill for 2010',
    amount: 100000,
    createdAt: moment('2011-12-31').format(),
    tags: ['blue', 'yellow']
  },
  {
    id: '1001',
    name: 'Water Bill',
    description: 'Water bill for 2012',
    amount: 50000,
    createdAt: moment('2013-12-31').format(),
    tags: ['blue']
  },
  {
    id: '1002',
    name: 'New Sofa',
    description: 'New sofa for living room',
    amount: 25000,
    createdAt: moment('2015-06-05').format(),
    tags: ['blue', 'red']
  },
  {
    id: '1003',
    name: 'Groceries',
    description: 'Some basics',
    amount: 8000,
    createdAt: moment('2015-07-10').format(),
    tags: ['yellow', 'blue', 'orange', 'red']
  }
];
