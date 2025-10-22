// Server configuration
export const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'blogdb',
    user: process.env.DB_USER || 'joseferreira',
    password: process.env.DB_PASS || '1234'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret_key',
    expiresIn: '1h'
  },
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  }
};
