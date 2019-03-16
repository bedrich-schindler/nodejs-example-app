import mongoose from 'mongoose';
import UserModel from './src/model/userModel';
import config from './src/config/config';

/* eslint-disable no-console */

console.log('Database initialization started');

mongoose.connect(config.database.connectionString, {
  useCreateIndex: !config.server.isProduction,
  useNewUrlParser: true,
});

const user = new UserModel({
  email: 'user@example.com',
  firstName: 'Jan',
  lastName: 'Novak',
  password: 'password',
});

user.save((err) => {
  if (err) {
    console.error('User initialization failed');
    console.error('Database initialization failed');

    process.exit();
  } else {
    console.log(`User initialization finished { email: '${user.email}', password: '${user.password}'`);
    console.log('Database initialization finished');

    process.exit();
  }
});
