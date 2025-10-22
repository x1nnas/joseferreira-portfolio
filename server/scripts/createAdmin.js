#!/usr/bin/env node
// Script to create admin users and update existing users to admin role

import db from '../db/dbconn.js';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user and updating testuser...\n');
    
    // 1. Create a new admin user
    const adminUsername = 'admin';
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';
    
    // Check if admin user already exists
    const existingAdmin = await db.query('SELECT * FROM users WHERE username = $1', [adminUsername]);
    
    if (existingAdmin.rows.length > 0) {
      console.log('⚠️  Admin user already exists, updating role...');
      await db.query('UPDATE users SET role = $1 WHERE username = $2', ['admin', adminUsername]);
      console.log('✅ Updated existing admin user role');
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      // Create new admin user
      const result = await db.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [adminUsername, adminEmail, hashedPassword, 'admin']
      );
      
      console.log('✅ Created new admin user:');
      console.log(`   Username: ${adminUsername}`);
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
      console.log(`   Role: admin`);
    }
    
    // 2. Update testuser to admin role
    const testUserResult = await db.query('SELECT * FROM users WHERE username = $1', ['testuser']);
    
    if (testUserResult.rows.length > 0) {
      await db.query('UPDATE users SET role = $1 WHERE username = $2', ['admin', 'testuser']);
      console.log('✅ Updated testuser role to admin');
    } else {
      console.log('⚠️  testuser not found');
    }
    
    // 3. Show all admin users
    console.log('\n📊 All admin users:');
    const adminUsers = await db.query(`
      SELECT id, username, email, role, created_at 
      FROM users 
      WHERE role = 'admin' 
      ORDER BY created_at DESC
    `);
    
    adminUsers.rows.forEach((user, index) => {
      console.log(`${index + 1}. 🔑 ${user.username} (${user.email})`);
      console.log(`   ID: ${user.id} | Created: ${new Date(user.created_at).toLocaleString()}`);
    });
    
    console.log('\n🎯 Login credentials:');
    console.log('   Admin user: admin / admin123');
    console.log('   Test user: testuser / password123 (now has admin role)');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    process.exit(0);
  }
}

createAdminUser();