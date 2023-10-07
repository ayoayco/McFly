export const cachedGHStars = cachedFunction(
  async (repo: string) => {
    const data: any = await $fetch(`https://api.github.com/repos/${repo}`);
    return data.stargazers_count;
  },
  {
    maxAge: 60 * 60,
    name: "ghStars",
    getKey: (repo: string) => repo,
  }
);
