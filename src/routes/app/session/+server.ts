import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

// TODO :: Handle user level up at end of sesson. count total number of notes
async function handleMastery(user_id: string, habit_ids: number[]) {
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
	// const masteryLevels = [50, 50, 50, 50, 50, 50, 50];
	const masteryLevels = [100, 200, 300, 400, 500, 600, 700];

	let leveledUpMastery: Record<number, { lvl: number; points: number }> = {};

	// Process each habit mastery record
	for (let mastery of masteryData) {
		let { habit_id, lvl, points } = mastery;
		let originalLvl = lvl;
		let originalPoints = points;

		// Check if the user can level up
		while (lvl < 7 && points >= masteryLevels[lvl - 1]) {
			console.log('curr points: ', points);
			console.log('point threshold: ', masteryLevels[lvl - 1]);
			points -= masteryLevels[lvl - 1];
			lvl++;
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

	return {
		success: true,
		leveledUpMastery,
		leveledUp: Object.keys(leveledUpMastery).length > 0
	};
}

async function handleBlockEnd(total_notes: number, user_lvl: number) {
	console.log('session 6 finished end block here');
	console.log('check total notes taken and level up user if needed');
	const level = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
	let levelUp = false;
	const thresholds = [100, 300, 500, 750, 1000];
	// const thresholds = [10, 20, 30, 40, 50]; //test thresholds
	if (total_notes >= thresholds[user_lvl]) {
		user_lvl += 1;
		levelUp = true;
	}

	return { user_lvl, levelUp: levelUp };
}

async function updateSession(
	id: string,
	session: number,
	block: number,
	user_lvl: number,
	total_notes: number
) {
	// END OF BLOCK CONDITION. CHECK NUMBER OF NOTES AND USER LEVEL
	let levelUp = false;
	if (session === 6) {
		console.log('total # notes: ', total_notes);
		console.log('user_lvl from updateSession', user_lvl);
		const result = await handleBlockEnd(total_notes, user_lvl);
		user_lvl = result.user_lvl;
		levelUp = result.levelUp;
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
		const { error: userlvlError } = await client
			.from('users')
			.update({ lvl: user_lvl })
			.eq('id', id);

		if (updateError) {
			console.log(updateError);
		}
	} catch (error) {
		console.log(error);
	}
	return {
		updatedSession: session,
		updatedBlock: block,
		levelUp: levelUp,
		updatedUser_lvl: user_lvl
	};
}

export const POST: RequestHandler = async ({ request }) => {
	console.log('handling new session');
	const { user_id, session, block, habit_ids, user_lvl, total_notes } = await request.json();

	const sessionEndResult = await handleMastery(user_id, habit_ids);
	const { updatedSession, updatedBlock, levelUp, updatedUser_lvl } = await updateSession(
		user_id,
		session,
		block,
		user_lvl,
		total_notes
	);

	// CHECK RESPONSE IF LEVEL UP IS TRUE SHOW A NEW WINDOW FOR NEW HABIT
	// SHOW THE DESCRIPTION OF THE HABIT AND SOME EXAMPLES
	return new Response(
		JSON.stringify({
			updatedSession,
			updatedBlock,
			levelUp,
			updatedUser_lvl,
			...sessionEndResult
		}),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
};
