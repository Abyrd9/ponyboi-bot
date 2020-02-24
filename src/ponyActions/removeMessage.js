const { ponybot, database } = require("../utilities");

exports.removeMessage = (channel, messageId) => {
  return new Promise((resolve) => {
    database.ref("/currentGame").set(null);
    resolve(ponybot.chat.delete({
      channel: channel,
      ts: messageId,
    }))
  })
}