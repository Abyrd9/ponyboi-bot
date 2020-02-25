const { createGameBlocks } = require("../ponyBlocks/createGameBlocks");
const { ponybot, database } = require("../utilities");

exports.createGame = (channel, username) => {
  return new Promise(resolve => {
    const ref = database.ref("/games").push();
    const key = ref.key;
    ref.set({
      gameCreator: username,
      gameId: key
    });
    resolve(ponybot.chat.postMessage(createGameBlocks(channel, username, key)));
  });
};
