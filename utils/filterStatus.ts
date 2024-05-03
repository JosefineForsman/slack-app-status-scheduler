import { User, UserStatus } from "../app/types";

export function getUsersByStatus(users: User[], status: UserStatus) {
  switch (status) {
    case UserStatus.InOffice:
      return users.filter(
        (user) =>
          user &&
          (!user.statusEmojiDisplayInfo ||
            user.statusEmojiDisplayInfo.length === 0 ||
            user.statusEmojiDisplayInfo.some(
              (emoji) => emoji.emoji_name === "office"
            ))
      );

    case UserStatus.WorkingFromHome:
      return users.filter(
        (user) =>
          user &&
          user.statusEmojiDisplayInfo &&
          user.statusEmojiDisplayInfo.some(
            (emoji) => emoji.emoji_name === "house_with_garden"
          )
      );
    case UserStatus.Unavailable:
      return users.filter(
        (user) =>
          user &&
          user.statusEmojiDisplayInfo &&
          user.statusEmojiDisplayInfo.some(
            (emoji) =>
              emoji.emoji_name !== "house_with_garden" &&
              emoji.emoji_name !== "office" &&
              emoji.emoji_name !== "spiral_calendar_pad"
          )
      );
    default:
      throw new Error("Invalid user status");
  }
}
