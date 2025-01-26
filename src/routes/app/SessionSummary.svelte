<script lang="ts">
	import { fade, fly, scale, slide } from 'svelte/transition';
	import thumb from '$lib/images/thumb.svg';
	import Indicator from './Indicator.svelte';
	import { cubicOut } from 'svelte/easing';

	let props = $props();

	let habits = Object.values(props.habits);
</script>

<div
	class="flex fixed top-0 z-50 flex-col flex-1 p-10 px-24 w-full h-full bg-[#09090B]/90 backdrop-blur-sm"
	in:fade={{ duration: 300 }}
>
	<text class="self-start my-4 text-4xl font-medium text-[#FAFAFA]">Session Summary</text>
	<div class="flex flex-col my-6">
		<text class="self-start mb-2 text-2xl text-[#FAFAFA]">This Block's Focuses</text>
		<div class="flex flex-row justify-between w-full">
			{#each habits as habit, index}
				<div
					class="flex justify-between items-center px-10 h-10 rounded-xl border border-[#202020] bg-[#09090B]"
					in:fly|global={{ y: 50, duration: 300, delay: 300 + index * 100, easing: cubicOut }}
				>
					<div class="flex flex-row items-center">
						<Indicator category={habit.category} />
						<span class="mx-2 text-xs font-light text-[#E2E2E2]">{habit.name}</span>
					</div>
					<!-- good and bad count -->
					<div class="flex flex-row items-center space-x-4">
						<div class="flex flex-row items-center space-x-1">
							<img
								src={thumb}
								alt="thumb"
								class="transition-transform duration-300 transform h-[10px] w-[10px]"
								style="transform: rotate(0deg);"
							/>
							<span class="font-light text-[10px] text-[#E2E2E2]">{habit.goodCount}</span>
						</div>

						<div class="flex flex-row items-center space-x-1">
							<img
								src={thumb}
								alt="thumb"
								class="transition-transform duration-300 transform h-[10px] w-[10px]"
								style="transform: rotate(180deg);"
							/>
							<span class="font-light text-[10px] text-[#E2E2E2]">{habit.badCount}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<text class="self-start my-2 text-2xl text-[#FAFAFA]">Total Notes Taken</text>
	<text class="self-start my-2 text-2xl text-[#FAFAFA]">{props.total_notes}</text>

	<button
		class="flex fixed bottom-8 justify-center items-center self-center py-1 px-10 h-9 text-xs font-semibold rounded-lg duration-200 ease-in-out text-[#FAFAFA] hover:bg-white/10"
		onclick={() => {
			props.nextSession();
		}}
	>
		Continue
	</button>
</div>
