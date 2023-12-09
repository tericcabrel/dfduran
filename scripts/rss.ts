import { readFileSync, writeFileSync } from 'fs';

import RSS from 'rss';

const CONTENT_LAYER_BLOG_FILE_PATH = '.contentlayer/generated/Blog/_index.json';
const SITE_URL = 'https://dfdurand.com';

type Blog = {
  description: string;
  publishedAt: string;
  slug: string;
  title: string;
};

const generate = () => {
  const content = readFileSync(CONTENT_LAYER_BLOG_FILE_PATH, { encoding: 'utf-8' });
  const data = JSON.parse(content) as Blog[];

  const feed = new RSS({
    copyright: `All rights reserved © Fabrice Durand DJIATSA ${new Date().getFullYear()}`,
    feed_url: `${SITE_URL}/feed.xml`,
    image_url: `${SITE_URL}/static/images/banner.png`,
    pubDate: new Date(),
    site_url: SITE_URL,
    title: 'Fabrice Durand DJIATSA',
  });

  data.map((blog) => {
    feed.item({
      date: blog.publishedAt,
      description: blog.description,
      title: blog.title,
      url: `${SITE_URL}/blog/${blog.slug}`,
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
};

generate();
