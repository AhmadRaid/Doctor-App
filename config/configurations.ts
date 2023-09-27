console.log(process.env.JWT_SECRET_KEY);

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
  },
});
