import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactionIn = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const totalIn: number = transactionIn.reduce((total: number, { value }) => {
      return total + value;
    }, 0);

    const transactionOut = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const totalOut: number = transactionOut.reduce(
      (total: number, { value }) => {
        return total + value;
      },
      0,
    );

    const totalBalance: number = totalIn - totalOut;

    const { income, outcome, total }: Balance = {
      income: totalIn,
      outcome: totalOut,
      total: totalBalance,
    };
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
