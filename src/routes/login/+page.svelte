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
			goto('/app');
		} else {
			const errorData = await res.json(); // Parse the JSON response for error details
			const errorMessage = errorData.error || 'Something went wrong'; // Fallback if no error message is provided
			console.error('Error:', errorMessage);
			error = errorMessage; // Set the error message to display it in the UI
		}
	}
</script>

<div class="flex justify-center items-center h-screen">
	<div class="flex-col items-center px-8 rounded-lg border border-[#202020] backdrop-blur-md">
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
				class="py-3 px-16 my-4 text-black rounded bg-[#D3D3D3]"
			>
				Create Account
			</button>
			<button
				onclick={() => handleAuth(false)}
				class="py-3 px-16 my-4 bg-black rounded border border-[#202020] text-[#FAFAFA]"
				type="submit"
			>
				Sign In
			</button>
		</div>
	</div>
</div>
