const { startGameBlocks } = require("../ponyBlocks/startGameBlocks");
const { shuffle } = require("../ponyHelpers/shuffle");
const { ponybot, database } = require("../utilities");
const ref = database.ref("/currentGame/players");

exports.startGame = (channel, messageId) => {
  return new Promise((resolve) => {
    let players = [];
    let fields = [];

    ref.once("value", snapshot => {
      let snap = snapshot.val();
      if (snap) {
        // before building a player list we need to shuffle them and update the database
        players = Object.entries(snap);
        players = shuffle(players).reduce((acc, [key, value], index) => {
          acc[key] = { ...value, sort: index + 1 };
          return acc;
        }, {});
        ref.set(players);

        players = Object.values(players).sort((a, b) => a.sort - b.sort);
        players = players.reduce((acc, player) => {
          acc = [...acc, player.username];
          return acc;
        }, []);
      }

      if (players.length > 0) {
        players.forEach((value, index) => {
          let number = index + 1;
          fields.push({
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*" + number + "*" + "  -  " + value,
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Remove Player",
                "emoji": true
              },
              "style": "danger",
              "value": "remove_player" + "/" + value,
            }
          });
        })
      }

      resolve(ponybot.chat.update(startGameBlocks(channel, messageId, fields)))
    });
  })
} 