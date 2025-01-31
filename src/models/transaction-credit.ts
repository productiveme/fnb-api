import {Transaction, TransactionInitData} from './transaction'

export type TransactionCreditInitData = TransactionInitData

/** Provides access to all data FNB provide for a credit account transaction. */
export class TransactionCredit extends Transaction {
	constructor(init: TransactionCreditInitData) {
		super(init)
	}
}
