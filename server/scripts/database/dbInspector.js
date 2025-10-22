// Comprehensive database inspector
import db from "../db/dbconn.js";

async function inspectDatabase() {
  try {
    console.log("🔍 COMPREHENSIVE DATABASE INSPECTION");
    console.log("=" .repeat(60));
    
    // 1. Connection Test
    console.log("\n🔌 1. CONNECTION TEST");
    console.log("-" .repeat(30));
    const connectionTest = await db.query("SELECT NOW() as current_time, version() as postgres_version");
    console.log("✅ Database connected successfully!");
    console.log(`📅 Current time: ${connectionTest.rows[0].current_time}`);
    console.log(`🐘 PostgreSQL: ${connectionTest.rows[0].postgres_version}`);
    
    // 2. Table Overview
    console.log("\n📋 2. TABLE OVERVIEW");
    console.log("-" .repeat(30));
    const tables = await db.query(`
      SELECT table_name, 
             (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    tables.rows.forEach(table => {
      console.log(`📊 ${table.table_name} (${table.column_count} columns)`);
    });
    
    // 3. Users Data
    console.log("\n👥 3. USERS DATA");
    console.log("-" .repeat(30));
    const users = await db.query(`
      SELECT id, username, email, role, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    
    console.log(`Total users: ${users.rows.length}`);
    users.rows.forEach(user => {
      console.log(`  👤 ID: ${user.id} | ${user.username} (${user.email}) | Role: ${user.role} | Created: ${user.created_at}`);
    });
    
    // 4. Blogs Data
    console.log("\n📝 4. BLOGS DATA");
    console.log("-" .repeat(30));
    const blogs = await db.query(`
      SELECT id, title, content, created_at 
      FROM blogs 
      ORDER BY created_at DESC
    `);
    
    console.log(`Total blogs: ${blogs.rows.length}`);
    blogs.rows.forEach(blog => {
      console.log(`  📄 ID: ${blog.id} | "${blog.title}" | Created: ${blog.created_at}`);
      console.log(`     Content: ${blog.content.substring(0, 50)}...`);
    });
    
    // 5. Database Statistics
    console.log("\n📊 5. DATABASE STATISTICS");
    console.log("-" .repeat(30));
    
    const userStats = await db.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
        COUNT(CASE WHEN role = 'user' THEN 1 END) as user_count,
        MIN(created_at) as oldest_user,
        MAX(created_at) as newest_user
      FROM users
    `);
    
    const blogStats = await db.query(`
      SELECT 
        COUNT(*) as total_blogs,
        MIN(created_at) as oldest_blog,
        MAX(created_at) as newest_blog
      FROM blogs
    `);
    
    console.log("👥 User Statistics:");
    console.log(`  Total Users: ${userStats.rows[0].total_users}`);
    console.log(`  Admins: ${userStats.rows[0].admin_count}`);
    console.log(`  Regular Users: ${userStats.rows[0].user_count}`);
    console.log(`  Oldest User: ${userStats.rows[0].oldest_user}`);
    console.log(`  Newest User: ${userStats.rows[0].newest_user}`);
    
    console.log("\n📝 Blog Statistics:");
    console.log(`  Total Blogs: ${blogStats.rows[0].total_blogs}`);
    console.log(`  Oldest Blog: ${blogStats.rows[0].oldest_blog}`);
    console.log(`  Newest Blog: ${blogStats.rows[0].newest_blog}`);
    
    // 6. Test Credentials
    console.log("\n🔐 6. TEST CREDENTIALS");
    console.log("-" .repeat(30));
    console.log("You can test login with these credentials:");
    users.rows.forEach(user => {
      console.log(`  👤 Username: ${user.username} | Email: ${user.email} | Role: ${user.role}`);
    });
    
    console.log("\n✅ Database inspection complete!");
    
  } catch (err) {
    console.error("❌ Database inspection failed:", err.message);
  } finally {
    await db.end();
  }
}

inspectDatabase();
