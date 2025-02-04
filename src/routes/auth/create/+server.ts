import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

async function publishNewUser(id: string, archetype) {
	try {
		// Fetch all habit IDs from the library table
		const { data: habits, error: habitsError } = await client.from('library').select('id'); // Only get habit IDs

		if (habitsError) {
			console.error('Error fetching habits:', habitsError);
			return;
		}

		// Extract habit IDs into an array
		const habitIds = habits.map((habit) => habit.id);

		// NEW USER SHOULD ONLY HAVE ONE HABIT BASED ON THEIR ARCHEYTPE CATEGORY
		// i.e. red, green, blue, yellow
		//
		// Insert new user with all habits
		let first_habit = [];
		console.log('archetype: ', archetype);
		console.log('color: ', archetype.color);
		if (archetype.color == 'yellow') {
			first_habit.push(1);
		} else if (archetype.color == 'blue') {
			first_habit.push(3);
		} else if (archetype.color == 'red') {
			first_habit.push(4);
		} else if (archetype.color == 'green') {
			first_habit.push(18);
		}

		const { error: insertError } = await client
			.from('users')
			.insert({ id: id, archetype: archetype, session: 1, block: 1, habits: first_habit });

		if (insertError) {
			console.log('User insert error:', insertError);
			return;
		}

		// Initialize mastery table for each habit
		// This could possibly be a rly rly bad idea if theres a lot of new users
		// should probably only initialize mastery for a habit when you actually choose it
		const new_mastery = {
			user_id: id, // Ensure correct user_id field
			habit_id: first_habit[0],
			lvl: 1,
			points: 0,
			session: 1,
			block: 1
		};

		// Insert all mastery entries
		const { error: masteryError } = await client.from('mastery').insert(new_mastery);

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
	const archetypeCookie = cookies.get('archetype');
	const archetype = archetypeCookie ? JSON.parse(archetypeCookie) : null;
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
