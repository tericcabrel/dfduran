import client from '@sendgrid/client';

client.setApiKey(process.env.SENDGRID_API_KEY);

type AddToListData = {
  firstName?: string;
  email: string;
};

export const addToSendGridList = async (options: AddToListData) => {
  const { email, firstName } = options;
  const listId = process.env.SENDGRID_LIST_ID;

  const [response] = await client.request({
    body: {
      contacts: [{ email, first_name: firstName }],
      list_ids: [listId],
    },
    method: 'PUT',
    url: '/v3/marketing/contacts',
  });

  return response.body;
};
