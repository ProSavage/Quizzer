import { atom } from "recoil";
import { PublicUser } from "../util/types/User";

export const userState = atom<PublicUser | undefined>({
  key: "USER",
  default: undefined,
});
