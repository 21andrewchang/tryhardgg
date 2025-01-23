<script lang="ts">
	import { sineInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import next from '$lib/images/back.svg';
	import pfp from '$lib/images/pfp.svg';
	import { client } from '$lib/supabase';
	let sidebar = $state(true);

	function handleLogout() {
		client.auth.signOut();
		goto('/');
	}
</script>

<div class="flex relative h-screen opacity-100 transition-all ease-in-out hover:opacity-100">
	<!-- Sidebar Toggle Button -->
	{#if !sidebar}
		<div class="absolute self-center ml-4 w-10 h-10 opacity-100">
			<button onclick={() => (sidebar = true)}>
				<img src={next} alt="next" style="transform: rotate(180deg);" />
			</button>
		</div>
	{/if}

	<!-- Sidebar -->
	{#if sidebar}
		<div class="p-8 pr-0 h-full" transition:slide={{ axis: 'x', easing: sineInOut, duration: 300 }}>
			<div
				class="flex flex-col justify-between w-44 h-full rounded-xl border transition-all duration-300 ease-in-out border-[#202020] bg-black/20"
			>
				<!-- Sidebar Content -->
				<div>
					<div class="flex flex-row items-center p-3 space-x-2 border-b border-[#202020]">
						<img src={pfp} alt="profile" class="w-8 h-8" />
						<span class="text-[#D3D3D3]">행복한 돼지</span>
					</div>
					<div class="flex flex-col items-start p-3 space-y-2">
						<button class="text-xs text-[#4C4C4C]">Dashboard</button>
						<button class="text-xs text-[#4C4C4C]">Player Profile</button>
						<button class="text-xs text-[#4C4C4C]">Library</button>
						<button class="text-xs text-[#4C4C4C]">All Notes</button>
					</div>
				</div>

				<!-- Logout Button -->
				<div class="flex flex-col">
					<button
						onclick={() => (sidebar = false)}
						class="py-3 text-xs text-[#202020]"
						type="submit"
					>
						Hide Sidebar
					</button>
					<button
						onclick={handleLogout}
						class="py-3 text-xs text-red-500 border-t border-[#202020]"
						type="submit"
					>
						Log Out
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
