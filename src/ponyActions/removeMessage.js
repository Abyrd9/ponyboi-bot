const { ponybot } = require("../firebase");

exports.removeMessage = (channel, messageId) => {
  return new Promise((resolve, reject) => {
    resolve(ponybot.chat.delete({
      channel: channel,
      ts: messageId,
    }))
  })
}