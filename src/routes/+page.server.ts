import { error, redirect } from '@sveltejs/kit';

import type { Page } from 'bits-ui';

export const load = async ({ locals: { supabase } }) => {
	const { data: endTimeData, error: endTimeError } = await supabase
		.from('end_time')
		.select('*')
		.single();

	if (endTimeError) {
		return error(400, endTimeError);
	}

	const { data: checksInsByDay, error: checksInsByError } = await supabase
		.from('check_ins_by_day')
		.select('*');

	if (checksInsByError) {
		return error(400, checksInsByError);
	}

	return { checksInsByDay, endTimeData };
};

export const actions = {
	// dummydata: async ({ locals: { supabase } }) => {
	// 	const { data: userData, error: userError } = await supabase
	// 		.from('profiles')
	// 		.select('*')
	// 		.eq('twitch_username', 'thecoppinger')
	// 		.single();

	// 	if (userError) {
	// 		console.error(userError);
	// 		return { userError };
	// 	}

	// 	// Generate a UUID

	// 	const payload = [
	// 		{
	// 			id: crypto.randomUUID(),
	// 			created_at: new Date().toISOString(),
	// 			profile_id: userData.id
	// 		},
	// 		{
	// 			id: crypto.randomUUID(),
	// 			created_at: '2024-04-04 21:38:12+00',
	// 			profile_id: userData.id
	// 		},
	// 		{
	// 			id: crypto.randomUUID(),
	// 			created_at: '2024-04-03 21:38:12+00',
	// 			profile_id: userData.id
	// 		},
	// 		{
	// 			id: crypto.randomUUID(),
	// 			created_at: '2024-04-02 21:38:12+00',
	// 			profile_id: userData.id
	// 		},
	// 		{
	// 			id: crypto.randomUUID(),
	// 			created_at: '2024-03-25 21:38:12+00',
	// 			profile_id: userData.id
	// 		},
	// 		{
	// 			id: crypto.randomUUID(),
	// 			created_at: '2024-04-02 21:38:12+00',
	// 			profile_id: userData.id
	// 		},
	// 		{
	// 			id: crypto.randomUUID(),
	// 			created_at: '2024-04-01 21:38:12+00',
	// 			profile_id: userData.id
	// 		}
	// 	];

	// 	const { error } = await supabase.from('check_ins').insert(payload);

	// 	if (error) {
	// 		console.error(error);
	// 		return { error };
	// 	}
	// },
	login: async ({ locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'twitch',
			options: {
				redirectTo: 'http://localhost:5173/auth/callback'
			}
		});
		if (error) {
			console.error(error);
			return redirect(303, '/auth/error');
		} else {
			return redirect(303, data.url);
		}
	},
	check_in: async ({ locals: { session, supabase } }) => {
		const currentDate = new Date();
		const startDate = new Date(
			Date.UTC(
				currentDate.getUTCFullYear(),
				currentDate.getUTCMonth(),
				currentDate.getUTCDate(),
				0,
				0,
				0
			)
		);

		const { error } = await supabase.from('check_ins').insert({
			profile_id: session?.user?.id
		});

		if (error) {
			console.error(error);
			return { error };
		}

		return { success: true };
	}
};
