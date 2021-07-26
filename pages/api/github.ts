import { NextApiRequest, NextApiResponse } from 'next';
import { IGithubUser, IRepo } from '../../types/general';

type APIGithub = {
  user: Omit<IGithubUser, 'totalStarsAndForks'>;
  repos: IRepo;
};

export async function queryGithub(): Promise<APIGithub> {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Accept', 'application/vnd.github.v3+json');
  process.env.GITHUB_PERSONAL_TOKEN &&
    requestHeaders.set(
      'Authorization',
      `token ${process.env.GITHUB_PERSONAL_TOKEN}`
    );

  const userResponse = await fetch('https://api.github.com/user', {
    headers: requestHeaders,
  });

  const reposResponse = await fetch(
    'https://api.github.com/user/repos?per_page=100',
    {
      headers: requestHeaders,
    }
  );

  const user = await userResponse.json();
  const repos = await reposResponse.json();

  return { user, repos };
}

export default async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { user, repos } = await queryGithub();

  return res.status(200).json({
    user,
    repos,
  });
};
