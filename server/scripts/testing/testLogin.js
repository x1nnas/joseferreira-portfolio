// Test the actual login endpoint
import fetch from 'node-fetch';

async function testLogin() {
  try {
    console.log("🔍 Testing login endpoint...\n");
    
    const loginData = {
      username: "testuser",
      password: "password123"
    };
    
    console.log("📤 Sending login request:");
    console.log(`  Username: ${loginData.username}`);
    console.log(`  Password: ${loginData.password}`);
    console.log(`  URL: http://localhost:3000/api/auth/login`);
    
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });
    
    console.log(`\n📥 Response status: ${response.status} ${response.statusText}`);
    
    const data = await response.json();
    console.log("📥 Response data:");
    console.log(JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log("\n✅ Login successful!");
      console.log(`  Token: ${data.token ? data.token.substring(0, 50) + '...' : 'No token'}`);
      console.log(`  User: ${JSON.stringify(data.user, null, 2)}`);
    } else {
      console.log("\n❌ Login failed!");
      console.log(`  Error: ${data.message || 'Unknown error'}`);
    }
    
  } catch (err) {
    console.error("❌ Error testing login:", err.message);
    console.log("\n💡 Make sure the server is running on port 3000");
    console.log("   Run: cd server && npm run dev");
  }
}

testLogin();
