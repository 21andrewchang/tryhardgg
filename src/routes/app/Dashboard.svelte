<script lang="ts">
	let props = $props();
	const session = ['1', '2', '3'];
	const block = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
</script>

<div class="flex overflow-hidden flex-col space-y-6 w-full hover:overflow-y-auto">
	<div class="flex flex-col">
		<text class="mb-2 text-xl font-medium text-[#D3D3D3]">Sessions</text>
		<div class="grid grid-cols-3 gap-4 w-full">
			{#each session as game}
				<button
					class="flex flex-col flex-grow p-4 py-2 rounded-lg border border-[#202020] bg-[#09090B]"
				>
					<div class="flex justify-center items-center w-full">
						<text class="mx-2 font-normal text-md text-[#E2E2E2]">Game {game}</text>
					</div>
				</button>
			{/each}
		</div>
	</div>
	<div class="flex flex-col">
		<text class="mb-2 text-xl font-medium text-[#D3D3D3]">Blocks</text>
		<div class="grid grid-cols-5 gap-4 w-full">
			{#each block as session}
				<button
					class="flex flex-col flex-grow p-4 py-2 rounded-lg border border-[#202020] bg-[#09090B]"
				>
					<div class="flex justify-center items-center w-full">
						<text class="mx-2 font-normal text-md text-[#E2E2E2]">Session {session}</text>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>
