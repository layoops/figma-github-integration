export const githubPatterns = {
  github: /^(https?:\/\/)?(www\.)?github\.com\/.+$/,
  repository: /https:\/\/github\.com\/([^/]+)\/([^/]+)(?:\/([^/]+))?$/,
  issue: /https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)/,
  pullRequest: /https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/,
  project: /https:\/\/github\.com\/(users|orgs)\/([^/]+)\/projects\/(\d+)/,
};
