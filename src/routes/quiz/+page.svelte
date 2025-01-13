<script lang="ts">
	let num = $state(0);
	let email = $state('email');
	function onclick() {
		num += 1;
	}
</script>

<h1>Question 1</h1>
<div>
	<button class="w-8 h-8 border-black" aria-label="strongly_agree"></button>
	<button aria-label="agree"></button>
	<button aria-label="neutral"></button>
	<button aria-label="disagree"></button>
	<button aria-label="strongly_disagree"></button>
</div>
