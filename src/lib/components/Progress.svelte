<script lang="ts">
	import { responses } from '../../shared.svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let scrollY = $state(0);

	// Calculate actual progress percentage based on responses
	let actual = $derived(
		(responses.filter((response) => response !== -1).length / responses.length) * 100
	);

	// Use Tween for smooth progress transitions
	let progress = new Tween(0, {
		duration: 400,
		easing: cubicOut
	});

	// Update Tween progress whenever `actual` changes
	$effect(() => {
		progress.target = actual; // Automatically updates the animation target
	});
</script>

<div
	class="flex z-50 flex-col w-full"
	style:position={scrollY >= 512 ? 'fixed' : 'relative'}
	style:top={scrollY >= 512 ? '95px' : ''}
>
	<!-- Progress bar container -->
	<div class="top-0 z-50 mx-32 bg-[rgba(0,0,0,0.5)] backdrop-blur-md">
		<!-- Base line -->
		<div class="absolute top-0 left-0 w-full h-[1px] bg-[rgba(255,255,255,0.1)]"></div>

		<!-- Glow effect -->
		<div
			class="absolute left-0 rounded-full top-[-4px] h-[12px] bg-[rgba(255,255,255,0.4)] blur-lg"
			style="width: {Math.min(100, progress.current + 3)}%; filter: blur(12px);"
		></div>

		<!-- Progress bar with shadow -->
		<div
			class="absolute left-0 bg-white rounded-full h-[1px] shadow-[0_0_8px_rgba(255,255,255,0.8)]"
			style="width: {Math.min(100, progress.current + 3)}%"
		></div>
	</div>
	<p class="ml-32 text-xs text-white/80">{Math.round(progress.current)}%</p>
</div>

<svelte:window bind:scrollY />

<style>
	.blur-lg {
		filter: blur(8px);
	}
</style>
