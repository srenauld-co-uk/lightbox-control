module.exports = {
    "collectCoverageFrom": [
        "src/**/*.{js,ts}",
    ],
    "verbose": true,
    "silent": false,
    "reporters": [
        "jest-junit"
    ],
    "coverageReporters": [
        "text",
        "html",
        "cobertura"
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/dist', '/node_modules/', '<rootDir>/coverage/'],
};

