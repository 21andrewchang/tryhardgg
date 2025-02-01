export function load({ cookies }: any) {
	const archetype = JSON.parse(cookies.get('archetype') || '{}');
	return {
		archetype: archetype
	};
}
