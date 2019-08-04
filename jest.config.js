module.exports = {
  roots: ['<rootDir>/client/src', '__mocks__'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['raf/polyfill', '<rootDir>/client/src/tests/setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
