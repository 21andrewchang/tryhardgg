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

	let pointsEarned = good ? 4 : Math.max(6 - lvl, -1);

	points += pointsEarned;
	console.log('points: ', points);
	console.log('habit_id: ', habit_id);

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

	let updatedMastery = [];
	let leveledUpHabits = [];

	// Process each habit mastery record
	for (let mastery of masteryData) {
		let { habit_id, lvl, points } = mastery;
		let leveledUp = false;

		// Check if the user can level up
		while (lvl < 7 && points >= masteryLevels[lvl]) {
			points -= masteryLevels[lvl]; // Subtract level-up cost
			lvl++; // Increase mastery level
			leveledUp = true;
		}

		// Store updated mastery data
		updatedMastery.push({ user_id, habit_id, lvl, points });

		// Track habits that leveled up
		if (leveledUp) {
			leveledUpHabits.push({ habit_id, lvl, points });
		}
	}

	// Batch update all mastery records
	const { error: updateError } = await client
		.from('mastery')
		.upsert(updatedMastery, { onConflict: 'user_id, habit_id' });

	if (updateError) {
		console.error('Error updating mastery records:', updateError);
		return { success: false, error: 'Failed to update mastery levels' };
	}

	return {
		success: true,
		updatedMastery,
		leveledUp: leveledUpHabits.length > 0,
		leveledUpHabits
	};
}

export const POST: RequestHandler = async ({ request }) => {
	const { user_id, habit_id, good, endSession } = await request.json();
	if (endSession) {
		const result = await handleSessionEnd(user_id, habit_id);
		return new Response(JSON.stringify(result), {
			headers: { 'Content-Type': 'application/json' }
		});
	} else {
		const result = await handleNewNote(user_id, habit_id, good);
		return new Response(JSON.stringify(result), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
