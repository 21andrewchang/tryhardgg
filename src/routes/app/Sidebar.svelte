<script lang="ts">
	import { sineInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import pfp from '$lib/images/pfp.svg';
	import { client } from '$lib/supabase';
	import Indicator from './Indicator.svelte';

	let { selected_habit = $bindable(), curr_page = $bindable(), ...props } = $props();

	function handleLogout() {
		client.auth.signOut();
		goto('/');
	}

	// Array of page objects
	const pages = [
		{ displayName: 'Current Session', pageName: 'session' },
		{ displayName: 'Dashboard', pageName: 'dashboard' },
		{ displayName: 'Library', pageName: 'library' },
		{ displayName: 'All Notes', pageName: 'all_notes' },
		{ displayName: 'Player Profile', pageName: 'profile' }
	];
</script>

<div class="flex relative h-screen opacity-100 transition-all ease-in-out hover:opacity-100">
	{#if props.sidebar}
		<div class="p-8 pr-0 h-full" transition:slide={{ axis: 'x', easing: sineInOut, duration: 300 }}>
			<div
				class="flex flex-col justify-between w-44 h-full rounded-xl border transition-all duration-300 ease-in-out border-[#202020] bg-[#09090B]"
			>
				<!-- Sidebar Content -->
				<div>
					<div class="flex flex-row items-center p-3 space-x-2 border-b border-[#202020]">
						<img src={pfp} alt="profile" class="w-5 h-5" />
						<span class="text-xs font-light text-[#D3D3D3]">행복한 돼지</span>
					</div>

					<!-- Pages List -->
					<div class="flex flex-col items-start px-2 pt-2 space-y-1">
						<text class="px-2 pt-2 text-[10px] text-[#6C6C6C]">Navigation</text>
						{#each pages as page}
							{#if props.curr_page === page.pageName}
								<button
									class="flex flex-row items-center py-2 px-2 space-x-2 w-full rounded-md bg-[#202023] hover:bg-[#202023]"
									onclick={() => {
										props.showPage(page.pageName);
									}}
								>
									<text class="text-xs font-medium text-[#FAFAFA]">{page.displayName}</text>
								</button>
							{:else}
								<button
									class="flex flex-row items-center py-2 px-2 space-x-2 w-full rounded-md hover:bg-[#131315]"
									onclick={() => {
										props.showPage(page.pageName);
									}}
								>
									<text class="text-xs text-[#D3D3D3]">{page.displayName}</text>
								</button>
							{/if}
						{/each}
						<text class="px-2 pt-2 text-[10px] text-[#6C6C6C]">Habits</text>
						{#each Object.values(props.habits) as habit}
							{#if selected_habit === habit.name}
								<button
									class="flex flex-row items-center py-2 px-2 space-x-2 w-full rounded-md bg-[#202023] hover:bg-[#202023]"
									onclick={() => {
										props.showPage('habit');
										selected_habit = habit;
									}}
								>
									<Indicator category={habit.category} />
									<text class="text-xs font-medium text-[#FAFAFA]">{habit.name}</text>
								</button>
							{:else}
								<button
									class="flex flex-row items-center py-2 px-2 space-x-2 w-full rounded-md hover:bg-[#131315]"
									onclick={() => {
										props.showPage('habit');
										selected_habit = habit;
									}}
								>
									<Indicator category={habit.category} />
									<text class="text-xs text-[#D3D3D3]">{habit.name}</text>
								</button>
							{/if}
						{/each}
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
