<script>
	import Indicator from './Indicator.svelte';

	let { note } = $props();
	let tags = ['Early', 'Mid', 'Late'];
</script>

<div
	class="flex flex-row justify-between items-center border-b border-neutral-800/80 bg-neutral-950"
>
	<div class="flex flex-row items-center">
		<Indicator habit={note.habit} />
		<h1 class="py-3 px-2 mb-0 text-white">{note.content}</h1>
	</div>
	<div class="flex flex-row">
		{#each tags as tag}
			<div
				class="flex flex-row justify-between py-1 pr-3 pl-2 mx-2 space-x-2 text-xs rounded-full border border-neutral-700/70 text-neutral-400"
			>
				<div>💰</div>
				<span>{tag}</span>
			</div>
		{/each}
	</div>
</div>
