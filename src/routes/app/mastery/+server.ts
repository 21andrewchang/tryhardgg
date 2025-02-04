//initialization of mastery handled at login and acct creation
import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

async function handleNewNote(user_id: string, habit_id: number, good: boolean) {
	const { data, error } = await client
		.from('mastery')
		.select('lvl, points')
		.eq('user_id', user_id)
		.eq('habit_id', habit_id)
		.single();

	if (error || !data) {
		console.error('Error fetching mastery points:', error);
		return { success: false, error: 'Mastery data not found' };
	}

	let { lvl, points } = data;
	console.log('lvl: ', lvl);

	//thumbs up gets 10 points
	//thumbs down gets -1 to 6 points
	let pointsEarned = good ? 10 : Math.max(6 - lvl, -1);

	points += pointsEarned;

	const { error: updateError } = await client
		.from('mastery')
		.update({ points: points })
		.eq('user_id', user_id)
		.eq('habit_id', habit_id);

	if (updateError) {
		console.error('Error updating mastery points:', updateError);
		return { success: false, error: 'Failed to update mastery points' };
	} else {
		console.log('no update error');
	}

	return { success: true, points };
}

export const POST: RequestHandler = async ({ request }) => {
	const { user_id, habit_id, good, endSession } = await request.json();
	// if (endSession) {
	//       const result = "hello"
	//         return new Response(JSON.stringify(result), {
	//          headers: { 'Content-Type': 'application/json' }
	//         });
	//      console.log('end session isnt used');
	// } else {
	const result = await handleNewNote(user_id, habit_id, good);
	return new Response(JSON.stringify(result), {
		headers: { 'Content-Type': 'application/json' }
	});
};
