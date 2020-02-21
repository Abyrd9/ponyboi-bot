const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const { commands, interactive } = require("./src/ponyApi");

const ponyapp = express();

// Automatically allow cross-origin requests
ponyapp.use(cors({ origin: true }));

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

ponyapp.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
ponyapp.use(bodyParser.json({ verify: rawBodyBuffer }));

ponyapp.post('/commands', commands);
ponyapp.post('/interactive', interactive);

exports.ponybot = functions.https.onRequest(ponyapp);