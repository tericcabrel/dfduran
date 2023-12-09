import client from '@sendgrid/client';

type ListCount = {
  contact_count: number;
  billable_count: number;
};

client.setApiKey(process.env.SENDGRID_API_KEY);

export const getSendGridListCount = async () => {
  const listId = process.env.SENDGRID_LIST_ID;

  const [response] = await client.request({
    method: 'GET',
    url: `/v3/marketing/lists/${listId}/contacts/count`,
  });

  return <ListCount>response.body;
};
