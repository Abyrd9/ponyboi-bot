exports.addUserToGameBlocks = (
  channel,
  messageId,
  gameId,
  gameCreator,
  players
) => {
  const delete_message = "delete_message" + "/" + gameId;
  const add_user = "add_user" + "/" + gameId;
  const start_game = "start_game" + "/" + gameId;

  let players_string = "";
  players.forEach(player => {
    players_string += `${player.username}, `;
  });

  return {
    text: "",
    channel: channel,
    ts: messageId,
    as_user: true,
    link_names: true,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":exclamation:*PonyBoi Is Starting*:exclamation:\n\n" +
            gameCreator +
            " has started a game of PonyBoi"
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Cancel",
            emoji: true
          },
          style: "danger",
          value: delete_message
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Please click the button below if you'd like to compete in today's barnyard games."
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: players_string
        }
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: players.length + " Ponies"
          }
        ]
      },
      {
        type: "divider"
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              emoji: true,
              text: "Put Me In Coach"
            },
            value: add_user
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              emoji: true,
              text: "Game Time"
            },
            style: "primary",
            value: start_game
          }
        ]
      }
    ]
  };
};
