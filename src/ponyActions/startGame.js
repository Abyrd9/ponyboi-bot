const { shuffle } = require("../ponyHelpers/shuffle");
const { ponybot } = require("../firebase");

exports.startGame = (channel, messageId, users) => {
  let shuffled = [];
  let fields = [];
  if (users.length > 0) shuffled = shuffle(users);
  if (shuffled.length > 0) {
    shuffled.forEach((value, index) => {
      let number = index + 1;
      fields.push({
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*" + number + "*" +  "  -  " + value,
        }
      });
    })
  }

  let blocks = [
    {
      type: "section",
      text: {
        text: "*The Pony Order:*",
        type: "mrkdwn"
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
      type: "divider"
    },
    ...fields,
  ];

  return new Promise((resolve, reject) => {
    resolve(ponybot.chat.update({
      text: "",
      channel: channel,
      ts: messageId,
      as_user: true,
      link_names: true,
      blocks: JSON.stringify(blocks)
    }))
  })
} 