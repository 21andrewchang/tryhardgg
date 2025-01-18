import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

async function publishArchetype(id: String, archetype: String) {
	try {
		const { error: insertError } = await client
			.from('users')
			.insert({ id: id, archetype: archetype });
		if (insertError) {
			console.log(insertError);
		}
	} catch (error) {
		console.log(error);
	}
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	const archetype = cookies.get('archetype');
	const { email, password } = await request.json();

	if (!email || !password) {
		return new Response('Invalid email or password', { status: 400 });
	}

	const { data, error } = await client.auth.signUp({
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
		console.log('Created new user: ', user);
		if (user && archetype) {
			publishArchetype(user.id, archetype);
		}
		return new Response(JSON.stringify({ user }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
