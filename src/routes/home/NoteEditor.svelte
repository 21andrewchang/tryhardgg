<script lang="ts">
	import close from '$lib/images/close.svg';
	import { fade, fly, slide } from 'svelte/transition';
	import { scale } from 'svelte/transition';
	let { title = $bindable(), habit = $bindable(), ...props } = $props();
	let command = $state(false);

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
			class="flex justify-center items-center self-end p-2 m-2 mb-0 rounded-lg duration-200 ease-in-out hover:bg-neutral-800"
		>
			<img src={close} alt="X" class="w-3 h-3" />
		</button>
		<input
			bind:value={title}
			use:focus
			class="px-4 w-full text-xl text-white bg-neutral-900 placeholder:text-neutral-700"
			type="note"
			name="note"
			placeholder="Title"
			required
		/>
		<input
			class="p-4 mb-2 w-full text-xl text-white bg-neutral-900 placeholder:text-neutral-700"
			type="note"
			name="note"
			placeholder="Description"
		/>
		<div class="flex justify-between p-3 w-full border-t border-t-neutral-700 bg-black/0">
			<div class="flex flex-row">
				<button
					class="flex flex-row items-center py-2 px-5 m-0 mr-2 text-xs font-medium rounded-full border duration-200 ease-in hover:text-white border-white/0 bg-black/0 text-neutral-200 hover:border-neutral-600"
					onclick={() => {
						habit = 0;
					}}
				>
					<div class="mr-1 w-2 h-2 bg-red-600 rounded-full"></div>
					<span>Objective Timer</span>
					{#if command}
						<div
							in:fly={{ duration: 200, delay: 500, x: 5 }}
							class="flex justify-center items-center ml-2 w-6 h-5 font-light rounded-[3px] bg-white/10 text-[10px] text-white/80"
						>
							1
						</div>
					{:else}
						<div class="ml-2 w-6 h-5 rounded-[2px]"></div>
					{/if}
				</button>
				<button
					class="flex flex-row items-center py-2 px-5 m-0 mr-2 text-xs font-medium rounded-full border duration-200 hover:text-white easee-in border-white/0 bg-black/0 text-neutral-200 hover:border-neutral-600"
					onclick={() => {
						habit = 1;
					}}
				>
					<div class="mr-1 w-2 h-2 bg-green-500 rounded-full"></div>
					<span>Man Advantage</span>
					{#if command}
						<div
							in:fly={{ duration: 200, delay: 500, x: 5 }}
							class="flex justify-center items-center ml-2 w-6 h-5 font-light rounded-[3px] bg-white/10 text-[10px] text-white/80"
						>
							2
						</div>
					{:else}
						<div class="ml-2 w-6 h-5 rounded-[2px]"></div>
					{/if}
				</button>
				<button
					class="flex flex-row items-center py-2 px-5 m-0 mr-2 text-xs font-medium rounded-full border duration-200 hover:text-white easee-in border-white/0 bg-black/0 text-neutral-200 hover:border-neutral-600"
					onclick={() => {
						habit = 2;
					}}
				>
					<div class="mr-1 w-2 h-2 bg-blue-600 rounded-full"></div>
					<span>Check Map</span>
					{#if command}
						<div
							in:fly={{ duration: 200, delay: 500, x: 5 }}
							class="flex justify-center items-center ml-2 w-6 h-5 font-light rounded-[3px] bg-white/10 text-[10px] text-white/80"
						>
							3
						</div>
					{:else}
						<div class="ml-2 w-6 h-5 rounded-[2px]"></div>
					{/if}
				</button>
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
