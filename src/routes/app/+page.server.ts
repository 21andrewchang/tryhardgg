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

function accumulateNoteResults(notes, habits) {
	console.log('notes from acc: ', notes);
	console.log('habits from acc: ', habits);
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
	console.log('habitList: ', habitList);

	console.log('notes lenght', notes.length);
	notes.forEach((note) => {
		const habitId = note.habit;
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

		// Fetch the corresponding habits from the library
		const { data: habits, error: habitsError } = await client
			.from('library')
			.select('id, name, category')
			.in('id', habitIds);

		if (habitsError) throw habitsError;

		return habits; // Return the habits with name and category
	} catch (error) {
		console.error('Error fetching user habits:', error);
		return null;
	}
}

//creating days should be handled on page load. no need to be in +server.ts
export async function load() {
	const { data: session } = await client.auth.getSession();
	const { data: user } = await client.auth.getUser();

	const curr_date = new Date().toLocaleDateString('en-CA');
	console.log(curr_date);
	let { data: notes, error: note_error } = await client
		.from('notes')
		.select('*')
		.eq('date', curr_date);
	console.log('fetched notes: ', notes);
	if (note_error) {
		console.log('note fetch error: ', note_error);
	}

	let habits = accumulateNoteResults(notes, await getUserHabits(user?.user?.id));

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
		console.log('this should return');
		games = { '1': [] };
		num_games = 1;
	}
	console.log('games: ', games);
	console.log('habits: ', habits);

	//return the # of goods and bads per habit
	return {
		user: user.user,
		notes: notes,
		games: games,
		num_games: num_games,
		habits: habits,
		session: session
	};
}
