<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import thumb from '$lib/images/thumb.svg';
	import Indicator from './Indicator.svelte';
	import { cubicOut } from 'svelte/easing';

	let props = $props();
	let habits = Object.values(props.habits);
</script>

<!-- Background Container -->
<div
	class="flex fixed top-0 z-50 flex-col p-10 px-24 w-full h-full bg-[#09090B]/90 backdrop-blur-sm"
	in:fade={{ duration: 300 }}
>
	<!-- Title -->
	<text class="self-start mb-6 text-4xl font-medium text-[#FAFAFA]">Session Summary</text>

	<!-- Top Stats Row -->
	<div class="flex flex-row justify-between space-x-6">
		{#each ['Total Notes', 'Total Notes Taken', 'Total Notes Taken'] as label, index}
			<div
				in:fly|global={{ y: 50, duration: 300, delay: 300 + index * 100, easing: cubicOut }}
				class="flex flex-col justify-between items-center py-2 px-8 w-full rounded-xl border border-[#202020] bg-[#09090B]"
			>
				<text class="self-start my-2 text-sm text-[#FAFAFA]">{label}</text>
				<text class="self-start my-2 text-2xl font-semibold text-[#FAFAFA]"
					>{props.total_notes}</text
				>
			</div>
		{/each}
	</div>

	<!-- Habit List Wrapper -->
	<div class="flex flex-col flex-grow mt-6 space-y-6">
		{#each habits as habit, index}
			<div
				in:fly|global={{ y: 50, duration: 300, delay: 700 + index * 100, easing: cubicOut }}
				class="flex flex-col justify-between mb-2 space-y-2 rounded-xl"
			>
				<div class="flex flex-row justify-between items-center">
					<div class="flex flex-row items-center">
						<Indicator category={habit.category} size={'xl'} />
						<span class="mx-2 text-xl font-semibold text-[#E2E2E2]">{habit.name}</span>
					</div>

					<!-- Good and Bad Counts -->
					<div class="flex flex-row items-center space-x-4">
						<div class="flex flex-row items-center space-x-1">
							<img src={thumb} alt="thumb" class="h-[14px] w-[14px]" />
							<span class="text-sm font-light text-[#E2E2E2]">{habit.goodCount}</span>
						</div>
						<div class="flex flex-row items-center space-x-1">
							<img
								src={thumb}
								alt="thumb"
								class="h-[14px] w-[14px]"
								style="transform: rotate(180deg);"
							/>
							<span class="text-sm font-light text-[#E2E2E2]">{habit.badCount}</span>
						</div>
					</div>
				</div>
				<div class="flex flex-row justify-between items-center space-x-6">
					<div
						class="flex flex-col justify-between items-center py-2 px-8 w-full rounded-xl border border-[#202020] bg-[#09090B]"
					>
						<text class="self-start my-2 text-sm text-[#FAFAFA]">Mastery Level</text>
						<text class="self-start my-2 text-2xl font-semibold text-[#FAFAFA]"
							>{props.mastery[habit.id].lvl}</text
						>
					</div>
					<div
						class="flex flex-col justify-between items-center py-2 px-8 w-full rounded-xl border border-[#202020] bg-[#09090B]"
					>
						<text class="self-start my-2 text-sm text-[#FAFAFA]">Mastery Points</text>
						<text class="self-start my-2 text-2xl font-semibold text-[#FAFAFA]"
							>{props.mastery[habit.id].points}</text
						>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Keep Button Fixed at Bottom -->
	<div class="flex fixed left-0 bottom-8 justify-center w-full">
		<button
			class="py-2 px-10 text-sm font-semibold rounded-lg duration-200 ease-in-out text-[#FAFAFA] hover:bg-white/10"
			onclick={() => props.nextSession()}
		>
			Continue
		</button>
	</div>
</div>
