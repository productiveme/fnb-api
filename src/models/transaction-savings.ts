import {TransactionCheque, TransactionChequeInitData} from './transaction-cheque'

export type TransactionSavingsInitData = TransactionChequeInitData

/** Provides access to all data FNB provide for a savings account transaction. */
export class TransactionSavings extends TransactionCheque {
	constructor(init: TransactionSavingsInitData) {
		super(init)
	}
}
