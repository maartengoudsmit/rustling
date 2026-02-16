<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import CMS from 'decap-cms-app';

	onMount(async () => {
		if (browser) {
			CMS.init();
		}
	});
</script>

<svelte:head>
	<title>Content Manager</title>
</svelte:head>
