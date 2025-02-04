<script lang="ts">
	import { fly, scale, slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import logo from '$lib/images/logo.svg';
	import Nav from '$lib/components/Nav.svelte';
	import ga from '$lib/images/GA.svg';
	import warmogs from '$lib/images/warmogs.svg';
	import zhonyas from '$lib/images/zhonyas.svg';
	import steraks from '$lib/images/steraks.svg';
	let { data } = $props();
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

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

	async function handleAuth(newUser: boolean) {
		if (email && password) {
			loading = true;
			const route = newUser ? 'create' : 'login';
			const body = JSON.stringify({
				email: email,
				password: password
			});

			const res = await fetch(`/auth/${route}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			});
			if (res.ok) {
				goto('/app');
			} else {
				loading = false;
				const errorData = await res.json(); // Parse the JSON response for error details
				const errorMessage = errorData.error || 'Something went wrong'; // Fallback if no error message is provided
				console.error('Error:', errorMessage);
				error = errorMessage; // Set the error message to display it in the UI
			}
		}
	}
</script>

<div class="flex overflow-hidden flex-col justify-center items-center w-screen h-screen">
	<Nav />
	<div
		class="z-50 flex-col items-center rounded-lg border border-[#202020] backdrop-blur-md duration-300 ease-in-out {loading
			? 'pointer-events-none opacity-10 blur-sm'
			: ''}"
		in:scale={{ duration: 300, start: 0.9, opacity: 1 }}
	>
		<div class="px-8 my-8">
			<p class="mb-2 text-xl font-light text-[#FAFAFA]">Email</p>
			<input
				class="p-2 w-full text-xl rounded-md bg-[#202020]/50 text-[#FAFAFA]"
				bind:value={email}
				type="email"
				id="email"
				name="email"
				required
			/>
		</div>
		<div class="px-8 my-8">
			<p class="mb-2 text-xl font-light text-[#FAFAFA]">Password</p>
			<input
				class="p-2 w-full text-xl rounded-md bg-[#202020]/50 text-[#FAFAFA]"
				bind:value={password}
				type="password"
				id="password"
				name="password"
				required
			/>
		</div>

		{#if error != ''}
			<p class="text-red-600">{error}</p>
		{:else}
			<p class="text-black/0">.</p>
		{/if}

		<div class="flex flex-row justify-between items-center px-8 w-full border-t border-[#202020]">
			<button
				onclick={() => handleAuth(false)}
				class="py-3 px-4 my-4 mx-2 w-52 rounded-lg duration-300 ease-in-out bg-[#09090B]/0 text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#09090B]"
				type="submit"
			>
				Sign In
			</button>
			<button
				onclick={() => handleAuth(true)}
				class="py-3 px-4 my-4 mx-2 w-52 rounded-lg duration-300 ease-in-out bg-[#09090B]/0 text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#09090B]"
			>
				Create Account
			</button>
		</div>
	</div>
	{#if loading}
		<img
			src={logo}
			alt="logo"
			class="fixed z-50 self-center w-36 h-36 breathing"
			in:scale={{ duration: 200, start: 0.5, opacity: 1 }}
		/>
	{/if}
	<div class={data.archetype.color}></div>
	<img
		src={image}
		alt="img"
		class={data.archetype.color === 'blue' || data.archetype.color === 'yellow'
			? 'right-img'
			: 'left-img'}
	/>
</div>

<style>
	@keyframes breathing {
		0% {
			transform: scale(0.95);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(0.95);
		}
	}

	.breathing {
		animation: breathing 2s ease-in-out infinite;
	}
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
	input:focus {
		outline: none; /* Removes the default blue outline */
		box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.15);
		transition: box-shadow 0.2s ease-in-out;
	}
</style>
