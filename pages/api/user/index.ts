import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const limit = 8;
    const cursor = req.query.cursor ?? "";
    const cursorObj =
      cursor === "" ? undefined : { id: parseInt(cursor as string, 10) };

    const users = await prisma.user.findMany({
      skip: cursor !== "" ? 1 : 0,
      cursor: cursorObj,
      take: limit,
    });

    return res.json({
      users,
      nextId: users.length === limit ? users[limit - 1].id : undefined,
    });
  } else {
    const { contactNumber, website, about, github, linkedin, headline } =
      req.body;

    const session = await getSession({ req });

    const result = await prisma.user.update({
      where: { id: Number(session.user.id) },
      data: {
        contactNumber,
        website,
        about,
        github,
        linkedin,
        headline,
      },
    });
    res.json(result);
  }
}
