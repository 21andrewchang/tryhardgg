<script lang="ts">
	import logo from '$lib/images/logo.svg';
	import { goto } from '$app/navigation';

	function onclick() {
		goto('/login');
	}
</script>

<div class="fixed top-0 z-30 pt-10 w-full bg-black/0 backdrop-blur-md">
	<div
		class="flex flex-row justify-between items-center mx-8 h-14 rounded-2xl border border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.5)] backdrop-blur-md"
	>
		<div class="flex flex-row items-center ml-3">
			<img src={logo} class="w-6 h-6" alt="logo" />
			<p class="text-sm font-semibold text-white">Tryhard.gg</p>
		</div>

		<button
			{onclick}
			class="py-2 px-3 mx-3 text-xs font-semibold text-black rounded-md duration-200 ease-in hover:bg-white bg-neutral-200"
			>Log in</button
		>
	</div>
</div>
