<script lang="ts">
	let props = $props();
	import back from '$lib/images/back.svg';
	import next from '$lib/images/next.svg';
	import sidebar from '$lib/images/sidebar.svg';
</script>

<div class="flex mb-4 space-x-4">
	<button onclick={props.sidebarT}>
		<div
			class="flex justify-between items-center py-4 px-4 rounded-xl border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#D3D3D3]"
		>
			<img src={sidebar} alt="sidebar" class="w-3 h-3" />
		</div>
	</button>
	<div
		class="flex justify-between items-center px-3 space-x-10 text-lg rounded-xl border duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#D3D3D3]"
	>
		<button><img src={back} alt="back" class="h-[10px] w-[10px]" /></button>
		<button><img src={next} alt="next" class="h-[10px] w-[10px]" /></button>
	</div>
	<div
		class="flex flex-grow items-center px-4 text-lg font-bold rounded-xl border shadow-md duration-200 ease-in-out border-[#202020] bg-[#09090B] text-[#FAFAFA]"
	>
		<text class="py-2 mx-1">Session {props.session}</text>
		<text class="py-2 mx-2 font-medium text-[#6C6C6C]">Block {props.block}</text>
	</div>
</div>
