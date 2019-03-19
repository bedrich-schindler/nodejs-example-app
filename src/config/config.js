export default {
  // Server configuration
  server: {
    port: 3000,
    isProduction: false,
  },
  // Database configuration
  database: {
    connectionString: 'mongodb://mongo:27017/nodejs_example_app',
  },
  // Security configuration
  security: {
    expiresIn: '24h',
    secret: 'ApDLYapXAtLzYn8HYDE6ZNmvbGg5kESzqDNcx8ekJaMayYGyyZWPnp7sR3DIBiBGohQfREbFycJ3YlhkxIqkpkgFER4mFLkosaLa7vHAwDnL0ztedfjDM7G3aXfbttIo',
  },
};
