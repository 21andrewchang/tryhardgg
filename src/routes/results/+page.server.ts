console.log('RESULTS PAGE SERVER ALSO RUNS ON SPAWN');

export function load({ cookies }: any) {
	console.log('THIS SHOULD PRINT EVERY TIME I NAVIGATE TO RESULTS???');
	const archetype = cookies.get('archetype');
	return {
		archetype: archetype
	};
}
