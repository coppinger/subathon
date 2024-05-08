<script lang="ts">
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { format, eachDayOfInterval, parseISO, getYear } from 'date-fns';
	import { X } from 'lucide-svelte';

	import { Skeleton } from '$lib/components/ui/skeleton';

	import { formatInTimeZone } from 'date-fns-tz';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button/index.js';

	import type { PageData } from './$types';

	export let data: PageData;
	let { session, checksInsByDay } = data;
	$: ({ session, user } = data);

	let arr = Object.entries(Object.groupBy(checksInsByDay, (item) => item.day!));

	let dialogOpen = false;

	let twitchReady: boolean = false;

	export let form;

	onMount(() => {
		twitchReady = true;
		if (form?.success) {
			toast.success('Check-in successful!', { icon: '👏' });
		}
		if (form?.error && form?.error.code === '23505') {
			toast.success('Already checked-in!', { icon: ' 💖' });
		} else if (form?.error) {
			toast.error('Check-in failed!', { icon: '😥' });
		}
	});
</script>

<Toaster />

<div class="h-3 w-full bg-pink-500"></div>
<div class="h-3 w-full bg-violet-700"></div>
<div class="h-3 w-full bg-blue-900"></div>

<div class="min-w-screen flex min-h-screen flex-col items-center gap-16 bg-neutral-950 p-8">
	<div class="w-full max-w-[400px]">
		<svg viewBox="0 0 1613 714" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M160.667 193C161.096 196.865 164.35 199.839 168.148 199.889C184.014 200.098 202.8 196.953 217.259 190.408C230.239 184.531 237.871 165.08 219.333 159.37C196.858 152.448 179.007 183.285 173.407 199.815C163.291 229.68 172.892 271.553 202.074 287.667C226.599 301.209 263.421 302.363 290.148 295.741C321.071 288.079 331.055 258.578 346 234.333"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M338 105C336.328 105.239 340.137 114.17 340.37 115.222C347.934 149.356 352.28 184.226 359.333 218.482C360.671 224.979 365.256 248.384 369.704 257.445C375.398 269.043 370.722 255.427 376.667 261"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M338 201C359.261 181.867 401.453 187.036 427.333 185"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M460.667 141C459.123 137.526 458.891 133.719 458 130.037C456.187 122.55 454.126 114.821 451.778 107.519C448.482 97.2704 444.842 94.7897 440.667 87.6667"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M540.667 214.333C535.886 214.333 537.837 216.737 538 219.667C539.602 248.506 573.367 274.369 601.333 266.704C614.251 263.163 627.363 250.654 627.778 236.556C628.041 227.598 619.792 220.413 613.778 215C599.449 202.104 582.271 193.638 567.482 181.519C550.147 167.314 535.407 144.533 540.37 121.37C546.417 93.1532 576.919 97.2127 599.333 98.3335"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M978 127.667C976.646 122.252 961.665 126.59 959.63 127.37C933.047 137.565 913.158 156.137 899.482 181.148C889.58 199.256 883.086 219.318 889.111 239.963C892.813 252.648 904.774 275.431 921.704 273C938.372 270.607 947.68 253.127 953.778 240.185C971.653 202.247 975.523 158.94 972.815 117.593C970.549 83 960.03 49.4528 947.704 17.2963C929.696 -29.6814 975.255 114.118 991.482 161.741C1002.42 193.833 1014.29 225.789 1031.85 254.926C1039.18 267.092 1046.37 272.576 1055.33 282.333"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M1123.33 127.667C1109.8 127.667 1099.83 145.307 1094.3 155.37C1073.83 192.573 1109.52 268.428 1158.3 237.593C1200.54 210.89 1196.62 158.847 1160.52 130.037C1153.87 124.734 1138.82 117.853 1128.96 117.148C1118.17 116.377 1127.42 119.11 1120.67 121"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M1466 146.333C1463.51 146.644 1464.74 151.616 1464.96 153.296C1469.53 187.982 1470.95 220.647 1480.67 254.333"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M1456.67 81C1453.37 83.9319 1453.55 84.1099 1458 86.3334"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M1518 71.6667C1516.51 72.3052 1517.65 74.5807 1518 75.6667C1521.85 87.666 1522.84 100.17 1524.37 112.704C1529.77 156.78 1532.24 201.799 1540.67 245.445C1540.73 245.751 1542.96 257.225 1545.7 258.926C1547.49 260.029 1548.12 255.271 1550 254.333"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M1524.67 185C1527.53 182.135 1529.76 180.502 1533.85 179.222C1557.45 171.848 1581.7 169.708 1606 166.333"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M276 436.198C276.337 439.231 278.523 442.518 279.527 445.417C302.16 510.772 300.316 581.197 306.371 649.213C310.718 698.046 308.596 657.189 308.526 637.052C308.336 582.624 304.619 529.183 298.925 475.035C297.779 464.141 297.367 451.889 294.026 441.298C289.779 427.834 300.443 468.807 303.04 482.685C312.895 535.356 320.785 588.411 332.235 640.779C334.939 653.149 345.503 689.636 342.816 677.262C328.65 612.029 308.385 548.354 298.337 482.096C296.799 471.955 289.436 443.731 295.398 433.452C296.738 431.142 297.735 438.304 298.337 440.906C300.852 451.779 303.472 467.593 304.999 477.781C311.883 523.692 317.307 569.926 322.438 616.064C324.829 637.569 328.69 661.336 322.046 682.558C320.401 687.811 309.938 700.781 312.053 695.699C313.962 691.114 341.181 689.393 342.228 689.227C380.163 683.202 417.759 675.277 455.677 669.22C470.752 666.812 503.122 664.133 463.515 671.966C415.171 681.526 271.227 715.355 319.303 704.526C365.36 694.152 413.378 689.576 459.988 682.361C463.608 681.801 505.328 675.227 515.83 673.927C519.46 673.478 528.439 670.652 526.803 673.927C522.467 682.608 480.948 688.126 473.899 689.619C442.198 696.332 410.458 697.898 378.281 700.407C363.055 701.594 348.459 705.236 333.41 706.88C322.751 708.044 353.873 700.449 364.173 697.465"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M634.026 423.904C634.026 425.802 633.848 427.751 634.42 429.588C636.338 435.752 636.599 437.758 637.663 446.248C643.939 496.319 648.858 546.546 655.451 596.582C659.641 628.382 663.88 660.261 671.962 691.349C672.517 693.481 672.955 695.656 673.731 697.719C676.169 704.203 670.228 684.311 668.817 677.531C661.155 640.709 657.513 603.621 653.289 566.299C649.266 530.757 629.287 425.261 636.189 460.36C647.917 520.006 654.027 582.827 670.095 641.368C683.925 691.759 653.683 538.165 644.542 486.723C641.022 466.907 635.88 445.584 635.206 425.276C634.843 414.342 643.043 445.784 645.525 456.44C654.873 496.574 662.027 537.138 668.817 577.766C671.392 593.17 673.699 608.619 676.286 624.022C678.137 635.038 675.713 619.399 676.483 623.238"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M806.603 463.051C806.603 458.921 803.843 452.052 810.13 459.914C814.609 465.516 816.717 471.21 819.534 478.144C837.627 522.689 853.925 567.964 871.255 612.806C880.326 636.278 889.246 667.106 903.287 689.056C919.285 714.067 884.226 632.804 873.9 604.966C857.132 559.764 809.259 423.375 827.86 467.853C845.366 509.71 860.404 552.621 877.72 594.577C926.661 713.162 872.068 579.83 902.993 652.989C906.232 660.653 903.416 656.838 900.25 651.421C873.687 605.971 853.35 555.39 835.99 505.782C830.492 490.069 825.323 474.003 821.591 457.758C821.181 455.975 820.553 450.764 821.591 452.27C824.804 456.931 829.359 469.771 830.309 472.361C853.565 535.821 870.933 601.304 892.805 665.24C895.13 672.035 893.266 683.194 900.054 685.528C900.952 685.837 901.502 684.227 901.915 683.372C906.381 674.128 909.119 664.145 912.788 654.558C933.793 599.669 964.37 550.316 996.247 501.176C1000.06 495.3 1003.86 489.417 1007.81 483.632C1010.71 479.376 1012.9 469.582 1017.6 471.675C1021.92 473.594 1001.83 509.58 1001.54 510.094C969.881 565.089 929.448 616.154 905.148 675.139C902.393 681.827 900.962 689.36 897.605 695.819C894.438 701.912 902.081 682.738 905.54 676.805C937.75 621.558 978.191 571.198 1017.31 520.777C1043.17 487.437 1019.51 518.426 1009.37 530.088"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M1221.22 465C1221.5 467.236 1224.1 467.822 1224.74 470.374C1226.37 476.898 1226.85 478.641 1226.1 486.983C1221.42 539.295 1212.59 591.631 1202.84 643.208C1202.09 647.16 1198.79 679.508 1192.28 684.828C1191.03 685.85 1194.26 681.997 1195.8 681.507C1233.47 669.478 1274.46 665.576 1313.5 661.185C1370.86 654.732 1337.82 658.952 1377.33 655.518C1382.17 655.098 1367.62 655.131 1362.77 655.225C1312.72 656.196 1265.22 666.455 1215.94 672.518C1204.04 673.982 1239.97 673.191 1251.91 672.127C1299.95 667.848 1348.37 658.716 1396.79 661.966C1402.91 662.378 1418.83 664.241 1425.53 669.196C1429.17 671.891 1425.16 674.846 1423.18 675.645C1406.48 682.374 1383.86 682.437 1366.29 682.484C1346.6 682.536 1326.16 680.609 1306.66 677.794C1292.53 675.756 1296.97 672.471 1295.12 661.966"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M1230 544C1230 552.522 1252.17 550.514 1255.94 550.62C1290.77 551.593 1331.47 546.176 1365.42 555.487C1371.44 557.139 1352.99 556.927 1346.74 557.142C1320.48 558.045 1294.24 558.632 1268.03 560.744C1261.77 561.248 1255.51 561.829 1249.26 562.496C1244.65 562.989 1237.58 560.524 1235.5 564.638C1235.09 565.459 1237.33 564.952 1238.25 565.027C1245.26 565.593 1252.39 565.606 1259.38 565.416C1285.94 564.698 1312.26 561.643 1338.69 559.186C1353.17 557.839 1376.86 552.606 1391.65 557.823C1397.9 560.025 1380.76 566.092 1374.26 567.363C1356.25 570.885 1337.75 571.921 1319.52 573.788C1306.02 575.173 1291.8 577.893 1278.15 576.709C1262.76 575.374 1265.7 572.196 1261.84 563.275"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M1231.88 436.656C1231.6 434.699 1229.98 437.686 1232.77 438.296C1241.73 440.257 1254.43 438.373 1262.86 438.392C1297.1 438.47 1399.46 442.544 1365.58 437.717C1324.5 431.865 1280.37 446.994 1238.75 446.688C1235.87 446.667 1232.99 446.466 1230.12 446.302C1229.17 446.249 1232.02 446.259 1232.96 446.302C1257.82 447.432 1282.55 445.187 1307.35 443.698C1332.25 442.203 1357.1 440.772 1382.04 442.251C1385.57 442.46 1415.29 443.832 1392.43 446.495C1342.5 452.312 1293.76 457.337 1245.21 470.805C1232.84 474.237 1209.19 474.725 1233.65 473.12"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
			<path
				d="M8.66674 90.3335C6.90565 90.5536 7.57212 91.8575 8.07412 93.1483C15.5516 112.376 16.1016 136.703 19.4815 156.482C28.2284 207.667 36.873 260.569 60.6667 307.371C64.7885 315.478 72.2508 331.321 84 330.482C101.405 329.238 106.201 307.464 115.333 297"
				stroke="white"
				stroke-width="14"
				stroke-linecap="round"
			/>
		</svg>
	</div>
	<div class="flex flex-col items-center gap-4">
		<p class="text-xl font-semibold text-slate-400">May Subathon 2024</p>
		<p class="max-w-md text-neutral-50">
			31 days of live streaming, for the entire month of May 2024. Will he make it? Will he go
			insane? Is he insane already? Many questions, not many answers. One thing is for sure
			though... we're going to do it live 🫡<br />
		</p>
	</div>
	{#if twitchReady}
		<div class="flex h-64 max-w-96">
			<iframe
				loading="lazy"
				title="thecoppinger Twitch Stream"
				src="https://player.twitch.tv/?autoplay=true&muted=true&parent=www.thecoppinger.com&channel=thecoppinger&parent=localhost"
				height="100%"
				width="100%"
				frameborder="0"
			>
			</iframe>
		</div>
	{:else}
		<Skeleton class="h-[300px] w-[256px] rounded-lg" />
	{/if}
	{#if session?.user}
		<form action="?/check_in" method="POST" class="flex flex-col items-center gap-2">
			<Button type="submit">Check-in</Button>
			{#if form?.error && form?.error.code === '23505'}
				<p class="text-green-500">You've already checked in today, homie! 💖</p>
			{:else if form?.error}
				<p class="text-red-500">
					Sorry, something's gone wrong. Please hop on the stream and let me know what happened.
				</p>
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
	{#each arr as [day, blob]}
		<p class="text-xl font-semibold text-slate-400">
			{formatInTimeZone(new Date(day), 'Pacific/Auckland', 'EEEE, MMMM d, yyyy')}
		</p>
		<div class="flex flex-wrap gap-2">
			{#each blob as { pfp_url, twitch_username: username }}
				<a href={`https://www.twitch.tv/${username}`} target="_blank">
					<img class="h-16 w-16 rounded-full" src={pfp_url} alt="" /></a
				>
			{/each}
		</div>

		{#if new Date().toISOString() < day}
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
	{/each}
	<!-- <form action="?/dummydata" method="POST">
		<button>Dummy Data</button>
	</form> -->
</div>
