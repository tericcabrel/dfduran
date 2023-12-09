import { NextApiRequest, NextApiResponse } from 'next';

import { getSendGridListCount } from 'lib/sendgrid/get-list-count';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await getSendGridListCount();

    return res.status(200).json({ count: data.contact_count, success: true });
  } catch (e) {
    console.log(e);

    return res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

export default handler;
