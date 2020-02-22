const { ponybot } = require("../utilities");

exports.removeMessage = (channel, messageId) => {
  return new Promise((resolve, reject) => {
    resolve(ponybot.chat.delete({
      channel: channel,
      ts: messageId,
    }))
  })
}