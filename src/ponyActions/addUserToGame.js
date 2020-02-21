const { ponybot, database } = require("../firebase");

exports.addUserToGame = (channel, messageId, users) => {
  const ref = database.ref("/currentGame");
  const username = users[users.length - 1];
  ref.push().set({
    username: username,
  });
  let elements = [];
  if (users) {
    users.forEach(user => {
      elements.push({
        "type": "plain_text",
        "emoji": true,
        "text": user
      })
    });
    elements.push({
      "type": "plain_text",
      "emoji": true,
      "text": users.length + " Ponies"
    })
  }

  return new Promise((resolve, reject) => {
    resolve(ponybot.chat.update({
      text: "",
      channel: channel,
      ts: messageId,
      as_user: true,
      link_names: true,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":exclamation:*PonyBoi Is Starting*:exclamation:\n\nPlease click below to participate in today's barnyard games.",
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
          "type": "context",
          "elements": elements
        },
        {
          "type": "divider",
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
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Game Time"
              },
              "style": "primary",
              "value": "start_game"
            },
          ]
        }
      ]
    }))
  })
}