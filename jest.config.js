module.exports = {
  roots: ['.'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testTimeout: 30000,
  verbose: true,
};
