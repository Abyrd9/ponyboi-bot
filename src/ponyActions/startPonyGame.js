const { shuffle } = require("../ponyHelpers/shuffle");

exports.startPonyGame = (ponybot, channel, messageId, users) => {
  let shuffled = [];
  let fields = [];
  if (users.length > 0) shuffled = shuffle(users);
  if (shuffled.length > 0) {
    fields = [
      {
        "type": "mrkdwn",
        "text": "*Name*"
      },
      {
        "type": "mrkdwn",
        "text": "*Order*"
      },
    ];
    shuffled.forEach((value, index) => {
      let number = index + 1;
      fields.push({
        "type": "mrkdwn",
        "text": "*" + value + "*"
      });
      fields.push({
        "type": "mrkdwn",
        "text": "*" + number + "*"
      });
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
            "text": "*The Pony Order:*",
            "type": "mrkdwn"
          },
          "fields": fields
        }
      ]
    }))
  })
} 