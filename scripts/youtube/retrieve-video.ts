import * as fs from 'fs';

import { configDotenv } from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { chunk } from 'lodash';
import { z } from 'zod';

configDotenv();

const env = z.object({
  GOOGLE_APP_REFRESH_TOKEN: z.string(),
  GOOGLE_APP_TOKEN: z.string(),
  GOOGLE_APP_TOKEN_EXPIRE_DATE: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string(),
  YOUTUBE_CHANNEL_ID: z.string(),
});

env.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}

const youtubePlaylistVideosSchema = z.array(
  z.object({
    contentDetails: z.object({
      videoId: z.string(),
    }),
    id: z.string(),
  }),
);

const youtubeVideosSchema = z.array(
  z.object({
    contentDetails: z.object({
      duration: z.string(),
    }),
    id: z.string(),
    kind: z.string(),
    snippet: z.object({
      description: z.string(),
      publishedAt: z.string(),
      thumbnails: z.object({
        high: z.object({
          height: z.number(),
          url: z.string(),
          width: z.number(),
        }),
      }),
      title: z.string(),
    }),
    statistics: z.object({
      commentCount: z.string(),
      likeCount: z.string(),
      viewCount: z.string(),
    }),
    status: z.object({
      privacyStatus: z.string(),
      publicStatsViewable: z.boolean(),
    }),
  }),
);

type ChannelInfo = {
  id: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  playlistId: string | null;
};

type VideoFromPlaylistInfo = {
  id: string;
  videoId: string;
};

type VideoInfo = {
  id: string;
  title: string;
  description: string;
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
  featured: boolean;
};

type VideoResult = {
  items: VideoFromPlaylistInfo[];
  nextPageToken: string | null | undefined;
};

const FOLDER_PATH = 'data/youtube';
const FILENAME = 'videos.json';
const { OAuth2 } = google.auth;
const SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';
const {
  GOOGLE_APP_TOKEN,
  GOOGLE_APP_TOKEN_EXPIRE_DATE,
  GOOGLE_APP_REFRESH_TOKEN,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  YOUTUBE_CHANNEL_ID,
} = process.env;

const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);

oauth2Client.credentials = {
  access_token: GOOGLE_APP_TOKEN,
  expiry_date: +GOOGLE_APP_TOKEN_EXPIRE_DATE,
  refresh_token: GOOGLE_APP_REFRESH_TOKEN,
  scope: SCOPE,
  token_type: 'Bearer',
};

const service = google.youtube('v3');

const retrieveChannelInfo =
  (oauth2Client: OAuth2Client) =>
  (channelName: string): Promise<ChannelInfo> => {
    return new Promise((resolve, reject) => {
      service.channels.list(
        {
          auth: oauth2Client,
          id: [channelName],
          part: ['snippet', 'contentDetails', 'statistics'],
        },
        (error, response) => {
          if (error) {
            return reject({ error, message: 'The API returned an error: ' });
          }

          if (!response) {
            return reject({ message: 'Response has no content!' });
          }

          const channels = response.data.items ?? [];
          if (channels.length === 0) {
            return reject({ message: 'No channel found.' });
          }

          const [channel] = channels;

          resolve({
            id: channel.id ?? '',
            playlistId: channel.contentDetails?.relatedPlaylists?.uploads ?? null,
            subscriberCount: +(channel.statistics?.subscriberCount ?? 0),
            videoCount: +(channel.statistics?.videoCount ?? 0),
            viewCount: +(channel.statistics?.viewCount ?? 0),
          });
        },
      );
    });
  };
const retrievePlaylistVideos =
  (oauth2Client: OAuth2Client) =>
  (playlistId: string, nextPageToken: string | null | undefined): Promise<VideoResult> => {
    return new Promise((resolve, reject) => {
      service.playlistItems.list(
        {
          auth: oauth2Client,
          maxResults: 50,
          pageToken: nextPageToken ?? undefined,
          part: ['contentDetails'],
          playlistId,
        },
        (error, response) => {
          if (error) {
            return reject({ error, message: 'The API returned an error: ' });
          }

          if (!response) {
            return reject({ message: 'Response has no content!' });
          }

          const videos = response.data.items ?? [];
          if (videos.length === 0) {
            return reject({ message: 'No video from the playlist found.' });
          }

          const parsedVideos = youtubePlaylistVideosSchema.parse(videos);

          const formattedVideos = parsedVideos.map((video): VideoFromPlaylistInfo => {
            return {
              id: video.id,
              videoId: video.contentDetails.videoId,
            };
          });

          resolve({
            items: formattedVideos,
            nextPageToken: response.data.nextPageToken,
          });
        },
      );
    });
  };

