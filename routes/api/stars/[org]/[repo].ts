export default eventHandler((event) => {
  const { org, repo } = event.context.params;

  return getStars(org, repo);
});

type Project = {
  org: string;
  repo: string;
  stars: string;
};

const getStars = async (org: string, repo: string): Promise<Project> => {
  const stars = await cachedGHStars(`${org}/${repo}`);

  return {
    org,
    repo,
    stars,
  };
};
