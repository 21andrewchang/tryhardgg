<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import thumb from '$lib/images/thumb.svg';
	import Indicator from './Indicator.svelte';
	import { cubicOut } from 'svelte/easing';
	import up from '$lib/images/up_green.svg';

	let props = $props();
	let habits = Object.values(props.habits);
	let leveledUpMastery = $derived(props.leveledUpMastery);

	console.log('summary opened');
	$inspect(props.mastery);
	$inspect(leveledUpMastery);
</script>

<!-- Background Container -->
<div
	class="flex fixed top-0 z-50 flex-col p-10 px-24 w-full h-full bg-[#09090B]/90 backdrop-blur-sm"
	in:fade={{ duration: 300 }}
>
	<!-- Title -->
	<div class="self-start mb-6 text-4xl font-medium text-[#FAFAFA]">Session Summary</div>

	<!-- Top Stats Row -->
	<div class="flex flex-row justify-between space-x-6">
		{#each ['Total Notes', 'Games Played'] as label, index}
			<div
				in:fly|global={{ y: 50, duration: 300, delay: 300 + index * 100, easing: cubicOut }}
				class="flex flex-col justify-between items-center py-2 px-8 w-full rounded-xl border border-[#202020] bg-[#09090B]"
			>
				<text class="self-start my-2 text-sm text-[#FAFAFA]">{label}</text>
				<text class="self-start my-2 text-2xl font-semibold text-[#FAFAFA]"
					>{index == 0 ? props.total_notes : 3}</text
				>
			</div>
		{/each}
	</div>

	<!-- Habit List Wrapper -->
	<div class="flex flex-col flex-grow mt-10 space-y-10">
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
						{#if leveledUpMastery[habit.id]}
							<div class="flex flex-row items-center self-start space-x-2">
								<div class="relative self-start my-2 text-2xl font-semibold text-[#FAFAFA]">
									{leveledUpMastery[habit.id].lvl}
								</div>
								<img src={up} alt="up" class="h-[20px] w-[20px]" />
							</div>
						{:else}
							<div class="self-start my-2 text-2xl font-semibold text-[#FAFAFA]">
								{props.mastery[habit.id].lvl}
							</div>
						{/if}
					</div>
					<div
						class="flex flex-col justify-between items-center py-2 px-8 w-full rounded-xl border border-[#202020] bg-[#09090B]"
					>
						<text class="self-start my-2 text-sm text-[#FAFAFA]">Mastery Points</text>
						{#if leveledUpMastery[habit.id]}
							<div class="flex flex-row items-center self-start space-x-2">
								<div class="relative self-start my-2 text-2xl font-semibold text-[#FAFAFA]">
									{leveledUpMastery[habit.id].points}
								</div>
							</div>
						{:else}
							<div class="self-start my-2 text-2xl font-semibold text-[#FAFAFA]">
								{props.mastery[habit.id].points}
							</div>
						{/if}
					</div>
					<div
						class="flex flex-col justify-between items-center py-2 px-8 w-full rounded-xl border border-[#202020] bg-[#09090B]"
					>
						<text class="self-start my-2 text-sm text-[#FAFAFA]">Notes Tagged</text>

						<div class="self-start my-2 text-2xl font-semibold text-[#FAFAFA]">
							{habit.goodCount + habit.badCount}
						</div>
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
