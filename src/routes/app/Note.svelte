<script>
	import Indicator from './Indicator.svelte';
	import thumb from '$lib/images/thumb.svg';

	let { note, habits } = $props();
</script>

<div class="flex flex-row justify-between items-center">
	<div class="flex flex-row items-center space-x-2">
		<!-- timestamp -->
		<div class="flex flex-row items-center text-center">
			{#if note.timestamp}
				<span class="text-xs font-thin text-neutral-400">{note.timestamp}</span>
			{:else}
				<span class="px-2 text-xs font-thin text-neutral-400">---</span>
			{/if}
		</div>
		<!-- note title -->
		<div class="flex flex-row items-center text-center">
			{#if note.title}
				<span class="text-xs font-semibold text-[#FAFAFA]">{note.title}</span>
			{:else}
				<span class="px-1 text-xs font-semibold text-[#FAFAFA]">---</span>
			{/if}
		</div>
		<!-- note content -->
		<h1 class="py-3 mb-0 text-xs font-light text-[#fafafa]">{note.content}</h1>
	</div>
	<!-- tags -->
	<div class="flex flex-row space-x-2">
		{#if note.good != null}
			<div
				class="flex flex-row justify-center items-center py-2 px-3 rounded-full border border-[#202020]"
			>
				<img
					src={thumb}
					alt="thumb"
					class="w-2 h-2 transition-transform duration-300 transform"
					style="transform: rotate({note.good ? 0 : 180}deg);"
				/>
			</div>
		{/if}
		{#if habits[note.habit_id]}
			<div
				class="flex flex-row items-center py-1 px-3 space-x-2 text-center rounded-full border border-[#202020]"
			>
				<Indicator category={habits[note.habit_id].category} />
				<span class="text-[9px] text-neutral-400">{habits[note.habit_id].name}</span>
			</div>
		{/if}
		{#if note.tag}
			<div
				class="flex flex-row items-center py-1 px-3 text-center rounded-full border border-[#202020]"
			>
				<span class="text-[8px] text-neutral-400">{note.tag}</span>
			</div>
		{/if}
	</div>
</div>
