<script lang="ts">
	import NoteView from '../Note.svelte';
	let { habits, ...props } = $props();
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

<div class="overflow-y-auto flex-col flex-1 pr-4 space-y-4">
	<text class="mb-2 text-xl font-medium text-[#D3D3D3]"
		>Total Notes Taken: {props.all_notes.length}</text
	>
	{#each props.all_notes as note}
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
</style>
