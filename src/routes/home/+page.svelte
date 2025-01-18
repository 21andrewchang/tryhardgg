<script lang="ts">
	import { goto } from '$app/navigation';
	import { client } from '$lib/supabase';
	import Note from './Note.svelte';
	import NoteEditor from './NoteEditor.svelte';
	const { data } = $props();
	const user_id = data?.user?.id;
	function handleLogout() {
		client.auth.signOut();
		goto('/');
	}
	let editorVisable = $state(false);
	let notes = $state(data.notes);
	let title = $state('');
	let habit = $state();

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
		console.log('hello');
		if (title != '') {
			notes = [...notes, { content: title, habit: habit }];
			const body = JSON.stringify({
				user_id: user_id,
				content: title,
				habit: habit
			});

			const res = await fetch(`/home`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});
			console.log(res);
			title = '';
			editorVisable = false;
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="flex flex-col h-screen">
	<div class="flex flex-row justify-between mx-6 mt-4">
		<p class="text-4xl text-neutral-800/0">Your Player Archetype: {data.archetype}</p>
		<button
			onclick={handleLogout}
			class="self-center py-3 px-10 text-red-500 bg-black rounded-lg border border-red-500"
			type="submit"
		>
			Log Out
		</button>
	</div>

	<div
		class="flex overflow-hidden relative flex-col flex-1 m-4 rounded-xl border border-neutral-800 bg-neutral-800/30 backdrop-blur-md"
	>
		<h1 class="p-4 w-full text-2xl font-bold border-b border-neutral-800 text-neutral-300">
			Today
		</h1>

		<!-- notes -->
		<div class="overflow-y-auto flex-1">
			<div class="py-2 px-4 bg-zinc-800/50 text-neutral-300">Game 1</div>
			{#each notes as note}
				<Note {note} />
			{/each}
			<div class="h-20"></div>
		</div>

		<!-- buttons -->
		<div class="flex justify-between py-1 px-4 border-t border-t-neutral-800 bg-black/0">
			<button
				onclick={() => {
					createNote();
				}}
				class="flex justify-between items-center py-2 px-4 my-2 space-x-2 font-medium text-white rounded-lg border shadow-md duration-200 ease-in-out border-neutral-700 bg-neutral-800 hover:bg-neutral-700"
			>
				<span>New Note</span>
				<div
					class="flex justify-center items-center w-7 h-7 text-sm font-semibold text-white rounded-md bg-neutral-400/20"
				>
					n
				</div>
			</button>
			<button
				onclick={() => {
					createNote();
				}}
				class="flex justify-between items-center py-2 px-4 my-2 space-x-2 font-medium text-white rounded-lg border shadow-md duration-200 ease-in-out border-neutral-700 bg-neutral-800 hover:bg-neutral-700"
			>
				<span>Next Game</span>
				<div
					class="flex justify-center items-center w-7 h-7 text-sm font-semibold text-white rounded-md bg-neutral-400/20"
				>
					g
				</div>
			</button>
		</div>
	</div>

	<!-- Note Editor Modal -->
	{#if editorVisable}
		<NoteEditor bind:title bind:habit {handleNote} {cancel} />
	{/if}
</div>
