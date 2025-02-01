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

	let habit_widgets: HabitCount[] = Object.values(props.habits);

	// Unlock thresholds for the additional widgets
	const unlockThresholds = [100, 300, 500];

	// Ensure there are always 4 widgets, adding placeholders if needed
	while (habit_widgets.length < 4) {
		const index = habit_widgets.length;
		habit_widgets.push({
			id: -1,
			name: '',
			category: '',
			goodCount: 0,
			badCount: 0,
			unlockAt: unlockThresholds[index - 1] ?? 0 // Assign unlock threshold (null for first one)
		});
	}

	let total_notes = props.total_notes ?? 0; // Ensure total_notes is defined
</script>

<!-- Widgets and Unlock Messages -->
<div class="flex flex-col mb-4">
	<text class="mb-1 text-sm text-[#6C6C6C]">Block Focuses</text>
	<div class="flex flex-row justify-between space-x-4 w-full">
		{#each habit_widgets.slice(0, 4) as item, index}
			<button
				class="flex flex-grow items-center justify-between space-x-4 rounded-lg border border-[#202020] bg-[#09090B] p-4 py-2 {item.id ===
				-1
					? 'border-dashed '
					: ''}"
			>
				<div class="flex flex-row items-center">
					{#if item.id !== -1}
						<Indicator category={item.category} />
						<span class="mx-2 text-xs font-light text-[#E2E2E2]">{item.name}</span>
					{:else if total_notes < (item.unlockAt ?? 0)}
						<span class="mx-2 text-xs font-light opacity-30 text-[#6C6C6C]">
							Unlocks at {item.unlockAt} Notes
						</span>
					{:else}
						<span class="mx-2 text-xs font-light text-[#E2E2E2]">Unlocked</span>
					{/if}
				</div>
				<!-- Good and Bad Count -->
				{#if item.id !== -1}
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
				{/if}
			</button>
		{/each}
	</div>
</div>
