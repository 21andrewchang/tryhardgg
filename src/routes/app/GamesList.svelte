<script lang="ts">
	import NoteView from './Note.svelte';
	import { slide, fade } from 'svelte/transition';
	import closed from '$lib/images/closed.svg';

	type Note = {
		user_id: string | undefined;
		content: string;
		habit_id: number;
		good: boolean;
		game_num: number;
		tag: string;
		session: number;
		block: number;
	};
	type Games = {
		[key: string]: Note[];
	};
	let props = $props();
	let games: Games = props.games;

	let collapsed: Boolean[] = $state([]);
</script>

<text class="mb-2 text-md text-[#D3D3D3]">Session Notes</text>
<div
	class="overflow-y-auto flex-col flex-1 rounded-lg border custom-scrollbar border-[#202020] bg-[#09090B]"
>
	<!-- Notes -->
	{#each Object.entries(games) as [num, notes], index}
		<div class="p-4 border-b border-[#202020]">
			<button
				class="flex flex-row justify-between items-center w-full"
				onclick={() => {
					collapsed[index] = !collapsed[index];
				}}
			>
				<text class="font-medium text-[#D3D3D3]">
					Game {num}
				</text>
				<div class="flex flex-row items-center">
					<div
						class="flex justify-center items-center w-6 h-6 leading-none transition-transform duration-300"
					>
						<img
							src={closed}
							alt="closed"
							class="w-3 h-3 transition-transform duration-300 transform"
							style="transform: rotate({collapsed[index] ? 0 : -90}deg);"
						/>
					</div>
				</div>
			</button>
			{#if !collapsed[index]}
				<div transition:slide class="mt-3">
					{#if notes.length > 0}
						{#each notes as note}
							<NoteView {note} habits={props.habits} />
						{/each}
					{:else if notes.length === 0}
						<div class="flex flex-row justify-center items-center" transition:fade>
							<div class="flex flex-row items-center ml-2">
								<h1 class="py-3 px-2 mb-0 text-xs text-center text-neutral-800">
									There are no notes for Game {num}. Press n to create a new note.
								</h1>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{/each}

	<div class="h-20"></div>
</div>

<style>
	/* Custom Scrollbar */
	::-webkit-scrollbar {
		width: 1px;
	}
	::-webkit-scrollbar-track {
		margin: 30px;
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
