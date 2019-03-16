import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import routerMiddleware from './middleware/routerMiddleware';

const application = express();

// Mongosee configuration

mongoose.connect(config.database.connectionString, {
  useCreateIndex: !config.server.isProduction,
  useNewUrlParser: true,
});

// Request/response modifying middleware

application.use([
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
]);

// Router middleware

application.use(routerMiddleware);

// Application entry point

application.listen(config.server.port);

export default application;
