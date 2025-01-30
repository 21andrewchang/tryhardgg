<script lang="ts">
	let props = $props();
	import back from '$lib/images/back.svg';
	import next from '$lib/images/next.svg';
	import { fade, fly, slide } from 'svelte/transition';
	import sidebar from '$lib/images/sidebar.svg';
	import Indicator from './Indicator.svelte';

	let sessions = [0, 0, 0, 0, 0, 0];
</script>

<div class="flex mb-4 space-x-4">
	<button onclick={props.sidebarT}>
		<div
			class="flex justify-between items-center py-4 px-4 rounded-xl border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#D3D3D3] hover:bg-[#202022]"
		>
			<img src={sidebar} alt="sidebar" class="w-3 h-3" />
		</div>
	</button>
	<div
		class="flex flex-grow justify-between items-center px-4 text-lg font-bold rounded-xl border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#FAFAFA]"
	>
		{#if props.curr_page == 'session'}
			<div in:fly={{ duration: 300, x: -20 }}>
				<text class="py-2 mx-1">Session {props.session}</text>
				<text class="py-2 mx-2 font-medium text-[#6C6C6C]">Block {props.block}</text>
			</div>
		{:else if props.curr_page == 'dashboard'}
			<div in:fly={{ duration: 300, x: -20 }}>
				<text class="py-2 mx-1">Dashboard</text>
			</div>
		{:else if props.curr_page == 'library'}
			<div in:fly={{ duration: 300, x: -20 }}>
				<text class="py-2 mx-1">Library</text>
			</div>
		{:else if props.curr_page == 'all_notes'}
			<div in:fly={{ duration: 300, x: -20 }}>
				<text class="py-2 mx-1">All Notes</text>
			</div>
		{:else if props.curr_page == 'player_profile'}
			<div in:fly={{ duration: 300, x: -20 }}>
				<text class="py-2 mx-1">Player Profile</text>
			</div>
		{:else if props.curr_page == 'habit'}
			<div in:fly={{ duration: 300, x: -20 }} class="flex flex-row items-center space-x-2">
				<Indicator category={props.selected_habit.category} />
				<text class="py-2 mx-1">{props.selected_habit.name}</text>
			</div>
		{/if}
		<!-- Square Indicators -->
		{#if props.curr_page == 'session'}
			<div class="flex space-x-2" transition:fade={{ duration: 100 }}>
				{#each [1, 2, 3, 4, 5, 6] as num, index}
					{#if num == props.session}
						<div class="w-4 h-4 rounded-sm bg-[#FAFAFA]"></div>
					{:else if num < props.session}
						<div class="w-4 h-4 rounded-sm bg-[#9C9C9C]"></div>
					{:else if num > props.session}
						<div class="w-4 h-4 rounded-sm bg-[#131315]"></div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	<div
		class="flex justify-between items-center px-3 space-x-10 text-lg rounded-xl border duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#D3D3D3]"
	>
		<button><img src={back} alt="back" class="h-[10px] w-[10px]" /></button>
		<button><img src={next} alt="next" class="h-[10px] w-[10px]" /></button>
	</div>
</div>
