const ROLE = [
    'Sniper: Professional marksman endowed with superhuman precision and camouflage skills.',
    'Infiltrator: Agent or assassin specialized in stealth infiltration of extremely secure places and buildings.',
    'Gunner: Fighter relying on heavy weapons, carrying a portative cannon, a heavy machine-gun or multiple explosives.',
    'Hacker: Cyber-soldier specialized in hacking and data theft.',
    'Animal trainer: Soldier fighting alongside a particular animal, and exercising total control over it (animal probably linked to your codename).',
    'Desperado: Pistolero relying on his superhuman speed and precision with revolvers.',
    'CQC expert: Hand-to-hand specialized soldier, extremely lethal martial artist.',
    'Swordman: Fencer with superhuman skills and reflexes, fighting with a katana or military knives.',
    'Survivalist: Soldier specialized in survival in hostile environment, pathfinding and infiltration.',
    'Rifleman : Versatile soldier with extraordinary military capabilities, usually sent on various battlefields throughout the world.'
];

const REPUTATION = [
    'Reputation Unknown: Whether their career is just beginning or they have meticulously hidden any evidence of their existence, no one knows them.',
    'Emerging reputation: Not a celebrity, but their name is known in the business.',
    'Well-established Reputation: Known by all factions.',
    'Mythical soldier : Everyone knows their name and their face. They are a model and a legendary figure, whether for their incredible career or some incredible feats. Their fighting style is military schools.',
    "Ghost legend: Everyone knows their name but nobody has the slightest idea of who they are, their face, their abilities, etc.... Some even think they're only an urban legend."
];

const PERSONALITYTRAITS = [
    'Overconfident and hotheaded.',
    'Silent and lonely.',
    'Neurotic maniac.',
    'Motherly/Fatherly caring mentor.',
    'Mysterious and enigmatic.',
    'Funny and friendly.',
    'Sadistic and cruel.',
    'Authoritarian and demanding.',
    'Elegant and effeminate.',
    'Flamboyant and extravagant seducer.',
    'Refined intellectual.',
    'Passionate idealist.',
    'Brutal and rude.',
    'Calm and wise.',
    'Brave and heroic.',
    'Cunning and roguish.',
    'Laughing and arrogant.',
    'Cold and pragmatic manipulator.',
    'Badass and charismatic.',
    'Adventurer thirsty for freedom.'
];

const CYBERISATION = [
    'Totally human, no cybernetic implants.',
    'Light cybernetization, some improvements (like night vision, a chip slightly inhibiting pain, etc...)',
    'Improved soldier with injections of nanomachines into the body, increasing physical capacities.',
    'Heavy cyberisation, with at least one bionicle limb (a blade-arm, a robotic shoulder equiped with a small laser rifle, etc...)',
    'Cyborg soldier with at least 95% non-biological components, capable of monstrous physical prowess (super-strength, jumps over ten meters, running faster than a car...).'
];

const EMPLOYER = [
    "Employer: An elite unit of the official army of one of the world's major superpowers.",
    'Employer: A government agency for a first world power, working behind the scene to ensure the security of their nation.',
    'Employer: An extremely powerful and influent corporation.',
    'Employer: Terrorist group in a dicatorial country (but heroic freedom fighters in the eyes of some).',
    'Employer: A squad of professional mercenaries, soldiers for hire, fighting for whoever can pay.',
    'Employer: A group of fellow renegade supersoldiers who work for themselves and are considered as criminals.',
    'Factionless. Independant and solitary soldier who sells their services.'
];

const DISCIPLINE = [
    'Depersonalized soldier, literally a brainwashed human weapon obeying orders without reflection or hesitation.',
    'Extreme loyalty, has accepted their place as a pawn on the chessboard of war and will obey all orders without protest, even if it is a psychological heartbreak.',
    'Obedient professional, rarely discusses orders, except the most aberrant or morally questionable. Will betray their employer only under torture.',
    'Questionable discipline. Is more or less corruptible. Tends to ignore certain orders.',
    'Free electron, obeying only their instinct and carrying out missions in their own way, not that of their employer. Very undisciplined.'
];

