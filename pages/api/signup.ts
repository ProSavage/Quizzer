// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import shortid from "shortid";
import { connectToDatabase } from "../../util/mongodb";
import User from "../../util/types/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const { db } = await connectToDatabase();

  const user_with_email = await db.collection("users").findOne({ email });
  if (user_with_email !== null) {
    res.json({ success: false, message: "This email is already registered." });
    return;
  }

  const password_hash = bcrypt.hashSync(password, 10);

  const user: User = {
    _id: shortid.generate(),
    email,
    password: password_hash,
  };

  db.collection("users").insertOne(user);
  res.statusCode = 200;
  res.json({ success: true, message: "registered." });
};
