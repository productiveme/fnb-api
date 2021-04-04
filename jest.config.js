module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRegex: '(/__tests__/.*\\.(ts|tsx)$)|(.*\\.(test|spec)?\\.(ts|tsx)$)',
	testPathIgnorePatterns: ['/node_modules/', 'd\\.tsx?$', 'setup\\.ts', 'teardown\\.ts'],
	testTimeout: 30000,
}
