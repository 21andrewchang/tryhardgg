export function load({ cookies }: any) {
	const archetype = cookies.get('archetype');
	return {
		archetype: archetype
	};
}
