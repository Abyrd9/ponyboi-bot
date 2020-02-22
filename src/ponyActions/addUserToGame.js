const { ponybot, database } = require("../utilities");
const ref = database.ref("/currentGame/players");

exports.addUserToGame = (channel, messageId, users, username) => {
  let players = [];
  ref.once("value", snapshot => {
    if (snapshot.val()) {
      players = Object.values(snapshot.val()).sort((a, b) => a.sort - b.sort).reduce((acc, player) => {
        acc = [...acc, player.username];
        return acc;
      }, []);
    }
  });

  if (!players.includes(username)) {
    players.push(username);
    ref.push().set({
      username: username,
      sort: players.length,
    });
  }

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