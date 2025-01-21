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

//creating days should be handled on page load. no need to be in +server.ts
export async function load() {
	const { data: session } = await client.auth.getSession();
	const { data: user } = await client.auth.getUser();

	const curr_date = new Date().toISOString().split('T')[0];
	let { data: notes, error: note_error } = await client
		.from('notes')
		.select('*')
		.eq('date', curr_date);
	console.log('fetched notes: ', notes);
	if (note_error) {
		console.log('note fetch error: ', note_error);
	}

	let games;
	let num_games;
	console.log(notes.length);

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

	return {
		user: user.user,
		notes: notes,
		games: games,
		num_games: num_games,
		session: session
	};
}
