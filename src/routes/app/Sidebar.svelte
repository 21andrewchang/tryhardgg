<script lang="ts">
	import { sineInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import next from '$lib/images/back.svg';
	import pfp from '$lib/images/pfp.svg';
	import { client } from '$lib/supabase';

	let props = $props();

	function handleLogout() {
		client.auth.signOut();
		goto('/');
	}
</script>

<div class="flex relative h-screen opacity-100 transition-all ease-in-out hover:opacity-100">
	{#if props.sidebar}
		<div class="p-8 pr-0 h-full" transition:slide={{ axis: 'x', easing: sineInOut, duration: 300 }}>
			<div
				class="flex flex-col justify-between w-44 h-full rounded-xl border transition-all duration-300 ease-in-out border-[#202020] bg-[#09090B]"
			>
				<!-- props.sidebar Content -->
				<div>
					<div class="flex flex-row items-center p-3 space-x-2 border-b border-[#202020]">
						<img src={pfp} alt="profile" class="w-5 h-5" />
						<span class="text-xs font-light text-[#D3D3D3]">행복한 돼지</span>
					</div>
					<div class="flex flex-row items-center p-3 space-x-2 border-b border-[#202020]">
						<text class="text-[12px] text-[#D3D3D3]">Session 4</text>
						<text class="text-[12px] text-[#6C6C6C]">Block 1</text>
					</div>
					<div class="flex flex-col items-start p-3 space-y-2">
						<button class="text-[10px] text-[#D3D3D3]">Dashboard</button>
						<button class="text-[10px] text-[#D3D3D3]">Player Profile</button>
						<button class="text-[10px] text-[#D3D3D3]">Library</button>
						<button class="text-[10px] text-[#D3D3D3]">All Notes</button>
					</div>
				</div>

				<!-- Logout Button -->
				<div class="flex flex-col">
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
