import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

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
	if (error) {
		console.error('Login error:', error.message);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	} else {
		console.log('Login successful:', user);
		return new Response(JSON.stringify({ user }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
