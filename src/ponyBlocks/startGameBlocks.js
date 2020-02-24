exports.startGameBlocks = (channel, messageId, fields) => {
  let blocks = [
    {
      type: "section",
      text: {
        text: "*The Pony Order:*",
        type: "mrkdwn"
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Cancel",
          "emoji": true
        },
        "style": "danger",
        "value": "delete_message"
      }
    },
    {
      type: "divider"
    },
    ...fields,
  ];

  return {
    text: "",
    channel: channel,
    ts: messageId,
    as_user: true,
    link_names: true,
    blocks: JSON.stringify(blocks)
  }
}