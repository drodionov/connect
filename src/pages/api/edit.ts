import {NextApiRequest, NextApiResponse} from "next";
import serverAuth from "@/libs/serverAuth";

import prisma from '@/libs/prismadb';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
  if (req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const {currentUser} = await serverAuth(req, res);

    const {name, username, bio, profileImage, coverImage} = req.body;

    if (!name || !username) {
      throw new Error('Missing fields');
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage
      }
    });

    return res.status(200).json(updateUser);

  } catch (error) {
    console.log("Error on user profile update: " + error);
    return res.status(400).end();
  }
};

export default handler;