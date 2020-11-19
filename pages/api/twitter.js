export default async (_, res) => {
  const userResponse = await fetch(
    `https://api.twitter.com/1.1/users/show.json?screen_name=${process.env.TWITTER_USERNAME}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  const tweetsResponse = await fetch(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${process.env.TWITTER_USERNAME}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  const userData = await userResponse.json();
  const tweetsData = await tweetsResponse.json();

  return res.status(200).json({
    userData,
    tweetsData,
  });
};
