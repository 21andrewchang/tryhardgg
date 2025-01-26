import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

async function createNote(
	id: String,
	content: String,
	habit: Number,
	tag: String,
	game_num: Number,
	good: Boolean,
	session: Number,
	block: Number
) {
	try {
		const { error: insertError } = await client.from('notes').insert({
			user_id: id,
			content: content,
			habit: habit,
			tag: tag,
			game_num: game_num,
			good: good,
			session: session,
			block: block
		});
		if (insertError) {
			console.log(insertError);
		}
	} catch (error) {
		console.log(error);
	}
}

export const POST: RequestHandler = async ({ request }) => {
	const { user_id, content, habit, tag, game_num, good, session, block } = await request.json();
	createNote(user_id, content, habit, tag, game_num, good, session, block);
	return new Response(JSON.stringify({ content }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
