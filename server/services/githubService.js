import axios from 'axios';

function extractUsername(githubUrl) {
  if (!githubUrl) return null;
  try {
    const url = githubUrl.startsWith('http') ? githubUrl : `https://${githubUrl}`;
    const parsed = new URL(url);
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts[0] && parts[0].toLowerCase() !== 'github.com') {
      return parts[0];
    }
    return parts[1] || null;
  } catch {
    const match = githubUrl.match(/github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38}[a-zA-Z0-9])?)/i);
    return match ? match[1] : null;
  }
}

export async function enrichWithGitHub(githubUrl) {
  const username = extractUsername(githubUrl);
  if (!username) {
    return { githubProfile: null, githubRepos: [] };
  }

  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const client = axios.create({
    baseURL: 'https://api.github.com',
    headers,
    timeout: 10000,
  });

  try {
    const [userRes, reposRes] = await Promise.all([
      client.get(`/users/${username}`),
      client.get(`/users/${username}/repos`, {
        params: { sort: 'updated', per_page: 12, type: 'owner' },
      }),
    ]);

    const user = userRes.data;
    const repos = Array.isArray(reposRes.data) ? reposRes.data : [];

    const githubProfile = {
      username: user.login,
      name: user.name || user.login,
      bio: user.bio || '',
      avatarUrl: user.avatar_url || '',
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      profileUrl: user.html_url || `https://github.com/${username}`,
    };

    const githubRepos = repos
      .filter((repo) => !repo.fork)
      .slice(0, 12)
      .map((repo) => ({
        name: repo.name,
        description: repo.description || '',
        url: repo.html_url,
        language: repo.language || '',
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
      }));

    return { githubProfile, githubRepos };
  } catch (error) {
    console.warn('GitHub enrichment skipped:', error.message);
    return { githubProfile: null, githubRepos: [] };
  }
}
