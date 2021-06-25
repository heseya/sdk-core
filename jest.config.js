module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    'src/**/**/*.{js,ts}',
    '!src/**/*.d.{js,ts}',
    '!src/**/*.test.{js,ts}',
    '!src/**/*.spec.{js,ts}',
    '!src/**/*.mock.{js,ts}',
  ],
}
