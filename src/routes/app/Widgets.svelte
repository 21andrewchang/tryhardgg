<script lang="ts">
	import Indicator from './Indicator.svelte';
	let habits = [
		{ name: 'Objective Timers', category: 'red' },
		{ name: 'Man Advantage', category: 'green' },
		{ name: 'Check Map', category: 'blue' },
		{ name: 'Positioning + Spacing', category: 'orange' }
	];
</script>

<!-- Widgets and Logout Button -->
<div class="flex mb-4">
	<div class="flex flex-row justify-between space-x-4 w-full">
		{#each habits as item}
			<button
				class="flex flex-grow justify-between items-center p-4 py-2 space-x-4 bg-black rounded-full border border-[#202020]"
			>
				<div class="flex flex-row items-center">
					<Indicator category={item.category} />
					<span class="mx-2 text-[8px] text-[#6C6C6C]">{item.name}</span>
				</div>
				<span class="text-[8px] text-[#6C6C6C]">0</span>
			</button>
		{/each}
	</div>
</div>
