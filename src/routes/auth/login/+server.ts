import { client } from '$lib/supabase';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();

	if (!email || !password) {
		return new Response('Invalid email or password', { status: 400 });
	}

	const { data, error } = await client.auth.signInWithPassword({
		email: email,
		password: password
	});

	const user = data?.user;
	if (data.session) {
		console.log('SETTING SESSION FROM /AUTH/LOGIN');
		client.auth.setSession({
			access_token: data.session?.access_token,
			refresh_token: data.session?.refresh_token
		});
	}

	if (error) {
		console.error('Login error:', error.message);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	} else {
		console.log('Login successful AUTH DATA:', data);
		console.log('HERE THE USER LOGS IN USER SHOULD EXIST');
		return new Response(JSON.stringify({ user }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
