<script lang="ts">
	let props = $props();
	import back from '$lib/images/back.svg';
	import next from '$lib/images/next.svg';
</script>

<div class="flex mb-4 space-x-4">
	<div
		class="flex justify-between items-center py-2 px-4 space-x-8 text-lg rounded-xl border shadow-md duration-200 ease-in-out border-[#202020] bg-black/10 text-[#D3D3D3]"
	>
		<button class=""><img src={back} alt="back" /></button>
		<button class=""><img src={next} alt="next" /></button>
	</div>
	<div
		class="flex flex-grow items-center py-2 px-4 text-xl rounded-xl border shadow-md duration-200 ease-in-out border-[#202020] bg-black/10 text-[#D3D3D3]"
	>
		Today
	</div>
</div>
