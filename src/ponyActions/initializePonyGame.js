exports.initializePonyGame = (ponybot, channel) => {
    return new Promise((resolve, reject) => {
    resolve(ponybot.chat.postMessage({
      channel: channel,
      text: "",
      link_names: true,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":exclamation::exclamation:*PonyBoi Is Starting*:exclamation::exclamation:\n\nPlease click the button below if you'd like to compete in today's barnyard games.",
          },
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
            }
          ]
        }
      ]
    }));
  })
}