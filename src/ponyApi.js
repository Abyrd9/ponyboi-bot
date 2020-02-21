const { createGame } = require("./ponyActions/createGame");
const { addUserToGame } = require("./ponyActions/addUserToGame");
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

  const { container = {}, user = {}, message = {}, actions = [] } = payload;

  let key = "";
  if (actions.length > 0) key = actions[0].value || "";

  const { blocks = [] } = message;
  const contextBlock = blocks.find(({ type }) => type === 'context') || {};
  const elements = contextBlock.elements ? contextBlock.elements : [];

  let users = [];
  const { username = '' } = user;
  if (elements.length > 0) {
    elements.pop();
    users = elements.reduce((acc, { text }) => { acc = [...acc, text]; return acc }, []);
  }
  let name = "@" + username;
  if (!users.includes(name)) users.push(name);

  const { channel_id = '', message_ts = '' } = container;
  switch (key) {
    case "add_user": {
      addUserToGame(channel_id, message_ts, users)
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
      startGame(channel_id, message_ts, users)
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