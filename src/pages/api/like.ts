import {NextApiRequest, NextApiResponse} from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const postId = req.method === 'POST' ? req.body.postId : req.query.postId;
    const {currentUser} = await serverAuth(req, res);
    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid post id');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    if (!post) {
      throw new Error('Post not found: ' + post);
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === 'POST') {
      updatedLikedIds.push(currentUser.id);
    }

    if (req.method === 'DELETE') {
      updatedLikedIds = updatedLikedIds.filter(likedId => likedId !== currentUser.id);
    }

    const updatedPost = prisma.post.update({
      where: {
        id: postId
      },
      data: {
        likedIds: updatedLikedIds
      }
    });

    return res.status(200).json(updatedPost);

  } catch (error) {
    console.log("While trying to like: " + error);
    return res.status(503).end();
  }
};
export default handler