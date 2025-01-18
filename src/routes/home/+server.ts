import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

async function createNote(id: String, content: String, habit: Number) {
	try {
		const { error: insertError } = await client
			.from('notes')
			.insert({ user_id: id, content: content, habit: habit });
		if (insertError) {
			console.log(insertError);
		}
	} catch (error) {
		console.log(error);
	}
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { user_id, content, habit } = await request.json();
	createNote(user_id, content, habit);
	return new Response(JSON.stringify({ content }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
