// src/utils/characterGenerator.ts
export interface Character {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
}

export function roll4d6DropLowest(): number {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    return rolls.sort((a, b) => a - b).slice(1).reduce((a, b) => a + b, 0);
}

export function generateCharacter(): Character {
    return {
        Strength: roll4d6DropLowest(),
        Dexterity: roll4d6DropLowest(),
        Constitution: roll4d6DropLowest(),
        Intelligence: roll4d6DropLowest(),
        Wisdom: roll4d6DropLowest(),
        Charisma: roll4d6DropLowest(),
    };
}

export function generateCharacters(numCharacters: number): Character[] {
    return Array.from({ length: numCharacters }, generateCharacter);
}
