const { ponybot } = require("../firebase");

exports.createGame = (channel) => {
    return new Promise((resolve, reject) => {
    resolve(ponybot.chat.postMessage({
      channel: channel,
      text: "",
      link_names: true,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":exclamation:*PonyBoi Is Starting*:exclamation:\n\nPlease click the button below if you'd like to compete in today's barnyard games."
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Cancel",
              "emoji": true
            },
                    "style": "danger",
            "value": "delete_message"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Put Me In Coach"
              },
              "value": "add_user"
            }
          ]
        }
      ]
    }));
  })
}
