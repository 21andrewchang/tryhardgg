import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

async function publishNewUser(id: string, archetype: string) {
	try {
		// Fetch all habit IDs from the library table
		const { data: habits, error: habitsError } = await client.from('library').select('id'); // Only get habit IDs

		if (habitsError) {
			console.error('Error fetching habits:', habitsError);
			return;
		}

		// Extract habit IDs into an array
		const habitIds = habits.map((habit) => habit.id);

		// Insert new user with all habits
		const { error: insertError } = await client
			.from('users')
			.insert({ id: id, archetype: archetype, session: 1, block: 1, habits: habitIds });

		if (insertError) {
			console.log('User insert error:', insertError);
			return;
		}

		// Initialize mastery table for each habit
		const masteryEntries = habitIds.map((habit_id) => ({
			user_id: id, // Ensure correct user_id field
			habit_id: habit_id,
			lvl: 1,
			points: 0
		}));

		// Insert all mastery entries
		const { error: masteryError } = await client.from('mastery').insert(masteryEntries);

		if (masteryError) {
			console.log('Mastery insert error:', masteryError);
		} else {
			console.log('Mastery records successfully created for user:', id);
		}
	} catch (error) {
		console.log('Error in publishNewUser:', error);
	}
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	const archetype = cookies.get('archetype');
	const { email, password } = await request.json();

	if (!email || !password) {
		return new Response('Invalid email or password', { status: 400 });
	}

	const { data, error } = await client.auth.signUp({
		email: email,
		password: password
	});

	const user = data?.user;
	if (error) {
		console.error('Signup error:', error.message);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	} else {
		console.log('Created new user: ', user);
		if (user && archetype) {
			await publishNewUser(user.id, archetype);
		}
		return new Response(JSON.stringify({ user }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