//   Psionic potential (1d100):
// 1-10 Possesses esoteric abilities (roll once on the "Paranormal Abilities" Table)
// 11-100 Possesses no esoteric abilities (skip the "Paranormal Abilities" Table)

// Paranormal Abilities (Xd100) (roll only if you're a Psionic):
const PSIONIC = [
    'Telepathy and mindreading.',
    'Telekynesia.',
    'Invisibility.',
    'Accelerated cell regeneration.',
    'Short range teleportation.',
    'Pyromancy.',
    'Cryomancy.',
    'Electricity generation.',
    'Becoming temporarily intangible and going through matter.',
    'Hypnosis and creation of mental illusions.',
    'Probability manipulation and supernatural luck.',
    'Polymorphism.',
    'Astral projection (only during sleep)',
    'Levitation.',
    'Overdeveloped hearing.',
    'Overdeveloped vision.',
    'Overdeveloped sense of smell.',
    'Divination.',
    'Magnetic force field.',
    'Powerful psionic'
];

const QUIRK = [
    'Always tosses a coin when taking a decision',
    'Has a favorite and named weapon. Never goes in mission without it.',
    'Devout religious.',
    'Alcoholic.',
    'Has a favorite punchline.',
    'Always leaves a signature of their passage behind their which identifies them (a sign on the walls, an inscription on a corpse, a business card...)',
    'Drug addict.',
    'Smokes a cigar all the time.',
    'Schizophrenic. Has two very distinct personalities.',
    'Trains a disciple who follows them in all their missions.',
    'Large scar on the face.',
    'Lost a limb (arm or leg).',
    'Is covered with tattoos.',
    'Practice a ritual before each mission (a meditation session for example, or a scarification).',
    'Unusual hair color.',
    'Tick of language.',
    'Wears one color clothes.',
    'Always masked. Never shows their face.',
    'Double identity. Outside the missions, seems to be a common and boring citizen.',
    'Is extremely rich.',
    'Has a a friendly rivalry with a colleague.',
    'Has a nemesis in an other organization.',
    'Is extremely old and experienced.',
    'Is extremely young (child soldier).',
    'Disfigured and very ugly.',
    'Unusual talents (cooking, sewing...)',
    'Has betrayed an organization in the past and is now hunted by its members',
    'Has a sulphurous and forbidden love relationship with a colleague.',
    'Double agent. Secretly loyal to another faction',
    'Has post-traumatic stress disorders.',
    'Has a fetish object.',
    'Has been trained by a legendary soldier.',
    'Fights for a greater cause than just their employer (like world peace).',
    'Has a very distinguishable signature move, in combat.',
    'Beautiful face.',
    'Roll twice on this table.',
    'No quirk.'
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const getDescription = () => {
    const hasPsionic = ROLE[getRandomInt(100)] < 10;

    let descriptionArray = [];
    descriptionArray[0] = ROLE[getRandomInt(ROLE.length)];
    descriptionArray[1] = REPUTATION[getRandomInt(REPUTATION.length)];
    descriptionArray[2] = PERSONALITYTRAITS[getRandomInt(PERSONALITYTRAITS.length)];
    descriptionArray[3] = CYBERISATION[getRandomInt(CYBERISATION.length)];
    descriptionArray[4] = EMPLOYER[getRandomInt(EMPLOYER.length)];
    descriptionArray[5] = DISCIPLINE[getRandomInt(DISCIPLINE.length)];
    descriptionArray[6] = hasPsionic ? PSIONIC[getRandomInt(PSIONIC.length)] : '';
    descriptionArray[7] = QUIRK[getRandomInt(QUIRK.length)];

    console.log('descriptionArray', descriptionArray);
    return descriptionArray;
};
