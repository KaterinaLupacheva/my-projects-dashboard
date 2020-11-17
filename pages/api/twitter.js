export default async (_, res) => {
  const followersResponse = await fetch(
    `https://api.twitter.com/1.1/followers/ids.json?screen_name=${process.env.TWITTER_USERNAME}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  const followers = await followersResponse.json();

  return res.status(200).json({
    followers,
  });
};
