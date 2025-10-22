# 🧪 Test Credentials for Admin Dashboard

Since we're having database connection issues, here are the test credentials you can use:

## 🔐 **Test Users (Mock Data)**

### **Admin User:**
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** `admin`
- **Access:** Can access admin dashboard

### **Regular User:**
- **Username:** `user`
- **Password:** `user123`
- **Role:** `user`
- **Access:** Cannot access admin dashboard

## 🚀 **How to Test:**

### **Option 1: Use Mock Authentication (Quick Test)**

1. **Go to:** http://localhost:3002/login
2. **Login with:** `admin` / `admin123`
3. **You should see:** "Admin" role in navigation
4. **Click:** "Admin Dashboard" link
5. **You should see:** The admin dashboard

### **Option 2: Test Registration (If Database Works)**

1. **Go to:** http://localhost:3002/create-account
2. **Register a new user**
3. **Login with the new credentials**
4. **Test role-based access**

## 🔧 **If Database Still Doesn't Work:**

Let me create a temporary mock authentication system that bypasses the database for testing purposes.

## 📝 **What to Test:**

1. **Login as admin** → Should see admin dashboard
2. **Login as regular user** → Should NOT see admin dashboard
3. **Try to access admin dashboard directly** → Should be blocked
4. **Test logout** → Should clear session
5. **Test token expiration** → Should redirect to login

## 🎯 **Expected Behavior:**

- **Admin users:** Can see "Admin Dashboard" link and access `/admin-dash`
- **Regular users:** Cannot see admin link and get "Access Denied" on `/admin-dash`
- **Unauthenticated users:** Redirected to login page

Would you like me to create a mock authentication system for testing?
