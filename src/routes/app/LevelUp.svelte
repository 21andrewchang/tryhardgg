<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Indicator from './Indicator.svelte';
	import { cubicOut } from 'svelte/easing';

	let props = $props();
	let tutorial = $state(true);
	let habits = Object.values(props.habits);

	type Concept = {
		name: string;
		category: string;
	};

	// Define all concepts
	let allConcepts = [
		{ name: 'Decision Making', category: 'yellow' },
		{ name: 'Fighting and Mechanics', category: 'red' },
		{ name: 'Information Gathering', category: 'blue' },
		{ name: 'Income and Strength', category: 'green' }
	];
	const level = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
	let habitColors = new Set(habits.map((habit) => habit.category));
	let concepts = allConcepts.filter((concept) => !habitColors.has(concept.category));
	let selected: Concept | undefined = $state();
</script>

<div
	class="flex fixed top-0 z-50 flex-col p-10 px-24 w-full h-full bg-[#09090B]/90 backdrop-blur-sm"
	in:fade={{ duration: 300 }}
>
	{#if tutorial}
		<div class="self-start mb-6 text-4xl font-medium text-[#FAFAFA]">Congratulations!</div>
		<div class="self-start mb-6 text-4xl font-medium text-[#FAFAFA]">
			You are now a {level[props.user_lvl]}
		</div>
		<!-- <div class="self-start mb-6 text-4xl font-medium text-[#FAFAFA]">Total Notes Taken: 100</div> -->
		<!-- <div class="self-start mb-6 text-4xl font-medium text-[#FAFAFA]"> -->
		<!-- 	You have worked on Objective Timers for: 30 games -->
		<!-- </div> -->
		<div class="flex fixed left-0 bottom-8 justify-center w-full">
			<button
				class="py-2 px-10 text-sm font-semibold rounded-lg duration-200 ease-in-out text-[#FAFAFA] hover:bg-white/10"
				onclick={() => (tutorial = false)}
			>
				Chose Your Next Concept
			</button>
		</div>
	{:else}
		<div class="flex flex-row justify-center items-center space-x-10">
			{#each concepts as concept, index}
				<button
					in:fly|global={{ y: 50, duration: 300, delay: 700 + index * 100, easing: cubicOut }}
					class="flex flex-col justify-between py-3 px-4 mb-2 rounded-xl duration-300 ease-in-out hover:scale-110"
					onclick={() => {
						console.log(concept);
						selected = concept;
					}}
				>
					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-row items-center">
							<Indicator category={concept.category} size={'xl'} />
							<span class="mx-2 font-semibold text-[#E2E2E2]">{concept.name}</span>
						</div>
					</div>
				</button>
			{/each}
		</div>

		<!-- Keep Button Fixed at Bottom -->
		<div class="flex fixed left-0 bottom-8 justify-center w-full">
			<button
				class="py-2 px-10 text-sm font-semibold rounded-lg duration-200 ease-in-out text-[#FAFAFA] hover:bg-white/10"
				onclick={() => props.handleLvlUp(selected?.category)}
			>
				Continue
			</button>
		</div>
		{#key selected}
			<div class={selected?.category} transition:fade={{ duration: 1000 }}></div>
		{/key}
	{/if}
</div>

<style>
	.red {
		overflow: hidden;
		content: '';
		position: fixed;
		bottom: -100%; /* Keep the center of the red glow at the bottom-right */
		width: 200vw; /* Constrain the glow to the edge */
		left: -75%;
		height: 150%; /* Extend height for vertical coverage */
		pointer-events: none;
		background: radial-gradient(
			circle,
			rgba(255, 0, 0, 0.4) 10%,
			rgba(255, 0, 0, 0.2) 50%,
			transparent 100%
		);
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		-webkit-mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		mask-composite: intersect;
		-webkit-mask-composite: intersect;
	}
	.green {
		overflow: hidden;
		content: '';
		position: fixed;
		bottom: -100%; /* Keep the center of the red glow at the bottom-right */
		width: 200vw; /* Constrain the glow to the edge */
		left: -75%;
		height: 150%; /* Extend height for vertical coverage */
		pointer-events: none;
		background: radial-gradient(
			circle,
			rgba(0, 255, 0, 0.4) 10%,
			rgba(0, 255, 0, 0.2) 50%,
			transparent 100%
		);
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		-webkit-mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		mask-composite: intersect;
		-webkit-mask-composite: intersect;
	}
	.blue {
		overflow: hidden;
		content: '';
		position: fixed;
		bottom: -100%; /* Keep the center of the red glow at the bottom-right */
		width: 200vw; /* Constrain the glow to the edge */
		left: -75%;
		height: 150%; /* Extend height for vertical coverage */
		pointer-events: none;
		background: radial-gradient(
			circle,
			rgba(0, 0, 255, 0.4) 10%,
			rgba(0, 0, 255, 0.2) 50%,
			transparent 100%
		);
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		-webkit-mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		mask-composite: intersect;
		-webkit-mask-composite: intersect;
	}
	.yellow {
		overflow: hidden;
		content: '';
		position: fixed;
		bottom: -100%; /* Keep the center of the red glow at the bottom-right */
		width: 200vw; /* Constrain the glow to the edge */
		left: -75%;
		height: 150%; /* Extend height for vertical coverage */
		pointer-events: none;
		background: radial-gradient(
			circle,
			rgba(255, 255, 0, 0.4) 10%,
			rgba(255, 255, 0, 0.2) 50%,
			transparent 100%
		);
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		-webkit-mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		mask-composite: intersect;
		-webkit-mask-composite: intersect;
	}
</style>
