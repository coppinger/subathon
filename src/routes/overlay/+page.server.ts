import { error } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	const { data: endTimeData, error: endTimeError } = await supabase
		.from('end_time')
		.select('*')
		.single();

	if (endTimeError) {
		return error(400, endTimeError);
	}
	return { endTimeData };
};
