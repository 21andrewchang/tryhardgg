<script lang="ts">
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { createClient } from '@supabase/supabase-js';
	const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
	const { data } = $props();
	function handleLogout() {
		client.auth.signOut();
		goto('/');
	}
</script>

<div class="flex flex-col"></div>
<p>{data.archetype}</p>
<button
	onclick={handleLogout}
	class="py-3 px-10 my-4 text-red-500 bg-black rounded border border-red-500"
	type="submit"
>
	Log Out
</button>
