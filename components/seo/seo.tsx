import { NextSeo } from 'next-seo';

import { siteConfig } from '../../site.config';

type Props = {
  title?: string;
  description?: string;
  image?: string;
  post?: {
    date?: string;
    tags?: string[];
  };
};

export const SEO = (props: Props) => {
  const { title, description, post, image } = props;

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        article: post ? { publishedTime: post.date, tags: post.tags } : undefined,
        description,
        images: image ? [{ alt: title, height: 630, url: image, width: 1200 }] : undefined,
        title,
      }}
      titleTemplate={siteConfig.titleTemplate}
    />
  );
};
