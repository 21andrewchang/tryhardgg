<script lang="ts">
	let tagsDropdown = $state(false);
	let dropdownRef: HTMLDivElement | null = $state(null);
	let selected = $state('');

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			tagsDropdown = false;
		}
	}
</script>

<div class="flex relative flex-col">
	<!-- Trigger button -->
	<button
		onclick={(event) => {
			event.stopPropagation();
			tagsDropdown = !tagsDropdown;
		}}
		class="flex flex-row items-center py-2 px-5 m-0 mr-2 text-xs font-medium rounded-lg border border-neutral-700 bg-[#212121] text-neutral-200"
	>
		<span>{selected ? selected : 'Tags'}</span>
	</button>

	<!-- Dropdown menu -->
	{#if tagsDropdown}
		<div
			bind:this={dropdownRef}
			class="absolute left-0 top-full z-50 mt-2 w-48 rounded-lg border shadow-lg border-neutral-700 bg-[#212121]"
		>
			<ul class="flex flex-col py-2 text-sm text-neutral-200">
				<li>
					<button
						onclick={() => {
							selected = '';
							tagsDropdown = false;
						}}
						class="py-2 px-4 w-full text-left rounded-md hover:bg-neutral-700"
					>
						No Tags
					</button>
				</li>
				<li>
					<button
						onclick={() => {
							selected = 'Early Game';
							tagsDropdown = false;
						}}
						class="py-2 px-4 w-full text-left rounded-md hover:bg-neutral-700"
					>
						Early Game
					</button>
				</li>
				<li>
					<button
						onclick={() => {
							selected = 'Mid Game';
							tagsDropdown = false;
						}}
						class="py-2 px-4 w-full text-left rounded-md hover:bg-neutral-700"
					>
						Mid Game
					</button>
				</li>
				<li>
					<button
						onclick={() => {
							selected = 'Late Game';
							tagsDropdown = false;
						}}
						class="py-2 px-4 w-full text-left rounded-md hover:bg-neutral-700"
					>
						Late Game
					</button>
				</li>
			</ul>
		</div>
	{/if}
</div>

<!-- Global click listener -->
<svelte:window on:click={handleClickOutside} />
