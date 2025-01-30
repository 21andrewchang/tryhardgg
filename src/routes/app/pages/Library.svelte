<script lang="ts">
	import Indicator from '../Indicator.svelte';
	let props = $props();
	type Habit = {
		id: number;
		name: string;
		category: string;
		description: string;
	};

	type Library = Record<string, Habit[]>;

	const categories = [
		{ name: 'Decisions', color: 'yellow' },
		{ name: 'Fighting', color: 'red' },
		{ name: 'Information', color: 'blue' },
		{ name: 'Strength', color: 'green' }
	];
	const library: Library = props.library;
</script>

<div class="flex overflow-hidden flex-col pr-4 space-y-4 w-full hover:overflow-y-auto">
	{#each categories as category}
		<div class="flex flex-col items-start">
			<text class="mb-2 text-md text-[#D3D3D3]">{category.name}</text>
			<!-- Grid Container -->
			<div class="grid grid-cols-2 gap-4 w-full">
				{#each Object.values(library[category.color]) as habit}
					<button
						class="flex flex-col flex-grow p-4 py-2 rounded-lg border border-[#202020] bg-[#09090B]"
					>
						<div class="flex items-center w-full">
							<Indicator category={habit.category} />
							<text class="mx-2 font-normal text-md text-[#E2E2E2]">{habit.name}</text>
						</div>
						<div class="mt-1 w-full">
							<text class="block text-xs font-light text-start text-[#6C6C6C]"
								>{habit.description}</text
							>
						</div>
					</button>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	/* Custom Scrollbar */
	::-webkit-scrollbar {
		width: 1px;
	}
	::-webkit-scrollbar-track {
		background: #202020;
		margin: 40px 0; /* Add margin to shorten the scrollbar */
	}
	::-webkit-scrollbar-thumb {
		background: #606060;
		transition: opacity 0.2s ease-in-out;
		opacity: 0;
	}
	/* Show scrollbar on hover */
	div:hover ::-webkit-scrollbar-thumb {
		opacity: 1;
	}
</style>
