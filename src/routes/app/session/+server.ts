import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

// TODO :: Handle user level up at end of sesson. count total number of notes
async function handleSessionEnd(user_id: string, habit_ids: number[]) {
	if (!user_id || !habit_ids || habit_ids.length === 0) {
		return { success: false, error: 'Invalid input' };
	}

	// Fetch mastery data for all provided habit_ids
	const { data: masteryData, error: fetchError } = await client
		.from('mastery')
		.select('habit_id, lvl, points')
		.eq('user_id', user_id)
		.in('habit_id', habit_ids);

	if (fetchError) {
		console.error('Error fetching mastery data:', fetchError);
		return { success: false, error: 'Failed to retrieve mastery data' };
	}

	// Mastery level thresholds
	const masteryLevels = [100, 200, 300, 400, 500, 600, 700]; // Points required per level
	// const userLevels = []

	let leveledUpMastery: Record<number, { lvl: number; points: number }> = {};

	// Process each habit mastery record
	for (let mastery of masteryData) {
		let { habit_id, lvl, points } = mastery;
		let originalLvl = lvl;
		let originalPoints = points;

		// Check if the user can level up
		while (lvl < 7 && points >= masteryLevels[lvl - 1]) {
			points -= masteryLevels[lvl - 1]; // Subtract level-up cost
			lvl++; // Increase mastery level
		}

		// Only include mastery if it changed
		if (lvl !== originalLvl || points !== originalPoints) {
			leveledUpMastery[habit_id] = { lvl, points };
		}
	}

	for (const habit_id in leveledUpMastery) {
		const { lvl, points } = leveledUpMastery[habit_id];

		const { error: updateError } = await client
			.from('mastery')
			.update({ lvl, points })
			.eq('user_id', user_id)
			.eq('habit_id', habit_id);

		if (updateError) {
			console.error(`Error updating mastery record for habit ${habit_id}:`, updateError);
			return { success: false, error: 'Failed to update mastery levels' };
		}
	}
	console.log('leveled up: ', leveledUpMastery);
	console.log('mastery: ', masteryData);

	return {
		success: true,
		leveledUpMastery,
		leveledUp: Object.keys(leveledUpMastery).length > 0
	};
}

async function updateSession(id: string, session: number, block: number) {
	// END OF BLOCK CONDITION. CHECK NUMBER OF NOTES AND USER LEVEL
	if (session === 6) {
		session = 1;
		block = block + 1;
		//if total_notes >= levelup threshold then level up user
		//assign a new habit to the user
	} else {
		session += 1;
	}
	try {
		const { error: updateError } = await client.from('users').update({ session }).eq('id', id);
		const { error: blockError } = await client.from('users').update({ block }).eq('id', id);

		if (updateError) {
			console.log(updateError);
		}
	} catch (error) {
		console.log(error);
	}
	return {
		updatedSession: session,
		updatedBlock: block,
		levelUp: false
	};
}

export const POST: RequestHandler = async ({ request }) => {
	console.log('handling new session');
	const { user_id, session, block, habit_ids } = await request.json();

	const sessionEndResult = await handleSessionEnd(user_id, habit_ids);
	const { updatedSession, updatedBlock, levelUp } = await updateSession(user_id, session, block);

	// CHECK RESPONSE IF LEVEL UP IS TRUE SHOW A NEW WINDOW FOR NEW HABIT
	// SHOW THE DESCRIPTION OF THE HABIT AND SOME EXAMPLES
	return new Response(
		JSON.stringify({
			updatedSession,
			updatedBlock,
			levelUp,
			...sessionEndResult
		}),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
};
