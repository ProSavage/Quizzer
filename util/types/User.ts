export default interface User {
  _id: string;
  email: string;
  username: string;
  // This is a hash of their password, not a real one.
  password: string;
}

export interface PublicUser {
  email: string;
  username: string;
}
