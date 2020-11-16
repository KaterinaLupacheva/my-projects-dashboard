export default async (req, res) => {
  const {
    query: { param },
  } = req;

  const packageName = param.toString().replace(",", "/");

  const response = await fetch(
    `https://api.npmjs.org/downloads/range/last-month/${packageName}`
  );

  const weeklyDownloadsResponse = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${packageName}`
  );

  const lastMonthDownloads = await response.json();
  const weeklyDownloads = await weeklyDownloadsResponse.json();

  return res.status(200).json({
    lastMonthDownloads,
    weeklyDownloads,
  });
};
