<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import CMS from 'decap-cms-app';

	onMount(async () => {
		if (browser) {
			CMS.init({
				config: {
					backend: {
						base_url: window.location.origin,
						auth_endpoint: '/oauth'
					}
				}
			});
		}
	});
</script>

<svelte:head>
	<title>The Rustling of the Leaves</title>
</svelte:head>
