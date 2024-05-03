import { ReactNode } from "react";
export type PersonalSchedule = {
    day: string;
    selectedOption: string;
    status_expiration: number;
    status_text: string;
  };
  export type User = {
    real_name: string;
    id: number;
    profile: Profile;
    tz: string;
    profilePicture: string;
    name: string;
    statusEmojiDisplayInfo: StatusInfo[];
    userId: string;
  };
  export type Profile = {
    status_text: string;
    image_512: string;
    first_name: string;
    last_name: string;
    statusEmojiDisplayInfo: StatusInfo[];
    status_emoji_display_info: StatusInfo[];
  };
  
  export type StatusInfo = {
    display_url: string;
    status_emoji: string;
    emoji_name: string;
  };
  export type AllUsersSchedule = {
    [day: string]: UserInteraction[];
  };
  export type UserInteraction = {
    selected_days: PersonalSchedule[];
    user_id: string;
  };
  export enum UserStatus {
    InOffice,
    WorkingFromHome,
    Unavailable,
  }
  export type DaySectionProps = {
    day: string;
    isToday: boolean;
    inOfficeUsers: any[];
    workingFromHomeUsers: any[];
    unavailableUsers: any[];
  };
  export type UserProps = {
    user: User;
    isCurrentDay: boolean;
  };
  export type SectionProps = {
    title: string;
    children: ReactNode;
    isCurrentDay?: boolean;
    flexGrowValue: number;
    flexBasisValue: string;
  };