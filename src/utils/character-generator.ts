import {Attribute, Class, GENDERS, Gender, Race, classes} from './system';

import names from  './names.json';

export function generateName(gender: Gender, race: Race): string {
    const namesList = names[gender][race];
    const randomIndex = Math.floor(Math.random() * namesList.length);
    return namesList[randomIndex];
}

export function randomElement<T>(list: ReadonlyArray<T>): T {
    const randomIndex = Math.floor(Math.random() * list.length * 1_000) % list.length;
    return list[randomIndex];
}


export function roll4d6DropLowest(): number {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    return rolls.sort((a, b) => a - b).slice(1).reduce((a, b) => a + b, 0);
}


const ADJUSTMENTS: { [key: number]: number } = {
    3: -3,
    4: -2, 5: -2,
    6: -1, 7: -1, 8: -1,
    9: 0, 10: 0, 11: 0, 12: 0,
    13: 1, 14: 1, 15: 1,
    16: 2, 17: 2,
    18: 3,
};

function getAdjustment(attribute: number): number {
    return ADJUSTMENTS[attribute] || 0;
}
function calculateAveragePrimeRequisite(character: Record<Attribute, number>, primeRequisites: Attribute[]): number {
    return primeRequisites.reduce((sum, attr) => sum + character[attr], 0) / primeRequisites.length;
}

function chooseClass(character: Record<Attribute, number>) {
    let bestClass: { class: Class; avg: number }  = { class: classes[0] as Class, avg: 0 };

    for (const currentClass of (classes as Class[])) {
        const classPrimeAvg = calculateAveragePrimeRequisite(character, currentClass.primeRequisites);
        const candidate = { class: currentClass, avg: classPrimeAvg };
        if (candidate.avg > bestClass.avg) {
            bestClass = candidate;
        } else if (candidate.avg === bestClass.avg) {
            if (Math.random() > 0.5) {
                bestClass = candidate;
            }
        }
    }

    return bestClass.class;
}

export function generateCharacter() {
    const attributes = {
        Strength: roll4d6DropLowest(),
        Dexterity: roll4d6DropLowest(),
        Constitution: roll4d6DropLowest(),
        Intelligence: roll4d6DropLowest(),
        Wisdom: roll4d6DropLowest(),
        Charisma: roll4d6DropLowest(),
    };
    const clazz = chooseClass(attributes);
    const gender = randomElement(GENDERS);
    const name = randomElement(names[gender][clazz.race]);
    const level = 1;
    return {
        name,
        gender,
        class: clazz,
        level,
        ...attributes,
        get StrengthAdj() {return getAdjustment(attributes.Strength);},
        get DexterityAdj() {return getAdjustment(attributes.Dexterity);},
        get ConstitutionAdj() {return getAdjustment(attributes.Constitution);},
        get IntelligenceAdj() {return getAdjustment(attributes.Intelligence);},
        get WisdomAdj() {return getAdjustment(attributes.Wisdom);},
        get CharismaAdj() {return getAdjustment(attributes.Charisma);},
    };
}

export type Character = ReturnType<typeof generateCharacter>;

export function generateCharacters(numCharacters: number): Character[] {
    return Array.from({ length: numCharacters }, generateCharacter);
}
