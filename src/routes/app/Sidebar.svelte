<script lang="ts">
	import { sineInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
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
					<button
						class="flex flex-row items-center py-3 px-4 space-x-2 w-full border-b border-[#202020] hover:bg-[#202020]"
						onclick={() => props.showPage('session')}
					>
						<text class="text-xs text-[#D3D3D3]">Session {props.session}</text>
						<text class="text-xs text-[#6C6C6C]">Block {props.block}</text>
					</button>
					<div class="flex flex-col items-start p-2 space-y-1">
						<button
							class="p-2 w-full text-xs rounded-md text-start text-[#D3D3D3] hover:bg-[#202020]"
							onclick={() => props.showPage('dashboard')}>Dashboard</button
						>
						<button
							class="p-2 w-full text-xs rounded-md text-start text-[#D3D3D3] hover:bg-[#202020]"
							onclick={() => props.showPage('library')}>Library</button
						>
						<button
							class="p-2 w-full text-xs rounded-md text-start text-[#D3D3D3] hover:bg-[#202020]"
							onclick={() => props.showPage('all_notes')}>All Notes</button
						>
						<button
							class="p-2 w-full text-xs rounded-md text-start text-[#D3D3D3] hover:bg-[#202020]"
							onclick={() => props.showPage('player_profile')}>Player Profile</button
						>
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
