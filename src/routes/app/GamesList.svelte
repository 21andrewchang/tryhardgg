<script lang="ts">
	import Note from './Note.svelte';
	import { slide, fade } from 'svelte/transition';
	import closed from '$lib/images/closed.svg';
	let props = $props();
	let collapsed = $state([]);
</script>

<div class="flex flex-col flex-1 bg-black rounded-xl border border-[#202020]">
	<!-- Notes -->
	<div class="overflow-y-auto flex-1">
		{#each Object.entries(props.games) as [num, notes], index}
			<div class="p-4 border-b border-[#202020]">
				<div class="flex flex-row justify-between w-full">
					<text class="font-medim text-white/80">
						Game {num}
					</text>
					<div class="flex flex-row items-center">
						<button
							class="flex justify-center items-center w-6 h-6 leading-none transition-transform duration-300"
							onclick={() => {
								collapsed[index] = !collapsed[index];
							}}
						>
							<img
								src={closed}
								alt="closed"
								class="w-3 h-3 transition-transform duration-300 transform"
								style="transform: rotate({collapsed[index] ? 0 : -90}deg);"
							/>
						</button>
					</div>
				</div>
				{#if !collapsed[index]}
					<div transition:slide>
						{#if notes.length > 0}
							{#each notes as note}
								<Note {note} />
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
</div>
