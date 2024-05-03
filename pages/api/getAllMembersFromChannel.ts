import { WebClient } from "@slack/web-api";

const web = new WebClient(process.env.SLACK_WEB_TOKEN);

export async function getAllChannelMembers() {
  try {
    const response = await web.conversations.members({
      channel: "C06G9DCV1BL",
    });

    if (!response.ok) {
      throw new Error(response.error);
    }
    const channelMembers = response.members || [];
    const userProfiles = await Promise.all(channelMembers.map(getUserInfo));

    return userProfiles.filter(Boolean);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getUserInfo(userId: string) {
  try {
    const response = await web.users.info({ user: userId });
    if (!response.ok) {
      throw new Error(response.error);
    }
    const user = response?.user;
    if (user?.is_bot) {
      return null;
    }

    console.log(user)
    return {
      userId: user?.id,
      name: user?.real_name,
      profilePicture: user?.profile?.image_512,
      statusEmojiDisplayInfo: user?.profile?.status_emoji_display_info,
      status_text: user?.profile?.status_text,
      status_expiration: user?.profile?.status_expiration,
    };
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
}
