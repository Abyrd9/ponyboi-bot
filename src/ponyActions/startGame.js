const { startGameBlocks } = require("../ponyBlocks/startGameBlocks");
const { shuffle } = require("../ponyHelpers/shuffle");
const { ponybot, database } = require("../utilities");

exports.startGame = (channel, messageId, gameId) => {
  return new Promise(resolve => {
    let player_blocks = [];
    const gameRef = database.ref(`/games/${gameId}`);
    const playersRef = database.ref(`/games/${gameId}/players`);

    gameRef.once("value", snapshot => {
      let players = [];
      let snap = snapshot.val();

      if (snap.players) {
        players = Object.values(snap.players).sort((a, b) => a.sort - b.sort);
      }

      if (snap) {
        // before building a player list we need to shuffle them and update the database
        const shuffledPlayers = shuffle(players);
        const newPlayersObj = shuffledPlayers.reduce((acc, player, index) => {
          acc[player.playerId] = {
            ...player,
            sort: index + 1
          };
          return acc;
        }, {});
        playersRef.set(newPlayersObj);

        if (shuffledPlayers.length > 0) {
          shuffledPlayers.forEach((player, index) => {
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
