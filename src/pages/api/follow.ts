import {NextApiRequest, NextApiResponse} from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {

    const userId = (req.method === 'POST') ? req.body.userId : req.query.userId;
    const {currentUser} = await serverAuth(req, res);

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser?.id
      }
    });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updateFollowingIds = [...(user.followingIds || [])];

    if (req.method === 'POST') {
      updateFollowingIds.push(userId);
    }

    if (req.method === 'DELETE') {
      updateFollowingIds = updateFollowingIds.filter(followingId => followingId !== userId);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updateFollowingIds
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("While trying to follow: " + error);
    return res.status(503).end();
  }
};
export default handler;