const { startGameBlocks } = require("../ponyBlocks/startGameBlocks");
const { ponybot, database } = require("../utilities");

exports.removeUserFromGame = (channel, messageId, gameId, playerId) => {
  return new Promise(resolve => {
    let player_blocks = [];
    const removePlayerRef = database.ref(
      `/games/${gameId}/players/${playerId}`
    );
    removePlayerRef.set(null);

    const playersRef = database.ref(`/games/${gameId}/players`);
    playersRef.once("value", snapshot => {
      let players = [];
      let snap = snapshot.val();

      if (snap.players) {
        players = Object.values(snap.players).sort((a, b) => a.sort - b.sort);
      }

      if (snap) {
        // before building a player list we need to shuffle them and update the database
        const newPlayersObj = players.reduce((acc, player, index) => {
          acc[player.playerId] = {
            ...player,
            sort: index + 1
          };
          return acc;
        }, {});
        playersRef.set(newPlayersObj);

        if (players.length > 0) {
          players.forEach((player, index) => {
            let number = index + 1;
            player_blocks.push({
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*" + number + "*" + "  -  " + player.username
              },
              accessory: {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Remove Player",
                  emoji: true
                },
                style: "danger",
                value: "remove_player" + "/" + gameId + "/" + player.username
              }
            });
          });
        }
      }

      resolve(
        ponybot.chat.update(
          startGameBlocks(channel, messageId, gameId, player_blocks)
        )
      );
    });
  });
};
