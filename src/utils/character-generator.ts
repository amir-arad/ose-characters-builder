import names from  './names.json';

export type Gender = keyof typeof names;
const GENDERS : Gender[] = ['male', 'female'] as const;
export type Race = keyof typeof names[Gender] //'human' | 'elf' | 'dwarf' | 'halfling';
const RACES : Race[] = ['human', 'elf', 'dwarf', 'halfling'] as const;

export const ATTRIBUTES = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'] as const;
export type Attribute = typeof ATTRIBUTES[number];

export function generateName(gender: Gender, race: Race): string {
    const namesList = names[gender][race];
    const randomIndex = Math.floor(Math.random() * namesList.length);
    return namesList[randomIndex];
}

export function randomElement<T>(list: Array<T>): T {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}


export function roll4d6DropLowest(): number {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    return rolls.sort((a, b) => a - b).slice(1).reduce((a, b) => a + b, 0);
}

function getAdjustment(attribute : number){
    if (attribute <= 3) return -3;
    if (attribute <= 5) return -2;
    if (attribute <= 8) return -1;
    if (attribute <= 12) return 0;
    if (attribute <= 15) return 1;
    if (attribute <= 17) return 2;
    return 3;
}
export function generateCharacter() {
    const gender = randomElement(GENDERS);
    const name = randomElement(RACES.flatMap((r: Race) => names[gender][r]));
    return {
        name,
        gender,
        Strength: roll4d6DropLowest(),
        get StrengthAdj() {
            return getAdjustment(this.Strength);
        },
        Dexterity: roll4d6DropLowest(),
        get DexterityAdj() {
            return getAdjustment(this.Dexterity);
        },
        Constitution: roll4d6DropLowest(),
        get ConstitutionAdj() {
            return getAdjustment(this.Constitution);
        },
        Intelligence: roll4d6DropLowest(),
        get IntelligenceAdj() {
            return getAdjustment(this.Intelligence);
        },
        Wisdom: roll4d6DropLowest(),
        get WisdomAdj() {
            return getAdjustment(this.Wisdom);
        },
        Charisma: roll4d6DropLowest(),
        get CharismaAdj() {
            return getAdjustment(this.Charisma);
        },
    };
}

export type Character = ReturnType<typeof generateCharacter>;

export function generateCharacters(numCharacters: number): Character[] {
    return Array.from({ length: numCharacters }, generateCharacter);
}
