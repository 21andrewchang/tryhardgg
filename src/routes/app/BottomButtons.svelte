<script lang="ts">
	let props = $props();
</script>

<div class="flex justify-between py-1 px-4 border-t border-t-neutral-800 bg-black/0">
	<button
		onclick={() => {
			props.createNote();
		}}
		class="flex justify-between items-center py-2 px-4 my-2 space-x-2 font-medium text-white rounded-lg border shadow-md duration-200 ease-in-out border-neutral-700 bg-neutral-800 hover:bg-neutral-700"
	>
		<span>New Note</span>
		<div
			class="flex justify-center items-center w-7 h-7 text-sm font-semibold text-white rounded-md bg-neutral-400/20"
		>
			n
		</div>
	</button>
	<button
		onclick={() => {
			props.nextGame();
		}}
		class="flex justify-between items-center py-2 px-4 my-2 space-x-2 font-medium text-white rounded-lg border shadow-md duration-200 ease-in-out border-neutral-700 bg-neutral-800 hover:bg-neutral-700"
	>
		<span>Next Game</span>
		<div
			class="flex justify-center items-center w-7 h-7 text-sm font-semibold text-white rounded-md bg-neutral-400/20"
		>
			g
		</div>
	</button>
</div>
