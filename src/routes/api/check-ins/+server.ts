import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { CHECKMATE_SECRET_TOKEN } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const token = request.headers.get('Authorization');

	if (token !== `Pelion ${CHECKMATE_SECRET_TOKEN}`) {
		console.log('Unauthorized');
		throw error(401, 'Unauthorized');
	}

	console.log('Authorized');

	let data;

	try {
		data = await request.json();
	} catch (err) {
		error(400, 'Invalid JSON');
	}

	return json({ data });
};
