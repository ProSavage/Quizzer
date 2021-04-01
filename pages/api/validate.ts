// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { SESSIONS_COLLECTION, USERS_COLLECTION } from "../../util/constants";
import { connectToDatabase } from "../../util/mongodb";
import Session from "../../util/types/Session";
import User from "../../util/types/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body;

  const { db } = await connectToDatabase();

  const session = await db
    .collection<Session>(SESSIONS_COLLECTION)
    .findOne({ token });

  if (session === null) {
    res.status(400).json({ success: false, message: "Invalid token." });
    return;
  }

  const user = await db
    .collection<User>(USERS_COLLECTION)
    .findOne({ _id: session.user });

  if (user === null) {
    res.status(400).json({ success: false, message: "user does not exist." });
    return;
  }

  res.json({
    success: true,
    message: "session valid",
    user: {
      email: user.email,
      username: user.username,
    },
  });
};
