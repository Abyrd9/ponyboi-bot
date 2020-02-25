const { addUserToGameBlocks } = require("../ponyBlocks/addUserToGameBlocks");
const { ponybot, database } = require("../utilities");

exports.addUserToGame = (channel, messageId, username, gameId) => {
  return new Promise(resolve => {
    const gameRef = database.ref(`/games/${gameId}`);
    const newPlayerRef = database.ref(`/games/${gameId}/players`).push();
    gameRef.once("value", snapshot => {
      let gameCreator = "";
      let players = [];

      let snap = snapshot.val();
      if (snap.gameCreator) gameCreator = snap.gameCreator;
      if (snap.players) players = Object.values(snap.players);

      const isNewPlayer =
        players.length === 0 ||
        players.every(player => player.username !== username);

      console.log(isNewPlayer, players, username);
      if (isNewPlayer) {
        const newPlayer = {
          username: username,
          playerId: newPlayerRef.key,
          sort: players.length + 1
        };
        players.push(newPlayer);
        newPlayerRef.set(newPlayer);
      }

      resolve(
        ponybot.chat.update(
          addUserToGameBlocks(channel, messageId, gameId, gameCreator, players)
        )
      );
    });
  });
};
