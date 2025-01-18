export function load({ cookies }: any) {
	console.log('THIS PRINTS EVERY TIME I RELOAD /LOGIN');
	const archetype = cookies.get('archetype');
	return {
		archetype: archetype
	};
}
