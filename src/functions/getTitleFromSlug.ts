const getTitleFromSlug = (slug: string) =>
  slug[0] + slug.replaceAll("-", " ").substring(1);

export default getTitleFromSlug;
