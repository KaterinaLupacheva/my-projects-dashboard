export default async (_, res) => {
  const articlesResponse = await fetch("https://dev.to/api/articles/me", {
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.DEVTO_API_KEY,
    },
  });

  const followersResponse = await fetch(
    "https://dev.to/api/followers/users?per_page=300",
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.DEVTO_API_KEY,
      },
    }
  );

  const articles = await articlesResponse.json();
  const followers = await followersResponse.json();

  return res.status(200).json({
    articles,
    followersCount: followers.length,
  });
};
