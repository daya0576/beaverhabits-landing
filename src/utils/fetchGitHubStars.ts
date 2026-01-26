const GITHUB_REPO = 'daya0576/beaverhabits';

const formatHeaders = () => {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
	};

	const token = import.meta.env.PUBLIC_GITHUB_TOKEN ?? process.env.PUBLIC_GITHUB_TOKEN;
	if (token) {
		headers.Authorization = `token ${token}`;
	}

	return headers;
};

export const fetchGitHubStars = async (): Promise<number | undefined> => {
	try {
		const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
			headers: formatHeaders(),
		});

		if (!response.ok) {
			return undefined;
		}

		const data = (await response.json()) as { stargazers_count?: number };
		return typeof data.stargazers_count === 'number' ? data.stargazers_count : undefined;
	} catch (error) {
		return undefined;
	}
};
