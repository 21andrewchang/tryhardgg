<script>
	import Indicator from './Indicator.svelte';
	import thumb from '$lib/images/thumb.svg';

	let { note, habits } = $props();
</script>

<div class="flex flex-row justify-between items-center w-full">
	<!-- Left Side: Timestamp, Title, and Truncated Content -->
	<div class="flex overflow-hidden items-center space-x-2 min-w-0">
		<!-- Timestamp -->
		<div class="flex-shrink-0">
			{#if note.timestamp}
				<span class="text-xs font-thin text-neutral-400">{note.timestamp}</span>
			{:else}
				<span class="px-2 text-xs font-thin text-neutral-400">---</span>
			{/if}
		</div>

		<!-- Note Title -->
		<div class="flex-shrink-0">
			{#if note.title}
				<span class="text-xs font-semibold text-[#FAFAFA]">{note.title}</span>
			{:else}
				<span class="px-2 text-xs font-semibold text-[#FAFAFA]">---</span>
			{/if}
		</div>

		<!-- Truncated Note Content -->
		<div class="flex-grow pr-2 min-w-0">
			<h1
				class="overflow-hidden py-3 text-xs font-light whitespace-nowrap text-ellipsis text-[#FAFAFA]"
			>
				{note.content}
			</h1>
		</div>
	</div>

	<!-- Right Side: Tags (Fixed Width, No Shrinking) -->
	<div class="flex flex-shrink-0 items-center space-x-2">
		<!-- Thumbs (Good or Bad) -->
		{#if note.good != null}
			<div class="flex justify-center items-center py-2 px-3 rounded-full border border-[#202020]">
				<img
					src={thumb}
					alt="thumb"
					class="w-2 h-2 transition-transform duration-300 transform"
					style="transform: rotate({note.good ? 0 : 180}deg);"
				/>
			</div>
		{/if}

		<!-- Habit Tag -->
		{#if habits[note.habit_id]}
			<div class="flex items-center py-1 px-3 space-x-2 rounded-full border border-[#202020]">
				<Indicator category={habits[note.habit_id].category} />
				<span class="text-[9px] text-neutral-400">{habits[note.habit_id].name}</span>
			</div>
		{/if}

		<!-- Note Tag -->
		{#if note.tag}
			<div class="flex items-center py-1 px-3 rounded-full border border-[#202020]">
				<span class="text-[8px] text-neutral-400">{note.tag}</span>
			</div>
		{/if}
	</div>
</div>
