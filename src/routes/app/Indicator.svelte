<script>
	let props = $props();
</script>

{#if props.category == 'red' || props.category == 0}
	<div
		class="mr-2 ml-3 w-2 h-2 rounded-full bg-[#FE2C2D] shadow-[0_0_6px_1px_rgba(255,40,40,0.8)]"
	></div>
{:else if props.category == 'green' || props.category == 1}
	<div
		class="mr-2 ml-3 w-2 h-2 rounded-full bg-[#2BC813] shadow-[0_0_6px_1px_rgba(40,255,40,0.8)]"
	></div>
{:else if props.category == 'blue' || props.category == 2}
	<div
		class="mr-2 ml-3 w-2 h-2 rounded-full bg-[#2C84FF] shadow-[0_0_6px_2px_rgba(40,100,255,0.8)]"
	></div>
{:else}
	<div
		class="mr-1 ml-3 w-2 h-2 rounded-full bg-neutral-200 shadow-[0_0_10px_1px_rgba(255,255,255,0.8)]"
	></div>
{/if}
