<script>
	import '../app.css';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<meta property="og:title" content="Locker Formatter" />
	<meta
		property="og:description"
		content="For when you need to crop and print a bunch of images."
	/>
	<meta property="og:image" content="{base}/banner.webp" />
	<meta property="og:locale" content="en_AU" />
</svelte:head>

<slot />
