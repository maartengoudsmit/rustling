import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		return new Response('Missing code parameter', { status: 400 });
	}

	const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			client_id: GITHUB_CLIENT_ID,
			client_secret: GITHUB_CLIENT_SECRET,
			code
		})
	});

	const data = await tokenResponse.json();

	if (data.error) {
		return new Response(renderMessage('error', data.error_description || data.error), {
			headers: { 'Content-Type': 'text/html' }
		});
	}

	const message = JSON.stringify({ token: data.access_token, provider: 'github' });

	return new Response(renderMessage('success', message), {
		headers: { 'Content-Type': 'text/html' }
	});
};

function renderMessage(status: 'success' | 'error', content: string): string {
	const escaped = JSON.stringify(`authorization:github:${status}:${content}`);
	return `<!DOCTYPE html>
<html>
<body>
<script>
(function() {
  if (window.opener) {
    window.opener.postMessage(${escaped}, "*");
    window.close();
  }
})();
</script>
</body>
</html>`;
}
