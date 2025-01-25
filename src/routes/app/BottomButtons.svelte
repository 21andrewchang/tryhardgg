<script lang="ts">
	let props = $props();
</script>

<div class="flex justify-end pt-1 space-x-4 bg-black/0">
	<div
		class="flex flex-grow justify-center items-center py-1 px-4 mt-2 text-xs rounded-lg border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#D3D3D3]"
	>
		1 Game Left
	</div>
	<button
		onclick={() => {
			props.nextGame();
		}}
		class="flex justify-between items-center py-1 px-4 pr-2 mt-2 space-x-2 w-44 font-medium rounded-lg border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] hover:bg-neutral-950"
	>
		<span class="text-xs text-[#D3D3D3]">Next Game</span>
		<div
			class="flex justify-center items-center w-6 h-6 text-sm font-medium rounded-md bg-[#101010] text-[#D3D3D3]"
		>
			g
		</div>
	</button>
	<button
		onclick={() => {
			props.createNote();
		}}
		class="flex justify-between items-center py-1 px-4 pr-2 mt-2 space-x-2 w-44 font-medium rounded-lg border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] hover:bg-neutral-950"
	>
		<span class="text-xs text-[#D3D3D3]">New Note</span>
		<div
			class="flex justify-center items-center w-7 h-7 text-sm font-medium rounded-md bg-[#101010] text-[#D3D3D3]"
		>
			n
		</div>
	</button>
</div>
