//initialization of mastery handled at login and acct creation
import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

// get chosen concept from POST request
// update db

type HabitCount = {
	id: number;
	name: string;
	category: string;
	goodCount: number;
	badCount: number;
};

async function updateHabits(
	user_id: String | undefined,
	selected_concept: string,
	curr_habits: Record<string, HabitCount>,
	session: number,
	block: number
) {
	//call to db
	let habit_ids = await getCurrIds(user_id);
	let selected_id = 0;
	if (selected_concept == 'yellow') {
		selected_id = 1;
		habit_ids.push(1);
	} else if (selected_concept == 'blue') {
		selected_id = 3;
		habit_ids.push(3);
	} else if (selected_concept == 'red') {
		selected_id = 4;
		habit_ids.push(4);
	} else if (selected_concept == 'green') {
		selected_id = 18;
		habit_ids.push(18);
	}

	const { error: updateError } = await client
		.from('users')
		.update({ habits: habit_ids })
		.eq('id', user_id);
	if (updateError) {
		console.log('error updating habit_ids', updateError);
		throw updateError;
	}
	let updated_habits = (await prepHabits(user_id, selected_id, curr_habits)) || curr_habits;
	let updated_mastery = await handleHabitMastery(user_id, selected_id, session, block);
	return { updated_habits: updated_habits, updated_mastery: updated_mastery };
}

async function handleHabitMastery(
	user_id: String | undefined,
	habit_id: number,
	session: number,
	block: number
) {
	const new_mastery = {
		user_id: user_id,
		habit_id: habit_id,
		lvl: 1,
		points: 0,
		session: session,
		block: block
	};
	const update = {
		habit_id: habit_id,
		lvl: 1,
		points: 0,
		session: session,
		block: block
	};

	const { error: masteryError } = await client.from('mastery').insert(new_mastery);
	if (masteryError) {
		console.log('error inserting new mastery');
		throw masteryError;
	}
	return update;
}

//probably unnecessary can just use curr_habits. just not sure why keys are strings
async function getCurrIds(userId: String | undefined) {
	if (userId == undefined) {
		return [];
	}
	try {
		const { data: user_habits, error: habit_ids_err } = await client
			.from('users')
			.select('habits')
			.eq('id', userId)
			.single();
		console.log('habit ids from getCurrIds', user_habits);
		if (habit_ids_err) throw habit_ids_err;
		const habit_ids = user_habits.habits || [];
		return habit_ids;
	} catch (error) {
		console.error('Error fetching user habits:', error);
		return null;
	}
}

async function prepHabits(
	userId: String | undefined,
	selected_id: number,
	curr_habits: Record<string, HabitCount>
) {
	if (userId == undefined) {
		return {};
	}
	try {
		const { data: new_habit, error: habitsError } = await client
			.from('library')
			.select('id, name, category')
			.eq('id', selected_id)
			.single();

		if (habitsError) throw habitsError;
		let updated_habits = curr_habits;

		updated_habits[new_habit.id] = {
			id: new_habit.id,
			name: new_habit.name,
			category: new_habit.category,
			goodCount: 0,
			badCount: 0
		};
		return updated_habits;
	} catch (error) {
		console.error('Error fetching user habits:', error);
		return null;
	}
}

export const POST: RequestHandler = async ({ request }) => {
	const { user_id, selected_concept, curr_habits, session, block } = await request.json();
	const result = await updateHabits(user_id, selected_concept, curr_habits, session, block);
	console.log('result should be curr_habits if there is error: ', result);
	//worst case if theres an error, result returns curr_habits

	//result is the new habit list which while replace current habit list on client
	return new Response(JSON.stringify(result), {
		headers: { 'Content-Type': 'application/json' }
	});
};
