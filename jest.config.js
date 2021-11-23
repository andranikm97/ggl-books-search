module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png)": "<rootDir>/src/__tests__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/src/__tests__/styleMock.js",
  },
  testMatch: ["**/__tests__/*.test.js"],
};
