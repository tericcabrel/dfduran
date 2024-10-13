import * as fs from 'fs';
import * as path from 'path';

import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';
import { configDotenv } from 'dotenv';
import { z } from 'zod';

configDotenv();

const env = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_ACCESS_SECRET_KEY: z.string(),
});

env.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}

type VideoInfo = {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  localized: {
    title: string | null;
    description: string | null;
  };
  publishedAt: string;
  duration: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  } | null;
  kind: string;
  privacyStatus: string;
  statsViewable: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

const VIDEO_FILE_PATH = '../../data/youtube/videos.json';
const VIDEO_TRANSLATED_FILE_PATH = '../../data/youtube/videos-tr.json';
const { AWS_ACCESS_KEY_ID, AWS_ACCESS_SECRET_KEY } = process.env;

const translateClient = new TranslateClient([
  {
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_ACCESS_SECRET_KEY,
    },
    region: 'eu-west-3',
  },
]);

const readVideosFile = (filePath: string): VideoInfo[] => {
  const absolutePath = path.resolve(__dirname, filePath);
  const content = fs.readFileSync(absolutePath, { encoding: 'utf-8' });

  const parsedContent = JSON.parse(content) as { items: VideoInfo[] };

  return parsedContent.items;
};

const translateContent =
  (translator: TranslateClient) =>
  async (text: string): Promise<string | null> => {
    const command = new TranslateTextCommand({
      SourceLanguageCode: 'fr',
      TargetLanguageCode: 'en',
      Text: text, // Maximum length of 10000
    });

    const result = await translator.send(command);

    return result.TranslatedText ?? null;
  };

const saveVideoFile = (videoItems: VideoInfo[], filePath: string) => {
  const absolutePath = path.resolve(__dirname, filePath);

  const content = JSON.stringify({ items: videoItems }, null, 2);

  fs.writeFileSync(absolutePath, content, { encoding: 'utf-8' });
};

(async () => {
  const videos = readVideosFile(VIDEO_FILE_PATH);

  for (let i = 1; i < videos.length; i++) {
    console.log(`Translating video ${i}`);

    const { title, description } = videos[i];

    try {
      const titleResult = title.length > 0 ? await translateContent(translateClient)(title) : null;
      const descriptionResult =
        description.length > 0 ? await translateContent(translateClient)(description) : null;

      videos[i].localized = {
        description: descriptionResult,
        title: titleResult,
      };
    } catch (error) {
      console.error(error);
    }
  }

  saveVideoFile(videos, VIDEO_TRANSLATED_FILE_PATH);
})();
