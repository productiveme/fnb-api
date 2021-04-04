import {TransactionCheque, TransactionChequeInitData} from './transaction-cheque'

export type TransactionVehicleInitData = TransactionChequeInitData

/** Provides access to all data FNB provide for a vehicle account transaction. */
export class TransactionVehicle extends TransactionCheque {
	constructor(init: TransactionVehicleInitData) {
		super(init)
	}
}
