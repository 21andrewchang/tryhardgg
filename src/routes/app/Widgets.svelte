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
		unlockAt: number;
	};

	let habits: HabitCount[] = $derived(Object.values(props.habits));
	$inspect(habits);

	// Unlock thresholds for the additional widgets
	const unlockThresholds = [100, 300, 500];
	const levels = ['Beginner', 'Novice', 'Intermediate', 'Advanced'];
	const indeces = [0, 1, 2, 3];

	// // Ensure there are always 4 widgets, adding placeholders if needed
	// while (habit_widgets.length < 4) {
	// 	const index = habit_widgets.length;
	// 	habit_widgets.push({
	// 		id: -1,
	// 		name: '',
	// 		category: '',
	// 		goodCount: 0,
	// 		badCount: 0,
	// 		unlockAt: unlockThresholds[index - 1] ?? 0 // Assign unlock threshold (null for first one)
	// 	});
	// }
	//
</script>

<!-- Widgets and Unlock Messages -->
<div class="flex flex-col mb-4">
	<text class="mb-1 text-sm text-[#6C6C6C]">Block Focuses</text>
	<div class="flex flex-row justify-between space-x-4 w-full">
		{#each indeces as index}
			<button
				class="flex flex-grow items-center justify-between space-x-4 rounded-lg border border-[#202020] bg-[#09090B] p-4 py-2 {habits[
					index
				]
					? ''
					: 'border-dashed '}"
			>
				<div class="flex flex-row items-center">
					{#if habits[index]}
						<Indicator category={habits[index].category} />
						<span class="mx-2 text-xs font-light text-[#E2E2E2]">{habits[index].name}</span>
					{:else if props.user_lvl < index}
						<span class="mx-2 text-xs font-light opacity-30 text-[#6C6C6C]">
							Unlocks at {levels[index]}
						</span>
					{:else}
						<span class="mx-2 text-xs font-light text-[#E2E2E2]">Unlocked</span>
					{/if}
				</div>
				<!-- Good and Bad Count -->
				{#if habits[index]}
					<div class="flex flex-row items-center space-x-4">
						{#if habits[index].goodCount > 0}
							<div class="flex flex-row items-center space-x-1">
								<img
									src={thumb}
									alt="thumb"
									class="transition-transform duration-300 transform h-[10px] w-[10px]"
									style="transform: rotate(0deg);"
								/>
								<span class="font-light text-[10px] text-[#E2E2E2]">{habits[index].goodCount}</span>
							</div>
						{/if}
						{#if habits[index].badCount > 0}
							<div class="flex flex-row items-center space-x-1">
								<img
									src={thumb}
									alt="thumb"
									class="transition-transform duration-300 transform h-[10px] w-[10px]"
									style="transform: rotate(180deg);"
								/>
								<span class="font-light text-[10px] text-[#E2E2E2]">{habits[index].badCount}</span>
							</div>
						{/if}
					</div>
				{/if}
			</button>
		{/each}
	</div>
</div>
