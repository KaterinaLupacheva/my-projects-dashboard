export default async (_, res) => {
  const articlesResponse = await fetch("https://dev.to/api/articles/m", {
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.DEVTO_API_KEY,
    },
  });

  const articles = await articlesResponse.json();

  return res.status(200).json({
    articles,
  });
};
