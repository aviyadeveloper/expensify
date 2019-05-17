module.exports = {
  roots: ['<rootDir>/src', '__mocks__'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['raf/polyfill', '<rootDir>/src/tests/setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
