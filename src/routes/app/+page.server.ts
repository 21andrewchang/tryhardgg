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
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		}, {});

		return groupedLibrary;
	} catch (err) {
		console.log('error fetching library', err);
		return [];
	}
}

function accumulateNoteResults(notes, habits) {
	if (notes == null || notes == undefined) return [];
	const habitList = {};
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
			console.log('habitList habitid', habitList[habitId]);

			if (habitList[habitId]) {
				if (isGood) {
					habitList[habitId].goodCount += 1;
				} else {
					habitList[habitId].badCount += 1;
				}
			}
		});
	}
	return habitList;
}

async function getUserHabits(userId: String | undefined) {
	if (userId == undefined) {
		return [];
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

//creating days should be handled on page load. no need to be in +server.ts
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
	if (session_error || block_error) {
		console.log('session error: ', session_error);
		console.log('block error: ', block_error);
	}

	let { data: notes, error: note_error } = await client
		.from('notes')
		.select('*')
		.match({ session: curr_session?.session, block: curr_block?.block });

	console.log('fetched notes: ', notes);
	if (note_error) {
		console.log('note fetch error: ', note_error);
	}

	let habits = accumulateNoteResults(notes, await getUserHabits(user?.user?.id));
	const library = await fetchLibrary();

	console.log(library);

	let games;
	let num_games;

	if (notes && notes.length > 0) {
		games = notes?.reduce((acc, note) => {
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
		notes: notes,
		games: games,
		num_games: num_games,
		habits: habits,
		session: curr_session?.session,
		block: curr_block?.block,
		library: library
	};
}
