<script lang="ts">
	import { fly, scale } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import logo from '$lib/images/logo.svg';
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleAuth(newUser: boolean) {
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
</script>

<div class="flex justify-center items-center h-screen">
	<!-- Add a binding on class based on the loading state -->
	<div
		class="flex-col items-center rounded-lg border border-[#202020] px-8 backdrop-blur-md duration-300 ease-in-out {loading
			? 'pointer-events-none opacity-10 blur-sm'
			: ''}"
	>
		<div class="my-8">
			<p class="text-xs font-light text-[#FAFAFA]">Email</p>
			<input
				class="w-full text-white bg-neutral-900"
				bind:value={email}
				type="email"
				id="email"
				name="email"
				required
			/>
		</div>
		<div class="my-8">
			<p class="text-xs font-light text-[#FAFAFA]">Password</p>
			<input
				class="w-full text-white bg-neutral-900"
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

		<div class="flex flex-col">
			<button
				onclick={() => handleAuth(true)}
				class="py-3 px-16 my-4 text-black rounded-lg duration-300 ease-in-out hover:text-white bg-[#FAFAFA] hover:border-[#202020] hover:bg-[#09090B]"
			>
				Create Account
			</button>
			<button
				onclick={() => handleAuth(false)}
				class="py-3 px-16 my-4 rounded-lg border duration-300 ease-in-out border-[#202020] bg-[#09090B] text-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#09090B]"
				type="submit"
			>
				Sign In
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
</style>
