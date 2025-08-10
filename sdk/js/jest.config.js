module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 24*3600*1000,
  globalSetup: '<rootDir>/test/global.js',
  setupFilesAfterEnv: ['<rootDir>/test/separate.js'],
  testMatch: ['<rootDir>/test/**/*.test.[jt]s?(x)'], 
  testPathIgnorePatterns: ['<rootDir>/test/fixtures'],
  coveragePathIgnorePatterns: ['<rootDir>/test/'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        babelConfig: {
          compact: false,
          minified: false,
          retainLines: true,
          sourceMaps: 'inline',
          inputSourceMap: true,
          presets: ["@babel/preset-typescript"],
          overrides: [
            {
              test: ["src/**/*.ts"],
              plugins: ['babel-plugin-rewire'],
            },
          ],
        },
      },
    ],
  },
};