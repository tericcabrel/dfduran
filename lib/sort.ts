type Value = {
  publishedAt: string;
};

export const sortByPublishedDateDescending = (a: Value, b: Value) => {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
};
