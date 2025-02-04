import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

async function createNote(
	id: String,
	title: String,
	timestamp: String,
	content: String,
	habit_id: Number,
	tag: String,
	game_num: Number,
	good: Boolean,
	session: Number,
	block: Number
) {
	try {
		const { error: insertError } = await client.from('notes').insert({
			user_id: id,
			title: title,
			timestamp: timestamp,
			content: content,
			habit_id: habit_id,
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

async function getUpdatedNotes() {
	console.log('getting updated notes after creating note');
	let { data: all_notes, error: all_notes_error } = await client.from('notes').select('*');
	if (all_notes_error) {
		console.log(all_notes_error);
	}
	const updated_categorized_notes = categorizeNotes(all_notes);
	return { updated_all_notes: all_notes, updated_categorized_notes: updated_categorized_notes };
}

function categorizeNotes(notes) {
	if (notes == null || notes == undefined) return [];
	const notes_categorized: Record<string, Note[]> = {};
	notes.forEach((note) => {
		notes_categorized[note.habit_id] = [];
	});
	notes.forEach((note) => {
		notes_categorized[note.habit_id].push(note);
	});
	return notes_categorized;
}

export const POST: RequestHandler = async ({ request }) => {
	const { user_id, title, timestamp, content, habit_id, tag, game_num, good, session, block } =
		await request.json();
	createNote(user_id, title, timestamp, content, habit_id, tag, game_num, good, session, block);
	const result = await getUpdatedNotes();
	console.log('result from udpating all_notes', result);
	return new Response(JSON.stringify(result), {
		headers: { 'Content-Type': 'application/json' }
	});
};
