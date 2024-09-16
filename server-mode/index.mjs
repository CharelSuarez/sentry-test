import './instrument.mjs'
import http from 'http';
import express from 'express';
import * as Sentry from '@sentry/node';

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.end("Hello world!");
});

app.get("/error", (req, res) => {
    test = []
    res.end("Hello world!" + test[0]);
});

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.listen(port);