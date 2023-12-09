import { NextApiRequest, NextApiResponse } from 'next';

import { addToSendGridList } from 'lib/sendgrid/add-to-list';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'An email address is required', success: false });
  }

  try {
    await addToSendGridList({ email });

    return res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);

    return res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

export default handler;
