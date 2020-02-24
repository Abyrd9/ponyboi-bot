const { startGameBlocks } = require("../ponyBlocks/startGameBlocks");
const { ponybot, database } = require("../utilities");
const ref = database.ref("/currentGame/players");

exports.removeUserFromGame = (channel, messageId, username) => {
  return new Promise((resolve) => {
    ref.once("value", snapshot => {
      let snap = snapshot.val();
      let fields = [];
      let players = [];
      if (snap) {
        // before building a player list we need to shuffle them and update the database
        players = Object.entries(snap);
        players = players
          .sort((a, b) => {
            a[1].sort - b[1].sort;
          })
          .filter(([_, value]) => { // eslint-disable-line
            return value.username !== username;
          })
          .reduce((acc, [key, value], index) => {
            acc[key] = { ...value, sort: index + 1 };
            return acc;
          }, {});
        ref.set(players);
        if (players.length > 1) {
          players = Object.values(players).reduce((acc, player) => {
            acc = [...acc, player.username];
            return acc;
          }, []);
        }
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