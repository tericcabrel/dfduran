import readline from 'readline';

import { configDotenv } from 'dotenv';
import { google } from 'googleapis';
import { z } from 'zod';

configDotenv();

const env = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string(),
});

env.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}

const { OAuth2 } = google.auth;
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

const askAuthorizationSuccessCode = (): Promise<string> => {
  const console = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    console.question('Enter the code from that page here: ', (code) => {
      console.close();

      resolve(code);
    });
  });
};

const authorize = async () => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;
  const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);

  const authURL = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url: ', authURL);

  const authorizationCode = await askAuthorizationSuccessCode();

  const { tokens: accessToken } = await oauth2Client.getToken(authorizationCode);

  console.log('The Access Token is: ', accessToken);
};

void authorize();
