import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

console.log('getting user from /home');
const { data: user_data, error: user_error } = await client.auth.getUser();

if (user_error || !user_data.user) {
	console.error('Error fetching user or user not logged in:', user_error);
	// window.location.href = '/login';
}
const user = user_data.user;

const { data: archetype_data, error: archetype_error } = await client
	.from('users')
	.select('archetype')
	.eq('id', user?.id);

if (archetype_error) {
	console.error('Error fetching user data:', archetype_error);
}

console.log('archetype_data: ', archetype_data);

export function load() {
	return {
		user: user,
		archetype: archetype_data
	};
}
