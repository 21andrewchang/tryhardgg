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
			5: { investor: 2, realist: 1 },
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
			2: { theorist: 0.75, gambler: 0.5 },
			1: { theorist: 1.25, gambler: 0.75 }
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

export function getArchetype(archetype: string[]): string {
	const archetypes: Map<string[], string> = new Map([
		[['solo_carry', 'theorist', 'pacifist', 'investor'], 'smooth_operator'],
		[['facilitator', 'theorist', 'pacifist', 'investor'], 'lone_wolf'],
		[['solo_carry', 'theorist', 'pacifist', 'gambler'], 'agurin_wannabe'],
		[['facilitator', 'theorist', 'pacifist', 'gambler'], 'strategist'],
		[['solo_carry', 'theorist', 'blood_thirsty', 'investor'], 'mr_1v9'],
		[['facilitator', 'theorist', 'blood_thirsty', 'investor'], 'faker???'],
		[['solo_carry', 'theorist', 'blood_thirsty', 'gambler'], 'elo_terrorist'],
		[['facilitator', 'theorist', 'blood_thirsty', 'gambler'], 'playmaker'],
		[['solo_carry', 'realist', 'blood_thirsty', 'investor'], 'vacuum_cleaner'],
		[['facilitator', 'realist', 'blood_thirsty', 'investor'], 'ksing_support'],
		[['solo_carry', 'realist', 'pacifist', 'investor'], 'stat_padder'],
		[['facilitator', 'realist', 'pacifist', 'investor'], 'pocket_yuumi'],
		[['solo_carry', 'realist', 'blood_thirsty', 'gambler'], 'super_server'],
		[['facilitator', 'realist', 'blood_thirsty', 'gambler'], 'adhd player'],
		[['solo_carry', 'realist', 'pacifist', 'gambler'], 'ints for towers'],
		[['facilitator', 'realist', 'pacifist', 'gambler'], 'shitty engager']
	]);

	for (const [key, endpoint] of archetypes) {
		if (key.every((trait) => archetype.includes(trait))) {
			return endpoint;
		}
	}
	return 'Something is wrong...';
}
