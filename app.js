const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN ,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

app.shortcut('set_schedule', async ({ shortcut, ack, client, logger }) => {

  try {
    await ack();
    const result = await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Schedule your week",
        },
        submit: {
          type: "plain_text",
          text: "Save"
        },
        callback_id: "view_1",
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "When are you working at home this week?",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            type: "input",
            element: {
              type: "checkboxes",
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "Monday",
                    emoji: true,
                  },
                  value: "monday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Tuesday",
                    emoji: true,
                  },
                  value: "tuesday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Wednesday",
                    emoji: true,
                  },
                  value: "wednesday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Thursday",
                    emoji: true,
                  },
                  value: "thursday",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Friday",
                    emoji: true,
                  },
                  value: "friday",
                },
              ],
              action_id: "weekly-schedule-action",
            },
            label: {
              type: "plain_text",
              text: "Pick the days you are planning to be at home",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
        ],
        
      }
    });

    logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }
});

app.view('view_1', async ({ ack, body, view, client }) => {
  await ack();

  const values = view.state.values;

  const selectedOptions = values['uaXpM']['weekly-schedule-action'].selected_options;

  const selectedValues = selectedOptions.map(option => option.value);
  console.log(selectedValues);

  const user = body.user.id;
  await client.chat.postMessage({
    channel: user,
    text: 'Your submission has been received. Thank you!'
  });

});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();