const recursivelyRetrievePlaylistVideos =
  (oauth2Client: OAuth2Client) =>
  async (
    playlistId: string,
    nextPageToken: string | null | undefined,
  ): Promise<VideoFromPlaylistInfo[]> => {
    const videosList: VideoFromPlaylistInfo[] = [];
    let token: string | undefined | null = nextPageToken;

    do {
      const result = await retrievePlaylistVideos(oauth2Client)(playlistId, token);

      videosList.push(...result.items);

      token = result.nextPageToken ?? null;
    } while (token !== null);

    return videosList;
  };

const retrieveVideosWithMetadata =
  (oauth2Client: OAuth2Client) =>
  (videoIds: string[]): Promise<VideoInfo[]> => {
    return new Promise((resolve, reject) => {
      service.videos.list(
        {
          auth: oauth2Client,
          id: videoIds,
          part: ['snippet', 'contentDetails', 'status', 'statistics'],
        },
        (error, response) => {
          if (error) {
            return reject({ error, message: 'The API returned an error: ' });
          }

          if (!response) {
            return reject({ message: 'Response has no content!' });
          }

          const videos = response.data.items ?? [];
          if (videos.length === 0) {
            return reject({ message: 'No video found.' });
          }

          const parsedVideos = youtubeVideosSchema.parse(videos);

          const formattedVideos = parsedVideos.map((video): VideoInfo => {
            return {
              commentCount: +video.statistics.commentCount,
              description: video.snippet.description,
              duration: video.contentDetails.duration,
              featured: false,
              id: video.id,
              kind: video.kind,
              likeCount: +video.statistics.likeCount,
              localized: {
                description: null,
                title: null,
              },
              privacyStatus: video.status.privacyStatus,
              publishedAt: video.snippet.publishedAt,
              statsViewable: video.status.publicStatsViewable,
              thumbnail: video.snippet.thumbnails.high,
              title: video.snippet.title,
              viewCount: +video.statistics.viewCount,
            };
          });

          resolve(formattedVideos);
        },
      );
    });
  };

const retrieveAllVideosWithMetadata =
  (oauth2Client: OAuth2Client) =>
  async (videoIds: string[]): Promise<VideoInfo[]> => {
    const videosList: VideoInfo[] = [];

    const videoIdChunks = chunk(videoIds, 50);

    for (const videoIds of videoIdChunks) {
      const result = await retrieveVideosWithMetadata(oauth2Client)(videoIds);

      videosList.push(...result);
    }

    return videosList;
  };

const saveVideoFile = (videoItems: VideoInfo[], folderPath: string, fileName: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const filePath = `${folderPath}/${fileName}`;

  const content = JSON.stringify({ items: videoItems }, null, 2);

  fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
};

(async () => {
  try {
    console.log(`Retrieve information about the channel ${YOUTUBE_CHANNEL_ID}`);

    const channel = await retrieveChannelInfo(oauth2Client)(YOUTUBE_CHANNEL_ID);

    if (!channel.playlistId) {
      console.error('The channel has no playlist');
      process.exit(1);
    }

    console.log(`Retrieve videos in the playlist: ${channel.playlistId}`);

    const videos = await recursivelyRetrievePlaylistVideos(oauth2Client)(
      channel.playlistId,
      undefined,
    );

    console.log(`Successfully retrieved ${videos.length} videos!`);

    const videoIds = videos.map((video) => video.videoId);

    console.log('Retrieve videos with metadata...');

    const videosWithData = await retrieveAllVideosWithMetadata(oauth2Client)(videoIds);

    console.log(`Successfully retrieved metadata of ${videosWithData.length} videos!`);

    saveVideoFile(videosWithData, FOLDER_PATH, FILENAME);

    console.log('Successfully exported the videos in the file');
  } catch (e) {
    console.error('Error => ', e);
  }
})();
