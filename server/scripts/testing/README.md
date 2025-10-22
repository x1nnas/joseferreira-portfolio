# Testing Scripts

This folder contains scripts for testing authentication and debugging.

## Available Scripts

### `checkTestUser.js`
Checks testuser credentials and password verification.
```bash
node scripts/testing/checkTestUser.js
```

### `testLogin.js`
Tests the login endpoint via HTTP request.
```bash
node scripts/testing/testLogin.js
```

### `debugLogin.js`
Debugs the login process step by step.
```bash
node scripts/testing/debugLogin.js
```

### `testServerLogin.js`
Tests server login logic using the same code as the server.
```bash
node scripts/testing/testServerLogin.js
```

### `testServerDb.js`
Tests server database connection and data.
```bash
node scripts/testing/testServerDb.js
```

## Usage

All scripts can be run from the server directory:
```bash
cd server
node scripts/testing/[script-name].js
```

## Note

These scripts were created during debugging and can be useful for:
- Testing authentication flows
- Debugging database issues
- Verifying server functionality
