type Weights = {
	[key: string]: {
		[key: number]: Partial<ArchetypeScores>;
	};
};

type ArchetypeScores = {
	solo_carry: number;
	facilitator: number;
	theorist: number;
	realist: number;
	blood_thirsty: number;
	pacifist: number;
	investor: number;
	gambler: number;
};

export function calculateArchetype(responses: number[]): string[] {
	const archetype: string[] = [];
	const scores: ArchetypeScores = {
		solo_carry: 0,
		facilitator: 0,
		theorist: 0,
		realist: 0,
		blood_thirsty: 0,
		pacifist: 0,
		investor: 0,
		gambler: 0
	};

	const weights: Weights = {
		q1: {
			5: { solo_carry: 2, theorist: 0.5 },
			4: { solo_carry: 1, theorist: 0.25 },
			3: { facilitator: 0.5, theorist: 0.1 },
			2: { facilitator: 1, realist: 0.25 },
			1: { facilitator: 2, realist: 1 }
		},
		q2: {
			5: { investor: 1, realist: 1 },
			4: { investor: 1, realist: 0.75 },
			3: { gambler: 0.5, realist: 0.5 },
			2: { gambler: 1, theorist: 0.5 },
			1: { gambler: 2, theorist: 1 }
		},
		q3: {
			5: { blood_thirsty: 2, gambler: 1 },
			4: { blood_thirsty: 1, investor: 0.25 },
			3: { pacifist: 0.5, investor: 0.5 },
			2: { pacifist: 1, investor: 0.75 },
			1: { pacifist: 2, investor: 1 }
		},
		q4: {
			5: { realist: 0.5, investor: 1 },
			4: { realist: 0.25, investor: 0.5 },
			3: { theorist: 0.5, gambler: 0.25 },
			2: { theorist: 0.5, gambler: 0.5 },
			1: { theorist: 0.75, gambler: 0.75 }
		}
	};

	for (let i = 0; i < responses.length; i++) {
		const question = `q${i + 1}` as keyof Weights;
		const response = responses[i];
		const weight = weights[question]?.[response];

		if (weight) {
			for (const [key, value] of Object.entries(weight)) {
				scores[key as keyof ArchetypeScores] += value;
			}
		}
	}

	const categories: [keyof ArchetypeScores, keyof ArchetypeScores][] = [
		['solo_carry', 'facilitator'],
		['theorist', 'realist'],
		['blood_thirsty', 'pacifist'],
		['investor', 'gambler']
	];

	categories.forEach(([a, b]) => {
		archetype.push(scores[a] > scores[b] ? a : b);
	});

	return archetype;
}

export function getArchetype(archetype: string[]): {
	id: string;
	name: string;
	group: string;
	category: string;
	color: string;
} {
	const archetypes: {
		traits: string[];
		name: string;
		group: string;
		category: string;
		color: string;
	}[] = [
		{
			traits: ['solo_carry', 'theorist', 'pacifist', 'investor'],
			name: 'Smooth Operator',
			group: 'Architects',
			category: 'Information Gathering',
			color: 'blue'
		},
		{
			traits: ['facilitator', 'theorist', 'pacifist', 'investor'],
			name: 'Lone Wolf',
			group: 'Architects',
			category: 'Information Gathering',
			color: 'blue'
		},
		{
			traits: ['solo_carry', 'theorist', 'pacifist', 'gambler'],
			name: 'Agurin Wannabe',
			group: 'Architects',
			category: 'Information Gathering',
			color: 'blue'
		},
		{
			traits: ['facilitator', 'theorist', 'pacifist', 'gambler'],
			name: 'Strategist',
			group: 'Architects',
			category: 'Information Gathering',
			color: 'blue'
		},
		{
			traits: ['solo_carry', 'theorist', 'blood_thirsty', 'investor'],
			name: 'Mr 1v9',
			group: 'Warlords',
			category: 'Fighting and Mechanics',
			color: 'red'
		},
		{
			traits: ['facilitator', 'theorist', 'blood_thirsty', 'investor'],
			name: 'Faker???',
			group: 'Warlords',
			category: 'Fighting and Mechanics',
			color: 'red'
		},
		{
			traits: ['solo_carry', 'theorist', 'blood_thirsty', 'gambler'],
			name: 'Elo Terrorist',
			group: 'Warlords',
			category: 'Fighting and Mechanics',
			color: 'red'
		},
		{
			traits: ['facilitator', 'theorist', 'blood_thirsty', 'gambler'],
			name: 'Playmaker',
			group: 'Warlords',
			category: 'Fighting and Mechanics',
			color: 'red'
		},
		{
			traits: ['solo_carry', 'realist', 'blood_thirsty', 'investor'],
			name: 'Vacuum Cleaner',
			group: 'Guardians',
			category: 'Income and Strength',
			color: 'green'
		},
		{
			traits: ['facilitator', 'realist', 'blood_thirsty', 'investor'],
			name: 'KSing Support',
			group: 'Guardians',
			category: 'Income and Strength',
			color: 'green'
		},
		{
			traits: ['solo_carry', 'realist', 'pacifist', 'investor'],
			name: 'Stat Padder',
			group: 'Guardians',
			category: 'Income and Strength',
			color: 'green'
		},
		{
			traits: ['facilitator', 'realist', 'pacifist', 'investor'],
			name: 'Pocket Yuumi',
			group: 'Guardians',
			category: 'Income and Strength',
			color: 'green'
		},
		{
			traits: ['solo_carry', 'realist', 'blood_thirsty', 'gambler'],
			name: 'Super Server',
			group: 'Opportunists',
			category: 'Decision Making',
			color: 'yellow'
		},
		{
			traits: ['facilitator', 'realist', 'blood_thirsty', 'gambler'],
			name: 'ADHD Player',
			group: 'Opportunists',
			category: 'Decision Making',
			color: 'yellow'
		},
		{
			traits: ['solo_carry', 'realist', 'pacifist', 'gambler'],
			name: 'Ints for Towers',
			group: 'Opportunists',
			category: 'Decision Making',
			color: 'yellow'
		},
		{
			traits: ['facilitator', 'realist', 'pacifist', 'gambler'],
			name: 'Shitty Engager',
			group: 'Opportunists',
			category: 'Decision Making',
			color: 'yellow'
		}
	];

	for (const { traits, name, group, category, color } of archetypes) {
		if (traits.every((trait) => archetype.includes(trait))) {
			return {
				id: traits.map((trait) => trait[0]).join(''),
				name,
				group,
				category,
				color
			};
		}
	}

	return {
		id: 'unknown',
		name: 'Something is wrong...',
		group: 'unknown',
		category: 'Unknown',
		color: '#FFFFFF'
	};
}
