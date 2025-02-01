import { client } from '$lib/supabase';

// const { data: data_archetype, error: error_archetype } = await client
// 	.from('users')
// 	.select('archetype')
// 	.eq('id', user.user?.id);
// if (error_archetype) {
//     console.error('Error fetching user data:', error_archetype);
// }
//
// let archetype = '';
// if (data_archetype) {
//     archetype = data_archetype[0].archetype;
// }

async function fetchLibrary() {
	try {
		let { data: library, error } = await client.from('library').select('*');
		if (error) throw error;

		const groupedLibrary = library?.reduce((acc, item) => {
			if (!acc[item.category]) {
				acc[item.category] = {};
			}
			acc[item.category][item.id] = item;
			return acc;
		}, {});

		return groupedLibrary;
	} catch (err) {
		console.log('error fetching library', err);
		return {};
	}
}
type Note = {
	user_id: string | undefined;
	title: string;
	timestamp: string;
	content: string;
	habit_id: number;
	good: boolean;
	game_num: number;
	tag: string;
	session: number;
	block: number;
};
type Habit = {
	id: number;
	name: string;
	category: string;
};
type HabitCount = {
	id: number;
	name: string;
	category: string;
	goodCount: number;
	badCount: number;
};

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

function accumulateNoteResults(notes, habits: Habit[]) {
	const habitList: Record<string, HabitCount> = {};
	if (notes == null || notes == undefined) return habitList;
	habits.forEach((habit) => {
		habitList[habit.id] = {
			id: habit.id,
			name: habit.name,
			category: habit.category,
			goodCount: 0,
			badCount: 0
		};
	});
	if (notes) {
		notes.forEach((note) => {
			const habitId = note.habit_id;
			const isGood = note.good;
			console.log(isGood);

			if (habitList[habitId]) {
				if (isGood) {
					habitList[habitId].goodCount += 1;
				} else {
					habitList[habitId].badCount += 1;
				}
			}
		});
	}
	console.log(habitList);
	return habitList;
}

async function getHabitMasteries(userId: string | undefined, habit_ids: string[]) {
	if (!userId || !habit_ids || habit_ids.length === 0) return {};

	const { data: mastery, error: masteryError } = await client
		.from('mastery')
		.select('habit_id, lvl, points')
		.eq('user_id', userId) // Ensure we fetch only this user's mastery data
		.in('habit_id', habit_ids); // Filter for specific habit IDs

	if (masteryError) {
		console.error('Error fetching mastery data:', masteryError);
		return {};
	}

	// Convert array to object with habit_id as key
	const masteryMap = mastery.reduce(
		(acc, { habit_id, lvl, points }) => {
			acc[habit_id] = { lvl, points };
			return acc;
		},
		{} as Record<number, { lvl: number; points: number }>
	);

	return masteryMap;
}

async function getUserHabits(userId: String | undefined) {
	if (userId == undefined) {
		return {};
	}
	try {
		// Fetch the user's habits array
		const { data: userData, error: userError } = await client
			.from('users')
			.select('habits')
			.eq('id', userId)
			.single();

		if (userError) throw userError;

		const habitIds = userData.habits || [];
		if (habitIds.length === 0) {
			return []; // No habits found for the user
		}

		const { data: habits, error: habitsError } = await client
			.from('library')
			.select('id, name, category')
			.in('id', habitIds); // gets rows w/ id IN habitsId

		if (habitsError) throw habitsError;

		return habits;
	} catch (error) {
		console.error('Error fetching user habits:', error);
		return null;
	}
}

export async function load() {
	const { data: user } = await client.auth.getUser();

	const { data: curr_session, error: session_error } = await client
		.from('users')
		.select('session')
		.eq('id', user?.user?.id)
		.single();
	const { data: curr_block, error: block_error } = await client
		.from('users')
		.select('block')
		.eq('id', user?.user?.id)
		.single();
	const { data: user_lvl, error: lvl_error } = await client
		.from('users')
		.select('lvl')
		.eq('id', user?.user?.id)
		.single();
	if (session_error || block_error) {
		console.log('session error: ', session_error);
		console.log('block error: ', block_error);
	}

	let { data: session_notes, error: note_error } = await client
		.from('notes')
		.select('*')
		.match({ session: curr_session?.session, block: curr_block?.block });
	let { data: all_notes, error: all_notes_error } = await client.from('notes').select('*');

	if (note_error) {
		console.log('note fetch error: ', note_error);
	}

	let categorized_notes = categorizeNotes(all_notes);
	let habits = accumulateNoteResults(session_notes, await getUserHabits(user?.user?.id));
	let habit_ids = Object.keys(habits);
	let mastery = await getHabitMasteries(user?.user?.id, habit_ids);

	const library = await fetchLibrary();

	let games;
	let num_games;

	if (session_notes && session_notes.length > 0) {
		games = session_notes?.reduce((acc, note) => {
			const gameId = note.game_num || 'no_game';
			if (!acc[gameId]) {
				acc[gameId] = [];
			}
			acc[gameId].push(note);
			return acc;
		}, {});
		num_games = Object.keys(games).length;
	} else {
		games = { '1': [] };
		num_games = 1;
	}

	//return the # of goods and bads per habit
	return {
		user: user.user,
		session_notes: session_notes,
		all_notes: all_notes,
		games: games,
		num_games: num_games,
		habits: habits,
		mastery: mastery,
		session: curr_session?.session,
		block: curr_block?.block,
		library: library,
		categorized_notes: categorized_notes,
		user_lvl: user_lvl?.lvl
	};
}
