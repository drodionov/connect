import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const {currentUser} = await serverAuth(req, res);
    const {body} = req.body;
    const {postId} = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid id: ' + postId);
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId
      }
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.log("While trying to post comment: " + error);
    return res.status(503).end();
  }
};
export default handler