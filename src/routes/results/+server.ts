import { calculateArchetype, getArchetype } from '$lib/archetype';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const formData = await request.formData();
	const responses = JSON.parse(formData.get('responses') as string);

	const archetypeArray = calculateArchetype(responses);
	const archetype = getArchetype(archetypeArray);

	cookies.set('archetype', JSON.stringify(archetype), {
		path: '/'
	});

	// Return the archetype to the client
	return new Response(JSON.stringify({ archetype }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
