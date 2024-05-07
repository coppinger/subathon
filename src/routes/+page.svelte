<script lang="ts">
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { format, eachDayOfInterval, parseISO } from 'date-fns';
	import { X } from 'lucide-svelte';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button/index.js';

	import type { PageData } from './$types';

	export let data: PageData;
	let { session, checksInsByDay } = data;
	$: ({ session, user } = data);

	let arr = Object.entries(Object.groupBy(checksInsByDay, (item) => item.day!));

	console.log(arr);

	let dialogOpen = false;

	let twitchReady: boolean = false;

	export let form;

	onMount(() => {
		twitchReady = true;
		if (form?.success) {
			toast.success('Check-in successful!', { icon: '👏' });
		}
		if (form?.error) {
			toast.error('Check-in failed!', { icon: '😥' });
		}
	});
</script>

<Toaster />

<div class="h-3 w-full bg-pink-500"></div>
<div class="h-3 w-full bg-violet-700"></div>
<div class="h-3 w-full bg-blue-900"></div>

<div class="min-w-screen flex min-h-screen flex-col items-center gap-16 bg-neutral-950 p-8">
	{#if twitchReady}
		<iframe
			loading="lazy"
			title="thecoppinger Twitch Stream"
			src="https://player.twitch.tv/?autoplay=true&muted=true&parent=www.thecoppinger.com&channel=thecoppinger"
			height="300px"
			width="400px"
		>
		</iframe>
	{:else}
		<div class="h-[300px] w-full bg-slate-500"></div>
	{/if}

	{#each arr as [day, blob]}
		<p class="text-xl font-semibold text-slate-400">
			{format(new Date(day), 'EEEE, MMMM d, yyyy')}
		</p>
		<div class="flex flex-wrap gap-2">
			{#each blob as { pfp_url, twitch_username: username }}
				<a href={`https://www.twitch.tv/${username}`} target="_blank">
					<img class="h-16 w-16 rounded-full" src={pfp_url} alt="" /></a
				>
			{/each}
		</div>
	{/each}

	<!-- <pre>{JSON.stringify(checkInsWithProfiles, null, 2)}</pre> -->
	<!-- 
	{#each datesWithCheckins as date, i}
		<p class="text-xl font-semibold text-slate-400">
			{date.date}
		</p>
		<div class="flex flex-wrap gap-2">
			{#each date.checkins as { username, pfp_url }}
				<a href={`https://www.twitch.tv/${username}`} target="_blank">
					<img class="h-16 w-16 rounded-full" src={pfp_url} alt="" /></a
				>
			{/each}
		</div>
		{#if new Date().toLocaleDateString('en-US', dateOptions) === date.date}
			{#if session?.user}
				<form action="?/check_in" method="POST" class="flex flex-col items-center gap-2">
					<Button type="submit">Check-in</Button>
					{#if form?.error}
						<p class="text-red-500">{form.error}</p>
					{/if}
				</form>
			{:else}
				<Dialog.Root bind:open={dialogOpen}>
					<Dialog.Trigger>
						<Button>Check-in</Button>
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Login with Twitch</Dialog.Title>
							<Dialog.Description>
								You'll need to login with your Twitch account to check-in.
							</Dialog.Description>
						</Dialog.Header>
						<Dialog.Footer>
							<Button variant="outline" on:click={() => (dialogOpen = false)}>Cancel</Button>
							<form action="?/login" method="POST">
								<Button type="submit">Login</Button>
							</form>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			{/if}
		{/if}
	{/each} -->
	<form action="?/dummydata" method="POST">
		<button>Dummy Data</button>
	</form>
</div>
