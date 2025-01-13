<script lang="ts">
	import { goto } from '$app/navigation';
	let email = $state('');
	let password = $state('');
	let error = $state('');

	async function handleAuth(newUser: boolean) {
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
			goto('/home');
		} else {
			const errorData = await res.json(); // Parse the JSON response for error details
			const errorMessage = errorData.error || 'Something went wrong'; // Fallback if no error message is provided
			console.error('Error:', errorMessage);
			error = errorMessage; // Set the error message to display it in the UI
		}
	}
</script>

<div class="flex flex-col">
	<p class="text-white">Email</p>
	<input
		class="my-4 text-white bg-neutral-900"
		bind:value={email}
		type="email"
		id="email"
		name="email"
		required
	/>
	<p class="text-white">Password</p>
	<input
		class="my-4 text-white bg-neutral-900"
		bind:value={password}
		type="password"
		id="password"
		name="password"
		required
	/>

	{#if error != ''}
		<p class="text-red-600">{error}</p>
	{:else}
		<p class="text-black">.</p>
	{/if}
	<button onclick={() => handleAuth(true)} class="py-3 px-10 my-4 text-black bg-white rounded">
		Create Account
	</button>
	<button
		onclick={() => handleAuth(false)}
		class="py-3 px-10 my-4 text-white bg-black rounded border border-white"
		type="submit"
	>
		Sign In
	</button>
</div>
