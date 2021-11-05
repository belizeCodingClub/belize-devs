// pages/api/post/index.ts

import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { contactNumber, website, about } = req.body;

  const session = await getSession({ req });

  const result = await prisma.user.update({
    where: { id: Number(session.userId) },
    data: {
      contactNumber,
      website,
      about,
    },
  });
  res.json(result);
}
