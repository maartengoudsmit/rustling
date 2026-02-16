import { redirect } from '@sveltejs/kit';
import { GITHUB_CLIENT_ID } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const state = crypto.randomUUID();
	const params = new URLSearchParams({
		client_id: GITHUB_CLIENT_ID,
		scope: 'repo,user',
		state
	});

	throw redirect(302, `https://github.com/login/oauth/authorize?${params}`);
};
