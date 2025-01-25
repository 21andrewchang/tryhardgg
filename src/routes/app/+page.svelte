<script lang="ts">
	import BottomButtons from './BottomButtons.svelte';
	import TopBar from './TopBar.svelte';
	import NoteEditor from './NoteEditor.svelte';
	import Sidebar from './Sidebar.svelte';
	import Widgets from './Widgets.svelte';
	import GamesList from './GamesList.svelte';
	const { data } = $props();
	const user_id = data?.user?.id;

	let editorVisable = $state(false);
	let games = $state(data.games);
	let game_num = $state(data.num_games);

	let sidebar = $state(true);

	let title = $state('');

	let habits = $state(data.habits);
	let habit = $state();
	let good = $state(false);
	let tag = $state();

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

	// NEED TO UPDATE THE GOOD/BAD COUNT OF THE HABIT TAGGED IN THE NOTE
	async function handleNote() {
		const curr_date = new Date().toLocaleDateString('en-CA');

		console.log('curr date: ', curr_date);
		if (title != '') {
			if (games[game_num]) {
				games[game_num] = [
					...games[game_num],
					{ content: title, habit: habit, tag: tag, game_num: game_num, good: good }
				];
			} else {
				games[game_num] = [
					{ content: title, habit: habit, tag: tag, game_num: game_num, good: good }
				];
			}
			const body = JSON.stringify({
				user_id: user_id,
				content: title,
				habit: habit,
				good: good,
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
			game_num += 1;
			games[game_num] = [];
		}
		editorVisable = true;
	}
	function sidebarT() {
		sidebar = !sidebar;
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="flex overflow-hidden h-screen">
	<Sidebar {sidebar} />
	<div class="flex flex-col flex-1 p-8 h-screen transition-all duration-300 ease-in-out">
		<TopBar {sidebarT} />
		<Widgets {habits} />
		<GamesList {editorVisable} {games} {habits} />
		<BottomButtons {createNote} {nextGame} />
	</div>
	{#if editorVisable}
		<NoteEditor
			bind:title
			bind:habit
			bind:good
			bind:tag
			bind:game_num
			{handleNote}
			{cancel}
			{habits}
		/>
	{/if}
</div>
