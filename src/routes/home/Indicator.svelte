<script>
	let props = $props();
</script>

{#if props.habit == 0}
	<div
		class="mr-1 ml-4 w-2 h-2 rounded-full bg-[#FE2C2D] shadow-[0_0_10px_2px_rgba(255,40,40,0.8)]"
	></div>
{:else if props.habit == 1}
	<div
		class="mr-1 ml-4 w-2 h-2 rounded-full bg-[#2BC813] shadow-[0_0_10px_2px_rgba(40,255,40,0.8)]"
	></div>
{:else}
	<div
		class="mr-1 ml-4 w-2 h-2 rounded-full bg-[#2C84FF] shadow-[0_0_10px_3px_rgba(40,100,255,0.8)]"
	></div>
{/if}
