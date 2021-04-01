import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import shortid from "shortid";
import { SESSIONS_COLLECTION } from "../../util/constants";
import { connectToDatabase } from "../../util/mongodb";
import Session from "../../util/types/Session";
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
  const session: Session = {
    _id: shortid.generate(),
    user: user_with_email._id,
    token: crypto.randomBytes(64).toString("hex"),
  };

  await db.collection(SESSIONS_COLLECTION).insertOne(session);

  res.json({
    success: true,
    message: "logged in",
    token: session.token,
    user: {
      email: user_with_email.email,
      username: user_with_email.username,
    },
  });
};
