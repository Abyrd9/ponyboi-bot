exports.startGameBlocks = (channel, messageId, gameId, player_blocks) => {
  const delete_message = "delete_message" + "/" + gameId;
  let blocks = [
    {
      type: "section",
      text: {
        text: "*The Pony Order:*",
        type: "mrkdwn"
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
      type: "divider"
    },
    ...player_blocks
  ];

  return {
    text: "",
    channel: channel,
    ts: messageId,
    as_user: true,
    link_names: true,
    blocks: JSON.stringify(blocks)
  };
};
