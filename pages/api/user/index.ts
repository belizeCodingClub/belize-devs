// pages/api/post/index.ts

import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { contactNumber, website, about, github, linkedin } = req.body;

  const session = await getSession({ req });

  const result = await prisma.user.update({
    where: { id: Number(session.user.id) },
    data: {
      contactNumber,
      website,
      about,
      github,
      linkedin,
    },
  });
  res.json(result);
}
