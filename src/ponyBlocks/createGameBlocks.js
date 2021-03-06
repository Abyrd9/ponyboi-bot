exports.createGameBlocks = (channel, username, gameId) => {
  const delete_message = "delete_message" + "/" + gameId;
  const add_user = "add_user" + "/" + gameId;
  return {
    channel: channel,
    text: "",
    link_names: true,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":exclamation:*PonyBoi Is Starting*:exclamation:\n\n" +
            username +
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
          }
        ]
      }
    ]
  };
};
