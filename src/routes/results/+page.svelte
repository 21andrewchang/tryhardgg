<script lang="ts">
	let { data } = $props();
	console.log('test');
</script>

<div>
	<h1 class="m-10 text-2xl text-center text-white">Your Player Archetype Is...</h1>
	<h1 class="m-10 text-2xl text-center text-white">{data.archetype}</h1>

	<div class="flex justify-center">
		<a href="/login" class="text-white">View Complete Profile</a>
	</div>
</div>
