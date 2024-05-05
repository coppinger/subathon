
htmx_page <<"EOF"
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { session } }) => {
	return {
		session
	};
};
<script lang="ts">
	import '../app.pcss';

	import '@fontsource-variable/manrope';

	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	console.log('layout session', session);

	// onMount(() => {
	// 	const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
	// 		if (!newSession) {
	// 			/**
	// 			 * Queue this as a task so the navigation won't prevent the
	// 			 * triggering function from completing
	// 			 */
	// 			setTimeout(() => {
	// 				goto('/', { invalidateAll: true });
	// 			});
	// 		}
	// 		if (newSession?.expires_at !== session?.expires_at) {
	// 			invalidate('supabase:auth');
	// 		}
	// 	});

	// 	return () => data.subscription.unsubscribe();
	// });
</script>

<pre>{JSON.stringify(session, null, 2)}</pre>

<slot />
import { createBrowserClient, createServerClient, isBrowser, parse } from '@supabase/ssr';

import { dev } from '$app/environment';
import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_DEV_URL,
	PUBLIC_DEV_ANON_KEY
} from '$env/static/public';

const _URL = dev ? PUBLIC_DEV_URL : PUBLIC_SUPABASE_URL;
const _ANON_KEY = dev ? PUBLIC_DEV_ANON_KEY : PUBLIC_SUPABASE_ANON_KEY;

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
	/**
	 * Declare a dependency so the layout can be invalidated, for example, on
	 * session refresh.
	 */
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(_URL, _ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get(key) {
						const cookie = parse(document.cookie);
						return cookie[key];
					}
				}
			})
		: createServerClient(_URL, _ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get() {
						return JSON.stringify(data.session);
					}
				}
			});

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	const {
		data: { session }
	} = await supabase.auth.getSession();

	console.log('session', session);

	const {
		data: { user }
	} = await supabase.auth.getUser();

	console.log('user', user);

	return { session, supabase, user };
};
EOF
