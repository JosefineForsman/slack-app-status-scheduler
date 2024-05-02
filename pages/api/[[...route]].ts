import { App, LogLevel, ModalView, HomeView } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";
import NextConnectReceiver from "../../utils/NextConnectReciever"
import { PersonalSchedule } from "@/app/types";

export const receiver = new NextConnectReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET || "invalid",
    processBeforeResponse: true,
  });

  const app = new App({
    token: process.env.SLACK_WEB_TOKEN as string,
    signingSecret: process.env.SLACK_SIGNING_SECRET as string,
    appToken: process.env.SLACK_APP_TOKEN as string,
    receiver: receiver,
    processBeforeResponse: true,
    logLevel: LogLevel.DEBUG,
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const options = [
  {
    text: {
      type: "plain_text",
      text: "🤱🏼 Care of child / Parental leave",
      emoji: true,
    },
    value: "breast-feeding",
  },
  {
    text: {
      type: "plain_text",
      text: "🏡 Working from home",
      emoji: true,
    },
    value: "house_with_garden",
  },
  {
    text: {
      type: "plain_text",
      text: "✈️ Traveling",
      emoji: true,
    },
    value: "airplain",
  },
  {
    text: {
      type: "plain_text",
      text: "🤒 Sick",
      emoji: true,
    },
    value: "face_with_thermometer",
  },
  {
    text: {
      type: "plain_text",
      text: "🏖️ Vacation",
      emoji: true,
    },
    value: "beach_with_umbrella",
  },
  {
    text: {
      type: "plain_text",
      text: "🟢 Office",
      emoji: true,
    },
    value: "office",
  },
];

const blocks = days.map((day) => ({
  type: "input",
  element: {
    type: "static_select",
    placeholder: {
      type: "plain_text",
      text: "Select a status",
      emoji: true,
    },
    options: options,
    action_id: `${day.toLowerCase()}_multi_static_select-action`,
  },
  label: {
    type: "plain_text",
    text: day,
    emoji: true,
  },
}));

app.shortcut("set_schedule", async ({ shortcut, ack, client }) => {
//   const weekNumber = getCurrentWeekNumber();
  await ack();

  const View: ModalView = {
    type: "modal",
    title: {
      type: "plain_text",
      text: `Statuses for this week`,
    },
    submit: {
      type: "plain_text",
      text: "Save",
    },

    callback_id: "view_1",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Select the statuses your know will be relevant for this week. ",
        },
      },
      ...blocks,
    ],
  };

  try {
    const result = await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: View,
    });
  } catch (error) {
    console.error("Failed to open modal:", error);
    await client.chat.postMessage({
      channel: shortcut.user.id,
      text: "Failed to open modal. Please try again later.",
    });
  }
});

app.view("view_1", async ({ ack, body, view, client }) => {
  await ack();
  const userId = body.user.id;
  const values = view.state.values;

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const daysToWorkAtHome: PersonalSchedule[] = [];
  for (const blockId in values) {
    for (const day of days) {
      const actionId = `${day.toLowerCase()}_multi_static_select-action`;
      if (values[blockId][actionId]) {
        const selectedOption = values[blockId][actionId].selected_option?.value;
        if (selectedOption) {
          daysToWorkAtHome.push({
            day,
            selectedOption,
            status_expiration: 0,
            status_text: "",
          });
        }
      }
    }
  }
  console.log(daysToWorkAtHome);


  const user = body.user.id;
  await client.chat.postMessage({
    channel: user,
    text: `✅ Your submission has been received.`,
  });
});

const homeTab: HomeView = {
  type: "home",
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Introducing our Slack app 'StatusCheck' ",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Simplify your weekly routine with just a few clicks. Use our shortcut `/Weekly schedule` in any message area to select your status for the entire workweek in a flash. Choose from options like 'In Office 🟢', ‘Working from home 🏡', ’Traveling ✈️', and more. Your choices are saved and displayed on a personalized dashboard, keeping everyone updated effortlessly.",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Step-by-step Guide:* \n*1.* Use the shortcut `/Weekly schedule` in any message area to open up the scheduling modal. \n*2.* Select your status for the entire workweek. \n*3.* Click 'Save' to save your schedule.\n*4.* You will get a message from the app as a confirmation of your schedule submission. \n*5.* Your schedule will be displayed on your personal dashboard for SQLI. \n*6.* Every Monday, a reminder message will be sent to a Slack channel to remind you to update your schedule.\n \nThis is how the modal looks like:",
      },
    },
    ...blocks,
  ],
};
app.event("app_home_opened", async ({ event, client }) => {
  try {
    await client.views.publish({
      user_id: event.user,
      view: homeTab,
    });
  } catch (error) {
    console.error(error);
  }
});

const router = receiver.start();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await router(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

router.get("/api", (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    test: true,
  });
});
