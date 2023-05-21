import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/libs/prismadb";


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const {postId} = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid post Id');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log("While trying to show post: " + error);
    return res.status(503).end();
  }

};
export default handler;