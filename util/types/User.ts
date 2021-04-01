export default interface User {
  _id: string;
  email: string;
  // This is a hash of their password, not a real one.
  password: string;
}
