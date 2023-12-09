import fs from 'fs';
import path from 'path';

const VIDEO_URLS_TO_EXCLUDE = [
  'https://youtu.be/TRvTtfAloT4?si=FGxSrkKHD-iujKTb',
  'https://youtu.be/rQuqwb8hTCs?si=J-8EKLMr3t7pWbVp',
  'https://youtu.be/tOqGkCcG43M?si=jHmcfgjN7fRUlQEG',
  'https://youtu.be/4l3kOXMnrOs?si=liqgJUlZCygER5vH',
  'https://youtu.be/bBG_RMXVhnE?si=m4pLmxWyA0g6_iQP',
  'https://youtu.be/x_pPKb-s0Ro?si=4PSdPO-Tl2enQuVk',
  'https://youtu.be/6KD648TUEVE?si=cfj09imP17mCtCbm',
  'https://youtu.be/1vG0qTOsOzw?si=9pjlyM4aHGmbxUsP',
  'https://youtu.be/3KDXidRaVj8?si=jFeoB2W3vq0kSxRV',
  'https://youtu.be/k0LPCDwKVWs?si=5ejiF_FrEyKcGVcp',
  'https://youtu.be/LQaeJBEwMCk?si=AMOvlpF7lT2YD-_j',
  'https://youtu.be/h2caFaettgc?si=Cf9eUl0J6KcdrBG1',
  'https://youtu.be/Bcn4S2f5cYA?si=Kvp9h8bF36CVvGNN',
  'https://youtu.be/7Y14Wd0aI3E?si=OhhAnM_mZvgLUnUk',
  'https://youtu.be/bxQhHLJ5DsI?si=MjTrkz26ZmFUTzZi',
  'https://youtu.be/40rrkEe7lKM?si=2wKHKAVqZAKrbQCa',
  'https://youtu.be/Q-TzzgTrb6s?si=oPmuerwJ9Na0AcA7',
  'https://youtu.be/z1l7Lbvf93o?si=nz7hdm171WAmB3oQ',
  'https://youtu.be/tHYt14AbiKI?si=f2_ybPwG6bp5RhyC',
  'https://youtu.be/MiUGbTJMoK8?si=mZN-LaI3vXqrars1',
  'https://youtu.be/gw8mYAPJ3K4?si=46JFEsytn_K-PHt9',
  'https://youtu.be/_-RMruhkF9s?si=3AGhr1Zl_d7L34qu',
  'https://youtu.be/5Y3ZqdEp_1E?si=Uy7CvmU-sck7xfKA',
  'https://youtu.be/Yujw8L7UyFs?si=z13_Cvh0PbMS7HtG',
  'https://youtu.be/0ESk2oSdbsA?si=YioWSI_00TuyHpLt',
  'https://youtu.be/UXuSXDP0vS4?si=D-WcCr1HyXW3GJgG',
  'https://youtu.be/qtfa8k5Min8?si=zqlpy6M4yXiU5HjF',
  'https://youtu.be/8RmjRm3M674?si=iM6moflBxhYrLxAT',
  'https://youtu.be/Slm8e63pJqU?si=alTyykpgueSUd2uu',
  'https://youtu.be/9tbP-x7WAeA?si=g1SZaAJvmv0dIj-S',
  'https://youtu.be/QE0xyucMpKk?si=jK9FG_MRynGc_LZb',
  'https://youtu.be/g_ItQ7DxDWk?si=eAlvKhrPgyUmZiKd',
  'https://youtu.be/ZER27lTktiw?si=BhAIF71VqQy8b7G4',
  'https://youtu.be/dBlXysmFXn8?si=d7QXJndZBdEfmcBH',
];
const VIDEO_IDS_TO_BE_FEATURED = ['hNyjTxNQqhs', 'Q_H35NNq9e0', 'VK6rUFdiQ24', '2SCN2leGfmo'];

type VideoInfo = {
  id: string;
};

const VIDEO_FILE_PATH = '../../data/youtube/videos.json';
const VIDEO_INCLUDED_FILE_PATH = '../../data/youtube/videos-final.json';

const extractVideosIds = (videoURLs: string[]) => {
  return videoURLs.map((url) => {
    const match = url.match(/youtu\.be\/(\w+).*/i);

    if (match && match[1]) {
      return match[1];
    }

    return '';
  });
};

const readVideosFile = (filePath: string): VideoInfo[] => {
  const absolutePath = path.resolve(__dirname, filePath);
  const content = fs.readFileSync(absolutePath, { encoding: 'utf-8' });

  const parsedContent = JSON.parse(content) as { items: VideoInfo[] };

  return parsedContent.items;
};

const saveVideoFile = (videoItems: VideoInfo[], filePath: string) => {
  const absolutePath = path.resolve(__dirname, filePath);

  const content = JSON.stringify({ items: videoItems }, null, 2);

  fs.writeFileSync(absolutePath, content, { encoding: 'utf-8' });
};

const isVideoNotAmongExcluded = (videoIds: string[]) => (video: VideoInfo) => {
  return !videoIds.includes(video.id);
};

(async () => {
  const videos = readVideosFile(VIDEO_FILE_PATH);

  const videoIds = extractVideosIds(VIDEO_URLS_TO_EXCLUDE);

  const videosIncluded = videos.filter(isVideoNotAmongExcluded(videoIds)).map((video) => {
    return {
      ...video,
      featured: VIDEO_IDS_TO_BE_FEATURED.includes(video.id),
    };
  });

  saveVideoFile(videosIncluded, VIDEO_INCLUDED_FILE_PATH);
})();
