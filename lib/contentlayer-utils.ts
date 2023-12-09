import {
  allAbouts,
  allBlogs,
  allGraduations as allDataGraduations,
  allTechStacks as allDataTechStacks,
  allVideos as allDataVideos,
  allProjects,
} from 'contentlayer/generated';

const videos = allDataVideos[0].items ?? [];
const graduations = allDataGraduations[0].items ?? [];
const techStacks = allDataTechStacks[0].items ?? [];

export const getBlogTags = (data = allBlogs) => {
  const values = data.flatMap((blog) => blog.tags);

  return Array.from(new Set(values)).reduce<string[]>((result, tag) => {
    if (!tag) {
      return result;
    }

    return result.concat([tag]);
  }, []);
};

export const allFeaturedBlogs = allBlogs.filter((blog) => blog.featured);

export const allFeaturedProjects = allProjects.filter((project) => project.featured);

export const allFeaturedVideos = videos.filter((v) => v.featured);

export const allVideos = videos.slice();

export const [aboutData] = allAbouts.slice();

export const allGraduations = graduations.slice();

export const allTechStacks = techStacks.slice();
