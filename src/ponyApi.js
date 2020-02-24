const { createGame } = require("./ponyActions/createGame");
const { addUserToGame } = require("./ponyActions/addUserToGame");
const { removeUserFromGame } = require("./ponyActions/removeUserFromGame");
const { startGame } = require("./ponyActions/startGame");
const { removeMessage } = require("./ponyActions/removeMessage");

const commands = (req, res) => {
  const { body = {} } = req;
  const { channel_id = '' } = body;
  createGame(channel_id)
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
  let payload = {};
  if (body.payload) payload = JSON.parse(body.payload);

  const { container = {}, user = {}, actions = [] } = payload;
  const { channel_id = '', message_ts = '' } = container;
  let username = user.username ? "@" + user.username : "";

  let key = "";
  let removeName = "";
  if (actions.length > 0) key = actions[0].value || "";
  if (key.includes('/')) {
    key = key.split('/')[0];
    removeName = key.split("/")[1];
  }
  console.log(key, removeName);
  switch (key) {
    case "add_user": {
      addUserToGame(channel_id, message_ts, username)
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
      removeUserFromGame(channel_id, message_ts, username)
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
      startGame(channel_id, message_ts)
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
      removeMessage(channel_id, message_ts)
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