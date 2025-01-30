<script lang="ts">
	import NoteView from '../Note.svelte';
	let props = $props();
	const all_notes = props.categorized_notes;
	let id = $derived(props.selected_habit.id);
	let category = $derived(props.selected_habit.category);
	let habits = props.habits;
	let lvl = $derived(props.mastery[id].lvl);
	let points = $derived(props.mastery[id].points);
	$inspect(lvl);
	$inspect(points);
	let total_goods = $derived(all_notes[id]?.reduce((sum, note) => sum + (note.good ? 1 : 0), 0));
	let total_bads = $derived(all_notes[id]?.reduce((sum, note) => sum + (!note.good ? 1 : 0), 0));
</script>

<div class="flex overflow-hidden flex-col pr-4 space-y-6 w-full hover:overflow-y-auto">
	<div class="flex flex-col space-y-6">
		<text class="mb-2 text-lg text-[#6C6C6C]">{props.library[category][id].description}</text>
		<text class="mb-2 text-xl font-medium text-[#D3D3D3]">Mastery Level {lvl}</text>
		<text class="mb-2 text-xl font-medium text-[#D3D3D3]">{points} Points</text>
		<div class="flex flex-row space-x-6">
			<button class="p-4 py-2 w-1/2 rounded-lg border border-[#202020] bg-[#09090B]">
				<div class="flex items-center w-full">
					<text class="mx-2 font-normal text-md text-[#E2E2E2]">Total Goods</text>
				</div>
				<div class="mt-1 w-full">
					<text class="block mx-2 text-xs font-light text-start text-[#6C6C6C]">{total_goods}</text>
				</div>
			</button>
			<button class="p-4 py-2 w-1/2 rounded-lg border border-[#202020] bg-[#09090B]">
				<div class="flex items-center w-full">
					<text class="mx-2 font-normal text-md text-[#E2E2E2]">Total Bads</text>
				</div>
				<div class="mt-1 w-full">
					<text class="block mx-2 text-xs font-light text-start text-[#6C6C6C]">{total_bads} </text>
				</div>
			</button>
			<button class="p-4 py-2 w-1/2 rounded-lg border border-[#202020] bg-[#09090B]">
				<div class="flex items-center w-full">
					<text class="mx-2 font-normal text-md text-[#E2E2E2]">Total Notes</text>
				</div>
				<div class="mt-1 w-full">
					<text class="block mx-2 text-xs font-light text-start text-[#6C6C6C]">
						{all_notes[id] ? all_notes[id].length : 0}
					</text>
				</div>
			</button>
		</div>
	</div>
	{#each all_notes[id] as note}
		<NoteView {note} {habits} />
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
