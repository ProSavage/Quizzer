import User from "./User";

export default interface Session {
  _id: string;
  user: User["_id"];
  token: string;
}
