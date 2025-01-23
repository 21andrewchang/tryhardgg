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

	let title = $state('');
	let habit = $state();
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
		console.log(game_num);
		console.log(games[game_num]);
		if (games[game_num] && games[game_num].length > 0) {
			game_num += 1;
			games[game_num] = [];
		}
		// editorVisable = true;
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="flex overflow-hidden h-screen">
	<Sidebar />
	<div class="flex flex-col flex-1 p-8 h-full transition-all duration-300 ease-in-out">
		<TopBar />
		<Widgets />
		<GamesList {editorVisable} {games} />
		<BottomButtons {createNote} {nextGame} />
	</div>
	{#if editorVisable}
		<NoteEditor bind:title bind:habit bind:tag bind:game_num {handleNote} {cancel} />
	{/if}
</div>
