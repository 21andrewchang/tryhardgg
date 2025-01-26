<script lang="ts">
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Indicator from './Indicator.svelte';
	import thumb from '$lib/images/thumb.svg';
	let props = $props();
	type HabitCount = {
		id: number;
		name: string;
		category: string;
		goodCount: number;
		badCount: number;
	};
	let habit_widgets: HabitCount[] = Object.values(props.habits);
</script>

<!-- Widgets and Logout Button -->
<div class="flex flex-col mb-4">
	<text class="mb-2 text-md text-[#D3D3D3]">Block Focuses</text>
	<div class="flex flex-row justify-between space-x-4 w-full">
		{#each habit_widgets as item}
			<button
				class="flex flex-grow justify-between items-center p-4 py-2 space-x-4 rounded-lg border border-[#202020] bg-[#09090B]"
			>
				<div class="flex flex-row items-center">
					<Indicator category={item.category} />
					<span class="mx-2 text-xs font-light text-[#E2E2E2]">{item.name}</span>
				</div>
				<!-- good and bad count -->
				<div class="flex flex-row items-center space-x-4">
					{#if item.goodCount > 0}
						<div class="flex flex-row items-center space-x-1">
							<img
								src={thumb}
								alt="thumb"
								class="transition-transform duration-300 transform h-[10px] w-[10px]"
								style="transform: rotate(0deg);"
							/>
							<span class="font-light text-[10px] text-[#E2E2E2]">{item.goodCount}</span>
						</div>
					{/if}
					{#if item.badCount > 0}
						<div class="flex flex-row items-center space-x-1">
							<img
								src={thumb}
								alt="thumb"
								class="transition-transform duration-300 transform h-[10px] w-[10px]"
								style="transform: rotate(180deg);"
							/>
							<span class="font-light text-[10px] text-[#E2E2E2]">{item.badCount}</span>
						</div>
					{/if}
				</div>
			</button>
		{/each}
	</div>
</div>
