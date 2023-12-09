const tags = [
  'IoT',
  'electronic',
  'embedded systems',
  'computer vision',
  'artificial-intelligence',
  'ai',
  'cloud',
  'network-protocol',
  'database',
  'sensors',
  'rtos',
  'tips',
];

const shared = {
  description:
    "I'm passionate about IoT, Embedded Systems, Computer Vision and Artificial Intelligence. I enjoy sharing my knowledge and working in exciting projects",
  editUrl: 'https://github.com/tericcabrel/dfdurand/edit/main/data/',
  image: 'https://dfdurand.com/static/images/banner.png',
  name: 'Fabrice Durand DJIATSA',
  repo: 'https://github.com/tericcabrel/dfdurand',
  title: 'Fabrice Durand DJIATSA (aka Lavoisier) - Engineer in Numerical Systems and Embedded',
  website: 'https://dfdurand.com',
};

export const siteConfig = {
  description: shared.description,
  image: shared.image,
  name: shared.name,
  openGraph: {
    description: shared.description,
    images: [
      {
        alt: 'Fabrice Durand DJIATSA (aka Lavoisier) - Engineer in Numerical Systems and Embedded',
        height: 720,
        url: 'https://dfdurand.com/static/images/banner.png',
        width: 1200,
      },
    ],
    locale: 'en_US',
    site_name: shared.name,
    title: shared.title,
    type: 'website',
    url: shared.website,
  },
  profiles: {
    email: 'mailto:duranddjiatsa@gmail.com',
    github: 'https://github.com/dfdurand',
    linkedin: 'https://www.linkedin.com/in/fabrice-durand-djiatsa',
    twitter: 'https://twitter.com/duranddjiatsa',
    youtube: 'https://www.youtube.com/@engineeringspace8044',
  },
  repo: {
    editUrl: shared.editUrl,
    url: shared.repo,
  },
  siteUrl: shared.website,
  title: shared.title,
  titleTemplate: '%s - Fabrice Durand DJIATSA',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@duranddjiatsa',
    site: '@duranddjiatsa',
  },
  type: 'website',
};
