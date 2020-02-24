const { createGameBlocks } = require("../ponyBlocks/createGameBlocks");
const { ponybot, database } = require("../utilities");

exports.createGame = (channel) => {
  return new Promise((resolve) => {
    database.ref("/currentGame").set(null);
    resolve(ponybot.chat.postMessage(createGameBlocks(channel)));
  })
}
