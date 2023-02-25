import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from '../build/routes';

import cookieParser from 'cookie-parser';
import session from 'express-session';
const MongoStore = require('connect-mongo');

import { ValidateError } from 'tsoa'

import { MONGO_URI, SESSION_SCERET } from './constants';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: SESSION_SCERET,
  resave: false,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  store: MongoStore.create({ mongoUrl: MONGO_URI })
}));

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  );
});

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  })
})

app.use(function errorHandler(err: any, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)

    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  if (err.status === 401) {
    return res.status(401).json({
      message: 'Forbidden',
    })

  }

  next()
})