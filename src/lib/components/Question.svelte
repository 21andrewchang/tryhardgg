<script lang="ts">
	import { responses } from '../../shared.svelte';
	let { question, index } = $props();

	let options = [5, 4, 3, 2, 1];

	function onclick(option: number) {
		responses[index] = option;
	}
</script>

<div class="flex justify-center mt-4 text-xl font-medium text-white">
	<h1>{question}</h1>
</div>
<div class="flex justify-center items-center mb-10">
	<p class="m-4 text-3xl">✅</p>
	{#each options as option}
		{#if responses[index] == option}
			<button disabled={true} class="m-4 w-9 h-9 rounded-full bg-neutral-700" aria-label={option}
			></button>
		{:else}
			<button
				onclick={() => onclick(option)}
				class="m-4 w-9 h-9 rounded-full border-2 border-dashed hover:border-solid border-neutral-600"
				aria-label={option.toString()}
			></button>
		{/if}
	{/each}
	<p class="m-4 text-3xl">❌</p>
</div>

<div class="mb-6 w-screen border-t border-neutral-900"></div>
