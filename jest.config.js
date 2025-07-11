module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Only transform .ts files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!flat)/', // Exclude modules except 'flat' from transformation
  ],
  moduleNameMapper: {
    '^mpc-lib-angular$': '<rootDir>/projects/mpc-lib-angular/src/public-api.ts'
  },
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  }
};
