<script lang="ts">
	import BottomButtons from './BottomButtons.svelte';
	import TopBar from './TopBar.svelte';
	import NoteEditor from './NoteEditor.svelte';
	import Sidebar from './Sidebar.svelte';
	import Widgets from './Widgets.svelte';
	import GamesList from './GamesList.svelte';
	import SessionSummary from './SessionSummary.svelte';
	import Library from './Library.svelte';
	import Dashboard from './Dashboard.svelte';

	type Note = {
		user_id: string | undefined;
		title: string;
		timestamp: string;
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
	type HabitCount = {
		id: number;
		name: string;
		category: string;
		goodCount: number;
		badCount: number;
	};

	const { data } = $props();
	const user_id = data?.user?.id;

	let editorVisable = $state(false);
	let games: Games = $state(data.games);
	let curr_game = $state(data.num_games);
	let total_notes = $derived(Object.values(games).reduce((sum, notes) => sum + notes.length, 0));

	let session = $state(data.session);
	let block = $state(data.block);
	let habits: Record<string, HabitCount> = $state(data.habits);

	let sidebar = $state(true);

	const library = data.library;

	let title = $state('');
	let content = $state('');
	let timestamp = $state('');
	//0 is unset habit
	let habit_id = $state(0);
	let good = $state(false);
	let tag = $state('');

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
				case 'g':
					if (curr_game < 3) nextGame();
					//maybe add a popup warning that 3 games alr reached
					//must finish session cannot go next game
					event.preventDefault();
					break;
				default:
					break;
			}
		}
	}

	// NEED TO UPDATE THE GOOD/BAD COUNT OF THE HABIT TAGGED IN THE NOTE
	async function handleNote() {
		const newNote: Note = {
			user_id: user_id,
			title: title,
			timestamp: timestamp,
			content: content,
			habit_id: habit_id,
			good: good,
			game_num: curr_game,
			tag: tag,
			session: session,
			block: block
		};
		if (content != '') {
			games[curr_game] = [...(games[curr_game] ?? []), newNote];

			const res = await fetch(`/app`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newNote)
			});
			console.log(res);
			if (habit_id) {
				if (habit_id) {
					habits[habit_id][good ? 'goodCount' : 'badCount'] += 1;
				}
			}
			title = '';
			content = '';
			timestamp = '';
			habit_id = 0;
			tag = '';
			editorVisable = false;
		}
	}
	function nextGame() {
		if (games[curr_game] && games[curr_game].length > 0) {
			curr_game += 1;
			games[curr_game] = [];
		}
		editorVisable = true;
	}
	function sidebarT() {
		sidebar = !sidebar;
	}

	let summaryVisable = $state(false);
	function finishSession() {
		summaryVisable = true;
	}
	async function nextSession() {
		session += 1;
		const body = {
			user_id: user_id,
			session: session
		};
		const res = await fetch(`/app/session`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		console.log(res);
		games = { '1': [] };
		curr_game = 1;
		summaryVisable = false;
		Object.values(habits).forEach((habit) => {
			habit.goodCount = 0;
			habit.badCount = 0;
		});
	}

	let curr_page = $state('session');
	function showPage(page: string) {
		curr_page = page;
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="flex overflow-hidden h-screen">
	<Sidebar {sidebar} {showPage} {session} {block} />
	<div class="flex flex-col p-8 w-screen h-screen transition-all duration-300 ease-in-out">
		<TopBar {sidebarT} {session} {block} {curr_page} />
		{#if curr_page == 'session'}
			<Widgets {habits} />
			<GamesList {editorVisable} {games} {habits} />
			<BottomButtons {createNote} {nextGame} {curr_game} {finishSession} {summaryVisable} />
		{:else if curr_page == 'library'}
			<Library {habits} {library} />
		{:else if curr_page == 'dashboard'}
			<Dashboard />
		{/if}
	</div>
	{#if summaryVisable}
		<SessionSummary {habits} {total_notes} {nextSession} />
	{/if}
	{#if editorVisable}
		<NoteEditor
			bind:title
			bind:timestamp
			bind:content
			bind:habit_id
			bind:good
			bind:tag
			bind:curr_game
			{handleNote}
			{cancel}
			{habits}
		/>
	{/if}
</div>
