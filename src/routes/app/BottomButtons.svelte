<script lang="ts">
	let props = $props();
	let dark = $state(false);

	let remainder = $derived(3 - props.curr_game);
</script>

<div class="flex justify-end pt-1 mt-2 space-x-4 bg-black/0">
	{#if remainder != 0}
		<button
			class="flex flex-grow justify-center items-center py-1 px-4 text-xs rounded-lg border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#D3D3D3]"
			onclick={() => props.finishSession()}
		>
			{remainder}
			{remainder == 1 ? 'Game' : 'Games'} Left
		</button>
		<button
			onclick={() => {
				if (props.curr_game < 3) {
					props.nextGame();
				}
			}}
			class="flex justify-between items-center py-1 px-4 pr-2 space-x-2 w-44 font-medium rounded-lg border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] hover:bg-neutral-950"
		>
			<span class="text-xs text-[#D3D3D3]">Next Game</span>
			<div
				class="flex justify-center items-center w-6 h-6 text-sm font-medium rounded-md bg-[#101010] text-[#D3D3D3]"
			>
				g
			</div>
		</button>
	{:else if props.summaryVisible || props.lvlUpVisible}
		<button
			class="flex flex-grow justify-center items-center py-1 px-4 text-xs font-semibold rounded-lg duration-200 ease-in-out bg-[#09090B] text-[#09090B]"
			onclick={() => {
				console.log('finish session');
				props.finishSession();
			}}
		>
			Finish Session
		</button>
	{:else}
		<button
			class="flex flex-grow justify-center items-center py-1 px-4 text-xs font-semibold rounded-lg border duration-200 ease-in-out border-[#202020] bg-[#D3D3D3] text-[#09090B]"
			onclick={() => {
				console.log('finish session');
				props.finishSession();
			}}
		>
			Finish Session
		</button>
	{/if}
	<button
		onclick={() => {
			props.createNote();
		}}
		class="flex justify-between items-center py-1 px-4 pr-2 space-x-2 w-44 font-medium rounded-lg border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] hover:bg-neutral-950"
	>
		<span class="text-xs text-[#D3D3D3]">New Note</span>
		<div
			class="flex justify-center items-center w-7 h-7 text-sm font-medium rounded-md bg-[#101010] text-[#D3D3D3]"
		>
			n
		</div>
	</button>
</div>
