import {
  ComputedFields,
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { toKebabCase } from './lib/string-utils';
import { siteConfig } from './site.config';

const computedFields: ComputedFields = {
  editUrl: {
    resolve: (doc) => `${siteConfig.repo.editUrl}${doc._id}`,
    type: 'string',
  },
  params: {
    resolve: (doc) => doc._raw.flattenedPath.split('/'),
    type: 'list',
  },
  readingTime: {
    resolve: (doc) => readingTime(doc.body.raw, { wordsPerMinute: 300 }),
    type: 'json',
  },
  slug: {
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    type: 'string',
  },
  tweetUrl: {
    resolve: (doc) => {
      const slug = doc._raw.sourceFileName.replace(/\.mdx$/, '');

      return `https://twitter.com/intent/tweet?${new URLSearchParams({
        text: `I just read "${doc.title}" by @duranddjiatsa\n\n`,
        url: `https://dfdurand.com/${doc.type.toLowerCase()}/${slug}`,
      })}`;
    },
    type: 'string',
  },
};

const Blog = defineDocumentType(() => ({
  computedFields: {
    ...computedFields,
    ogImageUrl: {
      resolve: (doc) => `https://dfdurand.com/static/images/og/${toKebabCase(doc.title)}.png`,
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    description: { required: true, type: 'string' },
    featured: { type: 'boolean' },
    image: { required: true, type: 'string' },
    publishedAt: { required: true, type: 'string' },
    tags: { of: { type: 'string' }, type: 'list' },
    title: { required: true, type: 'string' },
  },
  filePathPattern: 'blog/**/*.mdx',
  name: 'Blog',
}));

const About = defineDocumentType(() => ({
  computedFields,
  contentType: 'mdx',
  fields: {
    description: { required: true, type: 'string' },
    imageBottom: { required: true, type: 'string' },
    imageTop: { required: true, type: 'string' },
    name: { required: true, type: 'string' },
    publishedAt: { required: true, type: 'string' },
  },
  filePathPattern: 'about/**/*.mdx',
  name: 'About',
}));

const Project = defineDocumentType(() => ({
  computedFields,
  contentType: 'mdx',
  fields: {
    description: { type: 'string' },
    featured: { type: 'boolean' },
    github: { type: 'string' },
    image: { required: true, type: 'string' },
    metadata: { type: 'json' },
    objectPosition: { type: 'string' },
    title: { required: true, type: 'string' },
    website: { type: 'string' },
  },
  filePathPattern: 'project/*.mdx',
  name: 'Project',
}));

const VideoItemThumbnail = defineNestedType(() => ({
  fields: {
    url: { required: true, type: 'string' },
  },
  name: 'VideoItemThumbnail',
}));

const VideoItemLocalized = defineNestedType(() => ({
  fields: {
    description: { type: 'string' },
    title: { type: 'string' },
  },
  name: 'VideoItemLocalized',
}));

const VideoItem = defineNestedType(() => ({
  fields: {
    commentCount: { required: true, type: 'number' },
    description: { required: true, type: 'string' },
    duration: { required: true, type: 'string' },
    featured: { required: true, type: 'boolean' },
    id: { required: true, type: 'string' },
    likeCount: { required: true, type: 'number' },
    localized: {
      of: VideoItemLocalized,
      required: true,
      type: 'nested',
    },
    publishedAt: { required: true, type: 'string' },
    statsViewable: { required: true, type: 'boolean' },
    thumbnail: {
      of: VideoItemThumbnail,
      required: true,
      type: 'nested',
    },
    title: { required: true, type: 'string' },
    viewCount: { required: true, type: 'number' },
  },
  name: 'VideoItem',
}));

const Video = defineDocumentType(() => ({
  contentType: 'data',
  fields: {
    items: { of: VideoItem, required: true, type: 'list' },
  },
  filePathPattern: 'youtube/videos.json',
  name: 'Video',
}));

const GraduationItem = defineNestedType(() => ({
  fields: {
    date: { required: true, type: 'string' },
    description: { required: true, type: 'string' },
    school: { required: true, type: 'string' },
    title: { required: true, type: 'string' },
    year: { required: true, type: 'number' },
  },
  name: 'GraduationItem',
}));

const Graduation = defineDocumentType(() => ({
  contentType: 'data',
  fields: {
    items: { of: GraduationItem, required: true, type: 'list' },
  },
  filePathPattern: 'school/graduation.json',
  name: 'Graduation',
}));

const TechStack = defineDocumentType(() => ({
  contentType: 'data',
  fields: {
    items: { of: { type: 'string' }, required: true, type: 'list' },
  },
  filePathPattern: 'tech-stack/data.json',
  name: 'TechStack',
}));

const contentLayerConfig = makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Project, Video, About, Graduation, TechStack],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['anchor'],
          },
          test: ['h2', 'h3', 'h4', 'h5', 'h6'],
        },
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
});

export default contentLayerConfig;
