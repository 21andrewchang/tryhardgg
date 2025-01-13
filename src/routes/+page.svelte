<script lang="ts">
	import { goto } from '$app/navigation';
	import { responses } from '../shared.svelte';
	import Question from './Question.svelte';
	let completed = $derived(!responses.includes(-1));
	let questions = [
		'I often spam ping my teammates.',
		'I only make plays when I see where the enemy jungle is.',
		'I would immediately drop my camps to join a fight and help my team.',
		'I always stay on the objective until its secured'
	];

	//propbably don't need to use a form tbh
	async function handleSubmit(event: any) {
		if (completed) {
			const formData = new FormData(event.target);
			formData.set('responses', JSON.stringify(responses));

			const res = await fetch('/results', {
				method: 'POST',
				body: formData
			});

			if (res.ok) {
				// const data = await res.json();
				await goto(`/results`);
			} else {
				console.error('Failed to fetch archetype');
			}
		}
	}
</script>

<div class="flex justify-center items-center h-screen">
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
