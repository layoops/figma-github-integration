const GITHUB_API_URL = 'https://api.github.com/graphql';

export const githubGraphqlApi = async ({
  body,
  token,
}: {
  body: any | undefined;
  token: string;
}) => {
  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body,
  });

  return response;
};
