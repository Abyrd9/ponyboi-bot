exports.addUserToGameBlocks = (channel, messageId, elements) => {
  return {
    text: "",
    channel: channel,
    ts: messageId,
    as_user: true,
    link_names: true,
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":exclamation:*PonyBoi Is Starting*:exclamation:\n\nPlease click below to participate in today's barnyard games.",
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
        "type": "context",
        "elements": elements
      },
      {
        "type": "divider",
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Put Me In Coach"
            },
            "value": "add_user"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Game Time"
            },
            "style": "primary",
            "value": "start_game"
          },
        ]
      }
    ]
  }
}