export const load = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.from('end_time').select('*').single();

	const { data: checkInsWithProfiles, error: checkInsError } = await supabase
		.from('check_ins')
		.select(
			`
            *,
            profiles ( id, twitch_username, pfp_url )
            
        `
		);

	if (error) {
		console.error(error);
		return { error };
	}
	return { end_time: data, checkInsWithProfiles };
};
