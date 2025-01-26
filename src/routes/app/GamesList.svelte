<script lang="ts">
	import Note from './Note.svelte';
	import { slide, fade } from 'svelte/transition';
	import closed from '$lib/images/closed.svg';
	let props = $props();
	let collapsed = $state([]);
	$inspect('games in gamelist', props.games);
</script>

<text class="mb-2 text-md text-[#D3D3D3]">Session Notes</text>
<div
	class="overflow-y-auto flex-col flex-1 rounded-lg border custom-scrollbar border-[#202020] bg-[#09090B]"
>
	<!-- Notes -->
	{#each Object.entries(props.games) as [num, notes], index}
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
							<Note {note} habits={props.habits} />
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
