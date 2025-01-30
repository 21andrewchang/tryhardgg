import { client } from '$lib/supabase';
import type { RequestHandler } from './$types';

async function populateMasteryForUser(user_id: string) {
	try {
		// Fetch all habit IDs from the library table
		const { data: habits, error: habitsError } = await client.from('library').select('id'); // Get all habit IDs

		if (habitsError) {
			console.error('Error fetching habits:', habitsError);
			return;
		}

		// Extract habit IDs
		const habitIds = habits.map((habit) => habit.id);

		// Check if the user already has mastery records
		const { data: masteryData, error: masteryError } = await client
			.from('mastery')
			.select('habit_id')
			.eq('user_id', user_id);

		if (masteryError) {
			console.error('Error fetching mastery records:', masteryError);
			return;
		}

		// Find habits that are missing from mastery
		const existingHabitIds = masteryData.map((record) => record.habit_id);
		const missingHabits = habitIds.filter((habit_id) => !existingHabitIds.includes(habit_id));

		// Insert missing mastery records
		if (missingHabits.length > 0) {
			const masteryEntries = missingHabits.map((habit_id) => ({
				user_id: user_id,
				habit_id: habit_id,
				lvl: 1,
				points: 0
			}));

			const { error: insertError } = await client.from('mastery').insert(masteryEntries);
			if (insertError) {
				console.error('Error inserting missing mastery records:', insertError);
			} else {
				console.log(`Added missing mastery records for user ${user_id}`);
			}
		} else {
			console.log(`User ${user_id} already has all mastery records.`);
		}
	} catch (error) {
		console.error('Error populating mastery:', error);
	}
}

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();

	if (!email || !password) {
		return new Response('Invalid email or password', { status: 400 });
	}

	const { data, error } = await client.auth.signInWithPassword({
		email: email,
		password: password
	});

	const user = data?.user;
	if (data.session) {
		console.log('SETTING SESSION FROM /AUTH/LOGIN');
		client.auth.setSession({
			access_token: data.session?.access_token,
			refresh_token: data.session?.refresh_token
		});
	}

	if (error) {
		console.error('Login error:', error.message);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	} else {
		console.log('Login successful, checking mastery records...');

		// Ensure mastery records exist for the user
		if (user?.id) {
			await populateMasteryForUser(user.id);
		}

		return new Response(JSON.stringify({ user }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
