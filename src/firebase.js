const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { WebClient } = require("@slack/web-api");

const ponybot = new WebClient(functions.config().slack.token);
admin.initializeApp({
  credential: admin.credential.cert(functions.config().service_account),
  databaseURL: "https://ponyboi-slack-bot.firebaseio.com"
});
const database = admin.database();

module.exports = {
  ponybot,
  database,
}
