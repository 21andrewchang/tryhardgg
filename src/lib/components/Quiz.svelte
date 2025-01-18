<script lang="ts">
	import { goto } from '$app/navigation';
	import { responses } from '../../shared.svelte';
	import Question from '$lib/components/Question.svelte';
	let scrollY = $state(0);
	let completed = $derived(!responses.includes(-1));
	let position = $derived(Math.max(-60, -35 - scrollY * 0.1));
	let questions = [
		'I often spam ping my teammates.',
		'I only make plays when I see where the enemy jungle is.',
		'I would immediately drop my camps to join a fight and help my team.',
		'I always stay on the objective until its secured'
	];

	async function handleSubmit(event: any) {
		if (completed) {
			const formData = new FormData(event.target);
			formData.set('responses', JSON.stringify(responses));

			const res = await fetch('/results', {
				method: 'POST',
				body: formData
			});

			if (res.ok) {
				await goto(`/results`);
			} else {
				console.error('Failed to fetch archetype');
			}
		}
	}
</script>

<div class="relative z-0 overflow-x-clip">
	<div class="green" style:left={`${position}%`}></div>
	<div class="red" style:right={`${position}%`}></div>
	<form onsubmit={handleSubmit} class="flex flex-col items-center">
		{#each questions as question, index}
			<Question {question} {index} />
		{/each}

		<input type="hidden" name="responses" value={JSON.stringify(responses)} />

		<button
			disabled={!completed}
			class="py-3 px-6 m-4 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-neutral-800 disabled:text-neutral-700"
			type="submit"
		>
			Submit
		</button>
	</form>
</div>
<svelte:window bind:scrollY />

<style>
	.red {
		content: '';
		position: absolute;
		bottom: -20%; /* Keep the center of the red glow at the bottom-right */
		right: -65%; /* Keep the center further right */
		width: 100%; /* Constrain the glow to the edge */
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
		content: '';
		position: absolute;
		bottom: -20%; /* Keep the center of the green glow at the bottom-left */
		left: -65%; /* Keep the center further left */
		width: 100%; /* Constrain the glow to the edge */
		height: 150%; /* Extend height for vertical coverage */
		pointer-events: none;
		background: radial-gradient(
			circle,
			rgba(0, 255, 0, 0.3) 10%,
			rgba(0, 255, 0, 0.2) 50%,
			transparent 100%
		);
		mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to right, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		-webkit-mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to right, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		mask-composite: intersect;
		-webkit-mask-composite: intersect;
	}
	form {
		z-index: 1; /* Ensures content is above the glow */
	}
</style>
