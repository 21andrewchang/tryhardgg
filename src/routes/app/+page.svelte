<script lang="ts">
	import { onMount } from 'svelte';
	import BottomButtons from './BottomButtons.svelte';
	import TopBar from './TopBar.svelte';
	import NoteEditor from './NoteEditor.svelte';
	import Sidebar from './Sidebar.svelte';
	import Widgets from './Widgets.svelte';
	import GamesList from './GamesList.svelte';
	import SessionSummary from './SessionSummary.svelte';
	import Library from './pages/Library.svelte';
	import Dashboard from './pages/Dashboard.svelte';
	import Habit from './pages/Habit.svelte';
	import AllNotes from './pages/AllNotes.svelte';
	import Profile from './pages/Profile.svelte';
	import LevelUp from './LevelUp.svelte';

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

	let user_lvl = $state(data.user_lvl);
	let editorVisible = $state(false);
	let games: Games = $state(data.games);
	let mastery = $state(data.mastery);
	let curr_game = $state(data.num_games);
	let total_notes = $derived(Object.values(games).reduce((sum, notes) => sum + notes.length, 0));
	let all_notes = $state(data.all_notes);

	let session = $state(data.session);
	let block = $state(data.block);
	let habits: Record<string, HabitCount> = $state(data.habits);

	let categorized_notes = $state(data.categorized_notes);

	const library = data.library;

	let title = $state('');
	let content = $state('');
	let timestamp = $state('');
	let habit_id = $state(0);
	let good = $state(false);
	let tag = $state('');

	function createNote() {
		editorVisible = true;
	}

	function cancel() {
		editorVisible = false;
	}
	function onKeyDown(event: KeyboardEvent) {
		if (!editorVisible && curr_page == 'session' && !summaryVisible) {
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

	//endSession determines whether or not we level up mastery
	async function handleMastery(id: number, endSession: Boolean) {
		if (id == 0) {
			//no category tagged
			return;
		}
		const masteryUpdate = {
			user_id: user_id,
			habit_id: id,
			good: good,
			endSession: endSession
		};

		const res = await fetch(`/app/mastery`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(masteryUpdate)
		});
		const result = await res.json();
		const points_update = await result.points;
		console.log('passing in id: ', id);

		mastery[id].points = points_update;
		mastery = mastery;
		console.log('handle mastery res: ', result);
	}

	$inspect('all notes', all_notes);
	$inspect('habit categorized notes', categorized_notes);
	//list of categorized notes not updating still
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
			editorVisible = false;
			handleMastery(habit_id, false);
			const res = await fetch(`/app`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newNote)
			});
			const result = await res.json();
			const updated_all_notes = await result.updated_all_notes;
			const updated_categorized_notes = await result.updated_categorized_notes;
			all_notes = updated_all_notes;
			categorized_notes = updated_categorized_notes;
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
		}
	}

	function nextGame() {
		if (games[curr_game] && games[curr_game].length > 0) {
			curr_game += 1;
			games[curr_game] = [];
		}
	}

	let summaryVisible = $state(false);

	function nextSession() {
		summaryVisible = false;
		games = { '1': [] };
		curr_game = 1;
		Object.values(habits).forEach((habit) => {
			habit.goodCount = 0;
			habit.badCount = 0;
		});
	}

	let leveledUpMastery = $state();
	let user_lvlUp = $state(false);

	async function handleLvlUp(selected_concept: string) {
		user_lvlUp = false;
		lvlUpVisible = false;
		console.log('selected concept: ', selected_concept);
		const body = {
			user_id: user_id,
			selected_concept: selected_concept,
			curr_habits: habits,
			session: session,
			block: block
		};
		const res = await fetch(`/app/habits`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		const result = await res.json();
		habits = result.updated_habits;
		mastery[result.updated_mastery.habit_id] = result.updated_mastery;
		//make a call to habits api to update db with new habit
		nextSession();
	}

	let lvlUpVisible = $state(false);
	function showLevelUp() {
		summaryVisible = false;
		lvlUpVisible = true;
	}

	async function finishSession() {
		if (games[1] && games[2] && games[3]) {
			const body = {
				user_id: user_id,
				session: session,
				block: block,
				habit_ids: Object.keys(habits),
				user_lvl: user_lvl,
				total_notes: all_notes?.length
			};
			const res = await fetch(`/app/session`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});
			const result = await res.json();
			user_lvl = result.updatedUser_lvl;
			user_lvlUp = result.levelUp;
			leveledUpMastery = { ...result.leveledUpMastery };

			Object.keys(leveledUpMastery).forEach((id) => {
				if (mastery[id]) {
					mastery[id] = { ...mastery[id], ...leveledUpMastery[id] };
				}
			});
			summaryVisible = true;
			session = result.updatedSession;
			block = result.updatedBlock;
		}
	}
	$inspect('leveled up mastery: ', leveledUpMastery);
	$inspect(' mastery: ', mastery);

	let curr_page = $state('session');
	let selected_habit = $state();
	function showPage(page: string) {
		curr_page = page;
	}

	let sidebar = $state(true);
	function sidebarT() {
		sidebar = !sidebar;
	}
	onMount(() => {
		const checkWidth = () => {
			if (window.innerWidth < 1200) {
				sidebar = false;
			} else {
				sidebar = true;
			}
		};
		checkWidth();
		window.addEventListener('resize', checkWidth);
	});
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="flex overflow-hidden w-screen h-screen">
	<Sidebar {sidebar} {showPage} {session} {block} {curr_page} {habits} bind:selected_habit />
	<div class="flex flex-col p-8 w-full h-screen transition-all duration-300 ease-in-out">
		<TopBar {sidebarT} {session} {block} {curr_page} {selected_habit} />
		{#if curr_page == 'session'}
			<Widgets {habits} {user_lvl} {total_notes} />
			<GamesList {games} {habits} />
			<BottomButtons
				{createNote}
				{nextGame}
				{curr_game}
				{finishSession}
				{summaryVisible}
				{lvlUpVisible}
			/>
		{:else if curr_page == 'all_notes'}
			<AllNotes {all_notes} {habits} />
		{:else if curr_page == 'library'}
			<Library {habits} {library} />
		{:else if curr_page == 'dashboard'}
			<Dashboard />
		{:else if curr_page == 'habit'}
			<Habit {categorized_notes} {selected_habit} {library} {habits} {mastery} />
		{:else if curr_page == 'profile'}
			<Profile {user_lvl} {all_notes} />
		{/if}
	</div>
	{#if summaryVisible}
		<SessionSummary
			{habits}
			{total_notes}
			{nextSession}
			{mastery}
			{leveledUpMastery}
			{user_lvlUp}
			{showLevelUp}
		/>
	{/if}
	{#if lvlUpVisible}
		<LevelUp {habits} {user_lvl} {handleLvlUp} />
	{/if}
	{#if editorVisible}
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
