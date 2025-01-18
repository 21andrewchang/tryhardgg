<script lang="ts">
	import challenger from '$lib/images/challenger.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Progress from '$lib/components/Progress.svelte';
	import Quiz from '$lib/components/Quiz.svelte';
	import { responses } from '../shared.svelte.js';
	let scrollY = $state(0);
	let quizFocus = $derived(responses[0] != -1);

	$effect(() => {
		if (quizFocus) {
			handleQuiz();
		}
	});

	function handleQuiz() {
		smoothScrollTo(512);
	}

	function smoothScrollTo(targetY, duration = 300) {
		const startY = window.scrollY; // Current scroll position
		const distance = targetY - startY; // Distance to scroll
		let startTime = 0;

		function animationStep(timestamp) {
			if (!startTime) startTime = timestamp; // Set the starting time
			const elapsed = timestamp - startTime; // Time elapsed since animation started
			const progress = Math.min(elapsed / duration, 1); // Progress (clamped to 1)

			// Ease-in-out function for smooth transition
			const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

			// Calculate the current scroll position
			const currentY = startY + distance * ease;

			window.scrollTo(0, currentY); // Scroll to the calculated position

			if (progress < 1) {
				requestAnimationFrame(animationStep); // Continue animation
			}
		}

		requestAnimationFrame(animationStep); // Start the animation
	}
</script>

<div class="flex-col justify-center items-center h-screen">
	<Nav />
	<div class="flex flex-row justify-between items-center mt-44 mb-8 ml-20">
		<div>
			<h1 class="text-4xl font-semibold text-white">A Quantitative Way</h1>
			<h1 class="text-4xl font-semibold text-white">to Improve at League of Legends</h1>
			<div class="flex flex-row mt-4">
				<button
					onclick={handleQuiz}
					class="py-2 px-5 my-4 font-medium text-black rounded-md duration-200 ease-in hover:bg-white bg-neutral-200"
				>
					Start climbing
				</button>
				<button
					onclick={handleQuiz}
					class="py-2 px-5 my-4 mx-6 font-medium rounded-md text-white/80 hover:bg-white/10"
				>
					Find Your Player Archetype
				</button>
			</div>
		</div>
		<img src={challenger} alt="chally" class="mr-20 mb-20 w-80 h-80" />
	</div>

	<Progress />
	<Quiz />
</div>

<svelte:window bind:scrollY />

<style>
</style>
