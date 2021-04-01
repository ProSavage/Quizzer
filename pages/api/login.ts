import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../util/mongodb";
import User from "../../util/types/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const { db } = await connectToDatabase();

  // VALIDATION.
  const user_with_email = await db.collection<User>("users").findOne({ email });
  if (user_with_email === null) {
    res.json({ success: false, message: "This email is not registered yet." });
    return;
  }

  const is_password_same = bcrypt.compareSync(
    password,
    user_with_email.password
  );

  if (!is_password_same) {
    res.json({ success: false, message: "Wrong password." });
    return;
  }

  // CREATE SESSION

  res.statusCode = 200;
  res.json({ success: true, message: "registered." });
};
