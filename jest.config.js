module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ["<rootDir>/src/__tests__"],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$'
};
