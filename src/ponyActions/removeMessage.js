const { ponybot, database } = require("../utilities");

exports.removeMessage = (channel, messageId, gameId) => {
  return new Promise((resolve) => {
    database.ref(`/games/${gameId}`).set(null);
    resolve(ponybot.chat.delete({
      channel: channel,
      ts: messageId,
    }))
  })
}