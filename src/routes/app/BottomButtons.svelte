<script lang="ts">
	let props = $props();
</script>

<div class="flex justify-end pt-1 space-x-4 bg-black/0">
	<div
		class="flex flex-grow justify-center items-center py-1 px-4 mt-2 text-xs bg-black rounded-lg border shadow-md duration-200 ease-in-out border-[#202020] text-[#6c6c6c]"
	>
		1 Game Left
	</div>
	<button
		onclick={() => {
			props.nextGame();
		}}
		class="flex justify-between items-center py-1 px-4 pr-2 mt-2 space-x-2 w-44 font-medium bg-black rounded-lg border shadow-md duration-200 ease-in-out border-[#202020] hover:bg-neutral-950"
	>
		<span class="text-xs text-[#6C6C6C]">Next Game</span>
		<div
			class="flex justify-center items-center w-6 h-6 text-sm font-medium rounded-md bg-[#101010] text-[#6C6C6C]"
		>
			g
		</div>
	</button>
	<button
		onclick={() => {
			props.createNote();
		}}
		class="flex justify-between items-center py-1 px-4 pr-2 mt-2 space-x-2 w-44 font-medium bg-black rounded-lg border shadow-md duration-200 ease-in-out border-[#202020] hover:bg-neutral-950"
	>
		<span class="text-xs text-[#6C6C6C]">New Note</span>
		<div
			class="flex justify-center items-center w-7 h-7 text-sm font-medium rounded-md bg-[#101010] text-[#6C6C6C]"
		>
			n
		</div>
	</button>
</div>
