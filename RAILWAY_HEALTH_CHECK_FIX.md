# Railway Health Check Fix Guide

## 🚨 **Current Issue**
Railway deployment is failing with "service unavailable" due to health check failures.

## 🔧 **Root Cause**
The health check endpoint `/health` is failing because:
1. Railway environment variables aren't being loaded correctly
2. Database connection is failing in production
3. Health check timeout is too short

## ✅ **Solution Applied**

### 1. **Fixed Environment Variable Loading**
- Updated `server/db/dbconn.js` to handle Railway environment variables properly
- Added fallback loading for both `config.env` and `.env` files

### 2. **Enhanced Health Check**
- Added better error logging in health check endpoint
- Improved error messages for debugging

### 3. **Created Railway Configuration**
- Added `railway.json` with proper health check settings
- Set health check timeout to 100 seconds
- Configured restart policy

## 🚀 **Deployment Steps**

### **Step 1: Set Railway Environment Variables**
In your Railway project dashboard, set these environment variables:

```bash
NODE_ENV=production
USE_SQLITE=false
JWT_SECRET=your_secure_production_jwt_secret_here
```

### **Step 2: Ensure PostgreSQL Database is Connected**
1. Go to Railway dashboard
2. Add a PostgreSQL service
3. Connect it to your project
4. Railway will automatically set `DATABASE_URL`

### **Step 3: Deploy**
```bash
# Commit the fixes
git add .
git commit -m "Fix Railway health check issues"

# Push to main branch
git checkout main
git merge feature/environment-based-database
git push origin main
```

### **Step 4: Monitor Deployment**
1. Check Railway logs for database connection status
2. Look for "🗄️ Using PostgreSQL database" message
3. Verify health check endpoint responds with 200 status

## 🔍 **Debugging Commands**

### **Check Health Check Locally**
```bash
curl http://localhost:3000/health
```

### **Check Railway Logs**
```bash
railway logs
```

### **Test Database Connection**
```bash
railway run psql $DATABASE_URL -c "SELECT 1;"
```

## 📋 **Expected Logs on Successful Deployment**

```
🗄️ Using PostgreSQL database
🔍 Environment check:
DATABASE_URL: SET
NODE_ENV: production
🌐 Using DATABASE_URL for database connection
✅ PostgreSQL database connected successfully
✅ Server is running on port 3000
🌐 Health check available at: http://localhost:3000/health
```

## 🚨 **If Still Failing**

1. **Check Railway Environment Variables**:
   - Ensure `NODE_ENV=production`
   - Ensure `USE_SQLITE=false`
   - Ensure `DATABASE_URL` is set by PostgreSQL service

2. **Check Database Connection**:
   - Verify PostgreSQL service is running
   - Check if database tables are created

3. **Check Health Check Endpoint**:
   - Visit `https://your-app.railway.app/health`
   - Should return JSON with `"status": "OK"`

## 🎯 **Success Indicators**
- ✅ Health check returns 200 status
- ✅ Database connection successful
- ✅ Application accessible via Railway URL
- ✅ No "service unavailable" errors
