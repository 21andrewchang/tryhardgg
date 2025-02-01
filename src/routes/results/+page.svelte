<script lang="ts">
	import arrow from '$lib/images/back.svg';
	import ga from '$lib/images/GA.svg';
	import warmogs from '$lib/images/warmogs.svg';
	import zhonyas from '$lib/images/zhonyas.svg';
	import steraks from '$lib/images/steraks.svg';
	import Nav from '$lib/components/Nav.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	let { data } = $props();

	let image = $state('');
	if (data.archetype.color == 'yellow') {
		image = ga;
	} else if (data.archetype.color == 'red') {
		image = steraks;
	} else if (data.archetype.color == 'blue') {
		image = zhonyas;
	} else if (data.archetype.color == 'green') {
		image = warmogs;
	}
	// id: traits.map((trait) => trait[0]).join(''),
	// name,
	// group,
	// category,
	// color
</script>

<div class="flex overflow-y-hidden flex-col w-screen h-screen">
	<Nav />
	<h1 class="mt-28 text-xl text-center text-[#D3D3D3]">Your player archetype is:</h1>
	<h1 class="m-4 text-5xl font-semibold text-center text-[#FAFAFA]">{data.archetype.name}</h1>
	<div class="flex justify-center">
		<div class="flex fixed left-0 bottom-12 justify-center w-full">
			<button
				class="flex flex-row items-center py-2 px-10 text-lg font-light rounded-lg duration-300 ease-in-out text-[#FAFAFA] hover:bg-white/10 hover:backdrop-blur"
				onclick={() => goto('/login')}
			>
				Start Climbing
				<img src={arrow} alt=">" class="ml-4 rotate-180" />
			</button>
		</div>
	</div>
	<div class={data.archetype.color} in:fade={{ duration: 1000 }}></div>
	<img
		src={image}
		in:fade={{ duration: 1000 }}
		alt="img"
		class={data.archetype.color === 'blue' || data.archetype.color === 'yellow'
			? 'right-img'
			: 'left-img'}
	/>
</div>

<style>
	.right-img {
		position: fixed;
		right: 0%;
		bottom: 0%;
	}

	.left-img {
		position: fixed;
		left: 0%;
		bottom: 0%;
	}
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
