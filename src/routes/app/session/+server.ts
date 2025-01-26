import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

async function updateSession(id: String, session: Number) {
	console.log('update session', id, session);
	try {
		const { error: updateError } = await client
			.from('users')
			.update({ session: session })
			.eq('id', id);

		if (updateError) {
			console.log(updateError);
		}
	} catch (error) {
		console.log(error);
	}
}

export const POST: RequestHandler = async ({ request }) => {
	console.log('handling new session');
	const { user_id, session } = await request.json();
	updateSession(user_id, session);
	return new Response(JSON.stringify({ session }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
