import {Page, SerializableOrJSHandle} from 'puppeteer'
import {Account} from '../models/account'

export const navigateToMyBankAccounts = async (page: Page) => {
	const indexOfTab = await page.evaluate(() => {
		/* tslint:disable */
		const mainTabs = $('.shortCutLink')

		let index = null
		mainTabs.each((i, item) => {
			if (item && item.textContent && item.textContent.indexOf('Accounts') !== -1) {
				index = i
			}
		})

		return index
		/* tslint:enable */
	})

	if (indexOfTab === null) {
		throw new Error('Could not find tab to navigate to my tabs')
	}

	await page.click(`.shortCutLink:nth-child(${indexOfTab + 1})`)
	await page.waitForFunction(() => $('#loaderOverlay.Hhide').length > 0)
	await page.waitForFunction(() => $('#summary_of_account_balances').length > 0)
}

export const navigateToAccount = async (page: Page, account: Account, tab: string) => {
	await navigateToMyBankAccounts(page)
	const accountId = await page.evaluate((acc: Account) => {
		/* tslint:disable */
		const names = $('[name="nickname"]')
		for (let i = 0; i < names.length; i++) {
			const accountName = (names[i].textContent || '')
				.replace(/[\n\t]+/, '')
				.replace(/[\n\t]+/, '')
				.trim()
			if (accountName === acc.name) {
				return names[i].id
			}
		}
		/* tslint:enable */

		return null
	}, (account as unknown) as SerializableOrJSHandle)

	if (accountId === null) {
		throw new Error('Could not find account to navigate to')
	}

	await page.click(`#${accountId} a`)
	await page.waitForFunction(() => $('#loaderOverlay.Hhide').length > 0)

	const indexOfTab = await page.evaluate((text: string) => {
		/* tslint:disable */
		const tabs = $('.subTabText')
		for (let i = 0; i < tabs.length; i++) {
			const tab = (tabs[i].textContent || '').trim()
			if (tab.indexOf(text) !== -1) {
				return i
			}
		}

		return null
		/* tslint:enable */
	}, tab)

	if (indexOfTab === null) {
		throw new Error('Could not find detailed balance tab to navigate to')
	}

	await page.click(`.subTabButton:nth-child(${indexOfTab + 1})`)
	await page.waitForFunction(() => $('#loaderOverlay.Hhide').length > 0)
}
