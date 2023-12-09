import * as fs from 'fs';
import * as path from 'path';

import AWS from 'aws-sdk';
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

AWS.config.credentials = new AWS.Credentials(AWS_ACCESS_KEY_ID, AWS_ACCESS_SECRET_KEY);

/**
 * @link https://docs.aws.amazon.com/general/latest/gr/translate-service.html#translate_region
 */
const endpoint = new AWS.Endpoint('translate.eu-west-3.amazonaws.com ');

const translator = new AWS.Translate({
  endpoint: endpoint,
  region: 'eu-west-3',
});

const readVideosFile = (filePath: string): VideoInfo[] => {
  const absolutePath = path.resolve(__dirname, filePath);
  const content = fs.readFileSync(absolutePath, { encoding: 'utf-8' });

  const parsedContent = JSON.parse(content) as { items: VideoInfo[] };

  return parsedContent.items;
};

const translateContent =
  (translator: AWS.Translate) =>
  (text: string): Promise<string | null> => {
    /**
     * @link https://docs.aws.amazon.com/translate/latest/dg/what-is-languages.html
     */
    const params: AWS.Translate.TranslateTextRequest = {
      // Maximum length of 10000
      SourceLanguageCode: 'fr',
      TargetLanguageCode: 'en',
      Text: text,
    };

    return new Promise((resolve, reject) => {
      translator.translateText(params, (error, result) => {
        if (error) {
          console.error('Error calling Translate: ' + error.message + error.stack);
          reject(error);
        }

        if (!result) {
          console.log('The translation returned no result!');
          resolve(null);
        }

        resolve(result.TranslatedText);
      });
    });
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
      const titleResult = title.length > 0 ? await translateContent(translator)(title) : null;
      const descriptionResult =
        description.length > 0 ? await translateContent(translator)(description) : null;

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
