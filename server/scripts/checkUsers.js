#!/usr/bin/env node
// Quick script to check all registered users and their roles

import db from '../db/dbconn.js';

async function checkUsers() {
  try {
    console.log('🔍 Checking registered users...\n');
    
    // Get all users with their details
    const result = await db.query(`
      SELECT 
        id, 
        username, 
        email, 
        role, 
        created_at,
        CASE 
          WHEN role = 'admin' THEN '🔑'
          WHEN role = 'user' THEN '👤'
          ELSE '❓'
        END as role_icon
      FROM users 
      ORDER BY created_at DESC
    `);
    
    if (result.rows.length === 0) {
      console.log('❌ No users found in the database.');
      return;
    }
    
    console.log(`📊 Found ${result.rows.length} registered user(s):\n`);
    
    result.rows.forEach((user, index) => {
      console.log(`${index + 1}. ${user.role_icon} ${user.username} (${user.role})`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🆔 ID: ${user.id}`);
      console.log(`   📅 Created: ${new Date(user.created_at).toLocaleString()}`);
      console.log('');
    });
    
    // Summary by role
    const roleCounts = result.rows.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    
    console.log('📈 Summary by role:');
    Object.entries(roleCounts).forEach(([role, count]) => {
      console.log(`   ${role}: ${count} user(s)`);
    });
    
  } catch (error) {
    console.error('❌ Error checking users:', error.message);
  } finally {
    process.exit(0);
  }
}

checkUsers();
