# 🗄️ Database Switching Guide

This guide explains how to switch between SQLite and PostgreSQL databases using environment variables.

## 🎯 How It Works

The application automatically detects which database to use based on environment variables:

- **SQLite**: Used when `USE_SQLITE=true` or `NODE_ENV=development`
- **PostgreSQL**: Used when `USE_SQLITE=false` or in production mode

## 🔧 Configuration

### Current Setup (SQLite)
```bash
# In server/config.env
USE_SQLITE=true
NODE_ENV=development
```

### Switch to PostgreSQL
```bash
# In server/config.env
USE_SQLITE=false
NODE_ENV=development
```

## 🚀 Usage

### For Development (Current MacBook - SQLite)
```bash
# Already configured - just run:
npm run dev
```

### For Production/Home MacBook (PostgreSQL)
```bash
# 1. Update server/config.env:
USE_SQLITE=false
NODE_ENV=production

# 2. Ensure PostgreSQL is running
brew services start postgresql@14

# 3. Run the app
npm run dev
```

## 🔄 Quick Switch Commands

### Switch to SQLite
```bash
# Update config.env
echo "USE_SQLITE=true" > server/config.env
echo "NODE_ENV=development" >> server/config.env

# Restart the server
npm run dev
```

### Switch to PostgreSQL
```bash
# Update config.env
echo "USE_SQLITE=false" > server/config.env
echo "NODE_ENV=development" >> server/config.env

# Restart the server
npm run dev
```

## 📊 Database Features

### SQLite (Current)
- ✅ No setup required
- ✅ File-based database
- ✅ Perfect for development
- ✅ No authentication needed

### PostgreSQL (Home MacBook)
- ✅ Production-ready
- ✅ Better performance
- ✅ Advanced features
- ✅ Requires authentication setup

## 🛠️ Troubleshooting

### SQLite Issues
```bash
# If SQLite fails, check:
ls -la server/database.sqlite
# Should exist and be readable
```

### PostgreSQL Issues
```bash
# If PostgreSQL fails, check:
brew services list | grep postgresql
# Should show "started" status

# Test connection:
psql -h localhost -U joseferreira -d blogdb
```

## 🔍 Environment Variables

| Variable | SQLite | PostgreSQL | Description |
|----------|--------|------------|-------------|
| `USE_SQLITE` | `true` | `false` | Force database type |
| `NODE_ENV` | `development` | `production` | Environment mode |
| `DB_HOST` | - | `localhost` | PostgreSQL host |
| `DB_PORT` | - | `5432` | PostgreSQL port |
| `DB_NAME` | - | `blogdb` | Database name |
| `DB_USER` | - | `joseferreira` | Database user |
| `DB_PASS` | - | `password` | Database password |

## 🎉 Benefits

1. **Automatic Detection**: No manual switching needed
2. **Environment-Based**: Different databases for different environments
3. **Unified Interface**: Same code works with both databases
4. **Easy Switching**: Change one variable to switch databases
5. **No Data Loss**: Each database maintains its own data

## 🚀 Next Steps

When you get back to your main MacBook:

1. **Update config.env**:
   ```bash
   USE_SQLITE=false
   NODE_ENV=development
   ```

2. **Start PostgreSQL**:
   ```bash
   brew services start postgresql@14
   ```

3. **Run the app**:
   ```bash
   npm run dev
   ```

The app will automatically use PostgreSQL and your existing data will be available!
