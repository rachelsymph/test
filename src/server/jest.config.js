module.exports = {
  roots: ['.'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
  testTimeout: 30000,
  verbose: true,
  moduleNameMapper: {
    'src/server/(.*)': '<rootDir>/../../src/server/$1',
    'src/commons/(.*)': '<rootDir>/../../src/commons/$1',
  }
};
