<script>
	import Indicator from './Indicator.svelte';

	let { note } = $props();
</script>

<div class="flex flex-row justify-between items-center">
	<div class="flex flex-row items-center">
		<Indicator category={note.habit} />
		<h1 class="py-3 px-2 mb-0 text-xs text-white">{note.content}</h1>
	</div>
	<div class="flex flex-row">
		{#if note.tag}
			<div
				class="flex flex-row py-2 px-4 mr-2 text-xs text-center rounded-full border border-neutral-700/70 text-neutral-400"
			>
				<span class="text-xs">{note.tag}</span>
			</div>
		{/if}
	</div>
</div>
