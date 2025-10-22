# Database Scripts

This folder contains scripts for database inspection and maintenance.

## Available Scripts

### `testConnection.js`
Tests database connection and shows basic information.
```bash
node scripts/database/testConnection.js
```

### `inspectData.js`
Inspects all data in the database tables.
```bash
node scripts/database/inspectData.js
```

### `checkSchema.js`
Checks database table schemas and structure.
```bash
node scripts/database/checkSchema.js
```

### `dbInspector.js`
Comprehensive database inspection with statistics.
```bash
node scripts/database/dbInspector.js
```

## Usage

All scripts can be run from the server directory:
```bash
cd server
node scripts/database/[script-name].js
```
