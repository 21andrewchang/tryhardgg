<script lang="ts">
	let props = $props();
	import back from '$lib/images/back.svg';
	import next from '$lib/images/next.svg';
	import sidebar from '$lib/images/sidebar.svg';
</script>

<div class="flex mb-4 space-x-4">
	<button onclick={props.sidebarT}>
		<div
			class="flex justify-between items-center py-4 px-4 space-x-10 rounded-xl border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#D3D3D3]"
		>
			<img src={sidebar} alt="sidebar" class="w-4 h-4" />
		</div>
	</button>
	<div
		class="flex justify-between items-center py-2 px-4 space-x-10 text-lg rounded-xl border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#D3D3D3]"
	>
		<button class=""><img src={back} alt="back" /></button>
		<button class=""><img src={next} alt="next" /></button>
	</div>
	<div
		class="flex flex-grow items-center px-4 text-xl font-bold rounded-xl border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#FAFAFA]"
	>
		<text class="py-2 mx-2">Session 4</text>
		<text class="py-2 mx-2 font-medium text-[#6C6C6C]">Block 1</text>
	</div>
</div>
