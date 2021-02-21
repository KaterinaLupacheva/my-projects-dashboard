import { NextApiRequest, NextApiResponse } from 'next';

import { IArticle } from '../../types/general';

export default async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  process.env.DEVTO_API_KEY &&
    requestHeaders.set('api-key', process.env.DEVTO_API_KEY);

  const articlesResponse = await fetch('https://dev.to/api/articles/me', {
    headers: requestHeaders,
  });

  const followersResponse = await fetch(
    'https://dev.to/api/followers/users?per_page=300',
    {
      headers: requestHeaders,
    }
  );

  const articles: IArticle[] = await articlesResponse.json();
  const followers = await followersResponse.json();

  return res.status(200).json({
    articles,
    followersCount: followers.length,
  });
};
