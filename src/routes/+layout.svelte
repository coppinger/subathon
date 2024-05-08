<script lang="ts">
	import '../app.pcss';

	import '@fontsource-variable/manrope';
</script>

<svelte:head>
	<title>TheCoppinger — Let's do it live</title>
	<meta name="description" content="Let's do it live!" />
	<meta name="keywords" content="TheCoppinger, Twitch" />
	<!-- Favicon -->
	<link rel="icon" href="/favicon.png" />
	<!-- Open Graph -->
	<meta property="og:title" content="TheCoppinger — Let's do it live" />
	<meta property="og:description" content="Let's do it live!" />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:url" content="https://thecoppinger.com" />
</svelte:head>

<div class="text-white">
	<slot />
</div>
