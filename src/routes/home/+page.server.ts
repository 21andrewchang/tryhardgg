import { client } from '$lib/supabase';

export async function load({ cookies }) {
	const { data: session } = await client.auth.getSession();
	console.log('IF THERE IS A SESSION IT SHOULD BE HERE: ', session);

	const { data: user } = await client.auth.getUser();
	console.log('WE GOT THE USER: ', user);
	const { data: data_archetype, error: error_archetype } = await client
		.from('users')
		.select('archetype')
		.eq('id', user.user?.id);

	let { data: notes, error } = await client.from('notes').select('*');

	if (error_archetype) {
		console.error('Error fetching user data:', error_archetype);
	}

	let archetype = '';
	if (data_archetype) {
		archetype = data_archetype[0].archetype;
	}
	return {
		user: user.user,
		notes: notes,
		session: session,
		archetype: archetype
	};
}
