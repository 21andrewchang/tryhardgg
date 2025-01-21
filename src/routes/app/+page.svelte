<script lang="ts">
	import { goto } from '$app/navigation';
	import { client } from '$lib/supabase';
	import { fade, fly, slide } from 'svelte/transition';
	import BottomButtons from './BottomButtons.svelte';
	import Indicator from './Indicator.svelte';
	import Note from './Note.svelte';
	import NoteEditor from './NoteEditor.svelte';
	const { data } = $props();
	const user_id = data?.user?.id;
	function handleLogout() {
		client.auth.signOut();
		goto('/');
	}

	let editorVisable = $state(false);
	let games = $state(data.games);
	let game_num = $state(data.num_games);
	let collapsed = $state([]);

	let title = $state('');
	let habit = $state();
	let tag = $state();
	let habits = [
		{ name: 'Objective Timers', category: 'red' },
		{ name: 'Man Advantage', category: 'green' },
		{ name: 'Check Map', category: 'blue' }
	];

	function createNote() {
		editorVisable = true;
	}

	function cancel() {
		editorVisable = false;
	}
	function onKeyDown(event: KeyboardEvent) {
		if (!editorVisable) {
			switch (event.key) {
				case 'n':
					createNote();
					event.preventDefault();
					break;
				default:
					break;
			}
			switch (event.key) {
				case 'g':
					nextGame();
					event.preventDefault();
					break;
				default:
					break;
			}
		} else if (editorVisable) {
			switch (event.key) {
				case 'Escape':
					cancel();
					event.preventDefault();
					break;
				default:
					break;
			}
		}
	}

	async function handleNote() {
		const curr_date = new Date().toISOString().split('T')[0];
		console.log('curr date: ', curr_date);
		if (title != '') {
			if (games[game_num]) {
				games[game_num] = [
					...games[game_num],
					{ content: title, habit: habit, tag: tag, game_num: game_num }
				];
			} else {
				games[game_num] = [{ content: title, habit: habit, tag: tag, game_num: game_num }];
			}
			const body = JSON.stringify({
				user_id: user_id,
				content: title,
				habit: habit,
				game_num: game_num,
				tag: tag
			});

			const res = await fetch(`/app`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});
			console.log(res);
			title = '';
			habit = '';
			tag = '';
			editorVisable = false;
		}
	}

	function nextGame() {
		if (games[game_num] && games[game_num].length > 0) {
			// collapsed = Array(game_num).fill(true);
			//need to check if i can go to the next game
			// which means that if i want to go to game 4 game 3 must have notes
			game_num += 1;
			games[game_num] = [];
		}
		editorVisable = true;
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="flex flex-col h-screen">
	<!-- widgets and logout button -->
	<div class="flex flex-row justify-between mt-4">
		<div class="flex flex-row">
			{#each habits as item}
				<button
					class="flex flex-row justify-between items-center p-4 py-2 mx-4 space-x-8 rounded-xl border border-neutral-800 bg-neutral-800/30 text-neutral-200 backdrop-blur-md"
				>
					<div class="flex flex-row items-center">
						<Indicator category={item.category} />
						<span>{item.name}</span>
					</div>
					<span class="text-neutral-500">0</span>
				</button>
			{/each}
		</div>
		<button
			onclick={handleLogout}
			class="self-center py-3 px-10 mx-4 text-red-500 bg-black rounded-lg border border-red-500"
			type="submit"
		>
			Log Out
		</button>
	</div>

	<!-- main note view -->
	<div
		class="flex overflow-hidden relative flex-col flex-1 m-4 rounded-xl border border-neutral-800 bg-neutral-800/30 backdrop-blur-md"
	>
		<h1 class="p-4 w-full text-2xl font-bold border-b border-neutral-800 text-neutral-300">
			Today
		</h1>

		<!-- notes -->
		<div class="overflow-y-auto flex-1">
			{#each Object.entries(games) as [num, notes], index}
				<div class="flex flex-row justify-between py-2 px-4 w-full bg-zinc-800/50 text-neutral-300">
					<div>
						Game {num}
					</div>
					<div class="flex flex-row items-center mx-2 space-x-5">
						<button
							class="flex justify-center items-center w-6 h-6 text-xs font-semibold leading-none text-center rounded-md hover:bg-zinc-800/60"
						>
							+
						</button>
						<button
							class="flex justify-center items-center w-6 h-6 text-xs font-semibold leading-none text-center rounded-md hover:bg-zinc-800/60"
							onclick={() => {
								collapsed[index] = !collapsed[index];
							}}
						>
							c
						</button>
					</div>
				</div>
				{#if !collapsed[index]}
					<div transition:slide>
						{#if notes.length > 0}
							{#each notes as note}
								<Note {note} />
							{/each}
						{:else if notes.length === 0 && !editorVisable}
							<div
								class="flex flex-row justify-center items-center border-b border-neutral-800/80 bg-neutral-950"
								transition:fade
							>
								<div class="flex flex-row items-center ml-2">
									<h1 class="py-3 px-2 mb-0 text-center text-neutral-800">
										There are no notes for Game {num}. Press n to create a new note.
									</h1>
								</div>
							</div>
						{/if}
					</div>
				{/if}
			{/each}

			<div class="h-20"></div>
		</div>

		<!-- buttons -->
		<BottomButtons {createNote} {nextGame} />
	</div>

	<!-- Note Editor Modal -->
	{#if editorVisable}
		<NoteEditor bind:title bind:habit bind:tag bind:game_num {handleNote} {cancel} />
	{/if}
</div>
