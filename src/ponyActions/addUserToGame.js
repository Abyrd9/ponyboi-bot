const { addUserToGameBlocks } = require("../ponyBlocks/addUserToGameBlocks");
const { ponybot, database } = require("../utilities");
const ref = database.ref("/currentGame/players");

exports.addUserToGame = (channel, messageId, username) => {
  return new Promise((resolve) => {
    ref.once("value", snapshot => {
      let players = [];
      let snap = snapshot.val();
      if (snap) {
        snap = Object.values(snap).sort((a, b) => a.sort - b.sort);
        players = snap.reduce((acc, player) => {
          acc = [...acc, player.username];
          return acc;
        }, []);
      }

      if (!players.includes(username)) {
        players.push(username);
        ref.push().set({
          username: username,
          sort: players.length,
        });
      }

      let elements = [];
      if (players) {
        players.forEach(user => {
          elements.push({
            "type": "plain_text",
            "emoji": true,
            "text": user
          })
        });
        elements.push({
          "type": "plain_text",
          "emoji": true,
          "text": players.length + " Ponies"
        })
      }

      resolve(ponybot.chat.update(addUserToGameBlocks(channel, messageId, elements)))
    });
  })
}