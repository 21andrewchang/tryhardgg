<script lang="ts">
	import close from '$lib/images/close.svg';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import Indicator from './Indicator.svelte';
	let {
		title = $bindable(),
		habit = $bindable(),
		tag = $bindable(),
		game_num = $bindable(),
		...props
	} = $props();
	let command = $state(false);
	let habits = [
		{ name: 'Objective Timers', category: 'red' },
		{ name: 'Man Advantage', category: 'green' },
		{ name: 'Check Map', category: 'blue' }
	];
	let tagDropdown = $state(false);
	let tags = [{ name: '' }, { name: 'Early Game' }, { name: 'Mid Game' }, { name: 'Late Game' }];

	function focus(element: HTMLElement) {
		element.focus();
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.metaKey && event.key === '1') {
			habit = '0';
			event.preventDefault();
		}
		if (event.metaKey && event.key === '2') {
			habit = '1';
			event.preventDefault();
		}
		if (event.metaKey && event.key === '3') {
			habit = '2';
			event.preventDefault();
		}
		if (event.metaKey && event.key === '4') {
			tagDropdown = true;
			event.preventDefault();
		}
		if (!event.metaKey && tagDropdown && event.key === '1') {
			tag = tags[0].name;
			tagDropdown = false;
			event.preventDefault();
		}
		if (!event.metaKey && tagDropdown && event.key === '2') {
			tag = tags[1].name;
			tagDropdown = false;
			event.preventDefault();
		}
		if (!event.metaKey && tagDropdown && event.key === '3') {
			tag = tags[2].name;
			tagDropdown = false;
			event.preventDefault();
		}
		if (!event.metaKey && tagDropdown && event.key === '4') {
			tag = tags[3].name;
			tagDropdown = false;
			event.preventDefault();
		}
		if (event.metaKey && event.key === 'Enter') {
			props.handleNote();
		}
		if (event.metaKey) {
			command = true;
		}
	}
	function onKeyUp(event: KeyboardEvent) {
		if (!event.metaKey) {
			command = false;
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<div class="fixed top-0 z-50 pt-32 w-full h-full bg-black/20" in:fade={{ duration: 200 }}>
	<div
		class="flex flex-col justify-between items-center mx-36 rounded-xl border border-neutral-700 bg-neutral-900"
		in:scale={{ duration: 100, start: 0.8, opacity: 1 }}
	>
		<button
			onclick={() => {
				props.cancel();
			}}
			class="flex justify-center self-end p-2 m-2 mb-0 rounded-lg duration-200 ease-in-out hover:bg-neutral-800"
		>
			<img src={close} alt="X" class="w-3 h-3" />
		</button>
		<input
			bind:value={title}
			use:focus
			class="px-4 pb-8 mb-8 w-full text-xl text-white bg-neutral-900 placeholder:text-neutral-700"
			type="note"
			name="note"
			placeholder="Note"
			required
			autocomplete="off"
		/>

		<div class="flex flex-row self-start mb-2 ml-4">
			<!-- habits -->
			{#each habits as item, index}
				{#if habit == index}
					<button
						class="flex relative flex-row items-center py-2 pr-4 m-0 mr-2 text-xs font-medium rounded-lg border duration-200 ease-in hover:text-white border-neutral-700 bg-[#212121] text-neutral-200 hover:border-neutral-600"
						onclick={() => {
							habit = index;
						}}
					>
						<Indicator category={item.category} />
						<span class="text-xs font-normal">{item.name}</span>

						{#if command}
							<div
								in:fly={{ duration: 200, x: 5 }}
								class="flex absolute right-2 z-50 justify-center items-center self-center w-6 h-5 font-light rounded-[3px] bg-white/10 text-[10px] text-white/80 backdrop-blur"
							>
								{index + 1}
							</div>
						{/if}
					</button>
				{:else}
					<button
						class="flex relative flex-row items-center py-2 pr-4 m-0 mr-2 text-xs font-medium rounded-lg border border-dashed duration-200 ease-in hover:text-white border-neutral-700 bg-[#212121] text-neutral-200 hover:border-neutral-600"
						onclick={() => {
							habit = index;
						}}
					>
						<Indicator category={item.category} />
						<span class="text-xs font-normal text-neutral-500">{item.name}</span>

						{#if command}
							<div
								in:fly={{ duration: 200, x: 5 }}
								class="flex absolute right-2 z-50 justify-center items-center self-center w-6 h-5 font-light rounded-[3px] bg-white/10 text-[10px] text-white/80 backdrop-blur"
							>
								{index + 1}
							</div>
						{/if}
					</button>
				{/if}
			{/each}
			<div class="flex relative flex-col">
				<!-- tags -->
				{#if tag}
					<button
						onclick={() => {
							tagDropdown = !tagDropdown;
						}}
						class="flex flex-row items-center py-2 px-5 m-0 mr-2 text-xs rounded-lg border border-neutral-700 bg-[#212121] text-neutral-200"
					>
						<span>{tag}</span>
						{#if command}
							<div
								in:fly={{ duration: 200, x: 5 }}
								class="flex absolute right-4 z-50 justify-center items-center self-center w-6 h-5 font-light rounded-[3px] bg-white/10 text-[10px] text-white/80 backdrop-blur"
							>
								4
							</div>
						{/if}
					</button>
				{:else}
					<button
						onclick={() => {
							tagDropdown = !tagDropdown;
						}}
						class="flex flex-row items-center py-2 px-5 m-0 mr-2 text-xs font-medium rounded-lg border border-dashed border-neutral-700 bg-[#212121] text-neutral-200"
					>
						<span class="text-xs font-normal text-neutral-500">Tags</span>
						{#if command}
							<div
								in:fly={{ duration: 200, x: 5 }}
								class="flex absolute right-4 z-50 justify-center items-center self-center w-6 h-5 font-light rounded-[3px] bg-white/10 text-[10px] text-white/80 backdrop-blur"
							>
								4
							</div>
						{/if}
					</button>
				{/if}

				<!-- tags dropdown -->
				{#if tagDropdown}
					<div
						class="absolute left-0 top-full z-50 mt-1 w-48 rounded-lg border shadow-lg border-neutral-700 bg-[#212121]"
						transition:slide
					>
						<div class="flex flex-col py-2 px-2">
							{#each tags as item, index}
								<button
									onclick={() => {
										tag = item.name;
										tagDropdown = false;
									}}
									class="flex justify-between py-2 px-4 w-full text-xs text-left rounded-md text-neutral-200 hover:bg-neutral-700"
								>
									<span>{item.name ? item.name : 'No Tag'}</span>
									<span class="text-neutral-400/50">{index + 1}</span>
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="flex justify-between p-3 w-full border-t border-t-neutral-700 bg-black/0">
			<div class="flex flex-row items-center">
				<span class="mx-2 mr-4 text-neutral-700">Game {game_num}</span>
			</div>
			<button
				onclick={() => {
					props.handleNote();
				}}
				class="py-2 px-5 m-0 text-xs font-medium text-black rounded-md duration-200 ease-in hover:bg-white bg-neutral-200"
			>
				Create Note
			</button>
		</div>
	</div>
</div>

<style>
	input:focus {
		outline: none;
	}
</style>
