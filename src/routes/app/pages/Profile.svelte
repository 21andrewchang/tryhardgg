<script lang="ts">
	let props = $props();
	const level = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
	const levelup = [100, 300, 500, 750, 1000];
	// const levelup = [10, 20, 30, 40, 50];

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
		{#if total_notes > levelup[props.user_lvl]}
			<div class="mb-2 text-xl font-semibold text-[#FAFAFA]">
				Level up to Novice by completing this block!
			</div>
		{/if}
	</div>
	<text class="mb-2 text-xl font-medium text-[#D3D3D3]">Beginner</text>
	<text class="mb-2 text-xl text-[#D3D3D3]">Focus on one habit in one category</text>
	<text class="mb-2 text-xl font-medium text-[#D3D3D3]">Novice</text>
	<text class="mb-2 text-xl text-[#D3D3D3]">Focus on one habit in two categories</text>
	<text class="mb-2 text-xl font-medium text-[#D3D3D3]">Intermediate</text>
	<text class="mb-2 text-xl text-[#D3D3D3]">Focus on one habit in three categories</text>
	<text class="mb-2 text-xl font-medium text-[#D3D3D3]">Advanced</text>
	<text class="mb-2 text-xl text-[#D3D3D3]">Focus on one habit for four different categories</text>
	<text class="mb-2 text-xl font-medium text-[#D3D3D3]">Expert</text>
	<text class="mb-2 text-xl text-[#D3D3D3]">Focus on multiple habits 4 max</text>
</div>
