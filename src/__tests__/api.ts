import {
	Api as FnbApi,
	Account,
	groupAccounts,
	DetailedBalance,
	AccountCheque,
	DetailedBalanceCheque,
	AccountCredit,
	DetailedBalanceCredit,
	DetailedBalanceSavings,
	AccountSavings,
	AccountVehicle,
	DetailedBalanceVehicle,
	formatMoney,
} from '..'

require('dotenv').config()

describe('using the api', () => {
	beforeAll(() => {
		global.FnbApi = new FnbApi({
			username: process.env.FNB_USER as string,
			password: process.env.FNB_PASS as string,
		})
	})

	afterAll(() => {
		global.FnbApi.close()
	})

	async function getTotal<A extends Account, B extends DetailedBalance>(accounts: A[], selector: (t: B) => number) {
		return (
			await Promise.all(
				accounts.map(async a => {
					const detailedBalance = await a.detailedBalance()
					return selector(detailedBalance as B)
				})
			)
		).reduce((a, b) => a + b, 0)
	}

	test('can get accounts, totals and transactions', async () => {
		const accounts = await global.FnbApi.accounts.get()

		console.log(accounts)
		console.log('---------------------')

		const detailedBalance = await accounts[0].detailedBalance()
		console.log(detailedBalance)
		console.log('---------------------')

		const transactions = await accounts[0].transactions()
		console.dir(transactions.slice(0, 3))

		expect(true).toBe(true)
	})

	test('can calculate totals by type', async () => {
		const accounts = await global.FnbApi.accounts.get()
		const groupedAccounts = await groupAccounts(accounts)

		const chequeTotal = await getTotal<AccountCheque, DetailedBalanceCheque>(groupedAccounts.chequeAccounts, b => b.balance)
		const creditTotal = await getTotal<AccountCredit, DetailedBalanceCredit>(groupedAccounts.creditAccounts, b => b.currentBalance)
		const savingsTotal = await getTotal<AccountSavings, DetailedBalanceSavings>(groupedAccounts.savingsAccounts, b => b.balance)
		const vehicleTotal = await getTotal<AccountVehicle, DetailedBalanceVehicle>(
			groupedAccounts.vehicleAccounts,
			b => b.paymentDetails.currentCapitalBalance
		)

		const totals = {
			cheque: formatMoney(chequeTotal),
			credit: formatMoney(creditTotal),
			savings: formatMoney(savingsTotal),
			vehicle: formatMoney(vehicleTotal),
		}

		console.table(totals)
		console.log('Total', formatMoney(chequeTotal + creditTotal + savingsTotal + vehicleTotal))

		expect(true).toBe(true)
	})
})
