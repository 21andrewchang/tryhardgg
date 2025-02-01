<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	let { data } = $props();
	const categories = [
		{ name: 'Decision Making', color: 'yellow' },
		{ name: 'Fighting and Mechanics', color: 'red' },
		{ name: 'Information Gathering', color: 'blue' },
		{ name: 'Income and Strength', color: 'green' }
	];
	$inspect(data);
	// id: traits.map((trait) => trait[0]).join(''),
	// name,
	// group,
	// category,
	// color
</script>

<div class="flex overflow-y-hidden flex-col w-screen h-screen">
	<Nav />
	<h1 class="mt-36 text-2xl text-center text-[#D3D3D3]">Your player archetype is:</h1>
	<h1 class="m-10 text-5xl font-semibold text-center text-[#FAFAFA]">{data.archetype.name}</h1>
	<div class="flex justify-center">
		<div class="flex fixed left-0 bottom-12 justify-center w-full">
			<button
				class="py-2 px-10 text-lg font-semibold rounded-lg duration-300 ease-in-out text-[#FAFAFA] hover:bg-white/10 hover:backdrop-blur"
				onclick={() => goto('/login')}
			>
				View Complete Profile
			</button>
		</div>
	</div>
	<div class={data.archetype.color} in:fade={{ duration: 1000 }}></div>
</div>

<style>
	.red {
		overflow: hidden;
		content: '';
		position: fixed;
		bottom: -100%; /* Keep the center of the red glow at the bottom-right */
		width: 200vw; /* Constrain the glow to the edge */
		left: -75%;
		height: 150%; /* Extend height for vertical coverage */
		pointer-events: none;
		background: radial-gradient(
			circle,
			rgba(255, 0, 0, 0.4) 10%,
			rgba(255, 0, 0, 0.2) 50%,
			transparent 100%
		);
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		-webkit-mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		mask-composite: intersect;
		-webkit-mask-composite: intersect;
	}
	.green {
		overflow: hidden;
		content: '';
		position: fixed;
		bottom: -100%; /* Keep the center of the red glow at the bottom-right */
		width: 200vw; /* Constrain the glow to the edge */
		left: -75%;
		height: 150%; /* Extend height for vertical coverage */
		pointer-events: none;
		background: radial-gradient(
			circle,
			rgba(0, 255, 0, 0.4) 10%,
			rgba(0, 255, 0, 0.2) 50%,
			transparent 100%
		);
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		-webkit-mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		mask-composite: intersect;
		-webkit-mask-composite: intersect;
	}
	.blue {
		overflow: hidden;
		content: '';
		position: fixed;
		bottom: -100%; /* Keep the center of the red glow at the bottom-right */
		width: 200vw; /* Constrain the glow to the edge */
		left: -75%;
		height: 150%; /* Extend height for vertical coverage */
		pointer-events: none;
		background: radial-gradient(
			circle,
			rgba(0, 0, 255, 0.4) 10%,
			rgba(0, 0, 255, 0.2) 50%,
			transparent 100%
		);
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		-webkit-mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		mask-composite: intersect;
		-webkit-mask-composite: intersect;
	}
	.yellow {
		overflow: hidden;
		content: '';
		position: fixed;
		bottom: -100%; /* Keep the center of the red glow at the bottom-right */
		width: 200vw; /* Constrain the glow to the edge */
		left: -75%;
		height: 150%; /* Extend height for vertical coverage */
		pointer-events: none;
		background: radial-gradient(
			circle,
			rgba(255, 255, 0, 0.4) 10%,
			rgba(255, 255, 0, 0.2) 50%,
			transparent 100%
		);
		mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		-webkit-mask-image:
			linear-gradient(to top, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%),
			/* Fade at the top */ linear-gradient(to left, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%); /* Fade towards the center */
		mask-composite: intersect;
		-webkit-mask-composite: intersect;
	}
</style>
