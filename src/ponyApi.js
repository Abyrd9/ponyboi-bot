const get = require('lodash.get');
const { createGame } = require("./ponyActions/createGame");
const { addUserToGame } = require("./ponyActions/addUserToGame");
const { removeUserFromGame } = require("./ponyActions/removeUserFromGame");
const { startGame } = require("./ponyActions/startGame");
const { removeMessage } = require("./ponyActions/removeMessage");

const commands = (req, res) => {
  const { body = {} } = req;
  const channelId = get(body, 'channel_id', "");

  console.log(body);
  createGame(channelId, "")
    .then(() => {
      return res.status(200).send("");
    })
    .catch(err => {
      console.error(err);
      return res.status(404).send("Something went wrong.");
    });
}

const interactive = (req, res) => {
  const { body = {} } = req;
  const payload = body.payload ? JSON.parse(body.payload) : {};

  let username = get(payload, 'user.username', "");
  if (username) username = "@" + username;

  const channelId = get(payload, 'container.channel_id', "");
  const messageId = get(payload, 'container.message_ts', "");
  const actions = get(payload, 'actions', []);

  
  let actionKey = "";
  let actionArgs = [];
  if (actions.length > 0) actionKey = actions[0].value || "";
  if (actionKey.includes('/')) {
    actionArgs = actionKey.split('/');
    actionKey = actionArgs[0];
  }

  switch (actionKey) {
    case "add_user": {
      addUserToGame(channelId, messageId, username)
        .then(() => {
          return res.status(200).send("");
        })
        .catch(err => {
          console.error(err);
          return res.status(404).send("Something went wrong.");
        });
    }
      break;
    case "remove_player": {
      removeUserFromGame(channelId, messageId, username)
        .then(() => {
          return res.status(200).send("");
        })
        .catch(err => {
          console.error(err);
          return res.status(404).send("Something went wrong.");
        });
    }
      break;
    case "start_game": {
      startGame(channelId, messageId)
        .then(() => {
          return res.status(200).send("");
        })
        .catch(err => {
          console.error(err);
          return res.status(404).send("Something went wrong.");
        });
    }
      break;
    case "delete_message": {
      const gameId = actionArgs[1] || '';
      removeMessage(channelId, messageId, gameId)
        .then(() => {
          return res.status(200).send("");
        })
        .catch(err => {
          console.error(err);
          return res.status(404).send("Something went wrong.");
        });
    }
      break;
    default:
      res.status(404).send("Something went wrong.");
      break;
  }
}

module.exports = {
  commands,
  interactive
}