// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
};

module.exports = config;

// Or async function
module.exports = async () => {
    return {
        verbose: true,
        collectCoverage: true,
        detectOpenHandles: true,
        "coverageThreshold": {
            "global": {
                "branches": 50,
                "functions": 50,
                "lines": 50,
                "statements": -25
            }
        }
    };
};