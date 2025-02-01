<script lang="ts">
	let props = $props();
	const level = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
	const levelup = [100, 300, 500, 750, 1000];

	let total_notes = $derived(props.all_notes.length);
</script>

<div class="flex overflow-hidden flex-col space-y-6 w-full hover:overflow-y-auto">
	<div class="flex flex-col">
		<text class="mb-2 text-3xl font-bold text-[#FAFAFA]">{level[props.user_lvl]}</text>
		{#if props.user_lvl === 0}
			<div class="mb-2 text-xl text-[#D3D3D3]">Focus on one habit in one category</div>
		{/if}
		<div class="mb-2 text-xl text-[#D3D3D3]">Total Notes Taken</div>
		<div class="flex flex-row">
			<div class="mb-2 text-xl font-semibold text-[#FAFAFA]">{total_notes}</div>
			<div class="mb-2 text-xl text-[#6C6C6C]">
				/{levelup[props.user_lvl]}
			</div>
		</div>
	</div>
</div>
