export const RACES = ['human' , 'elf' , 'dwarf' , 'halfling'] as const;
export type Race = typeof RACES[number];
export const GENDERS = ['male', 'female'] as const;
export type Gender = typeof GENDERS[number];
export const ATTRIBUTES = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'] as const;
export type Attribute = typeof ATTRIBUTES[number];
export const SAVING_THROWS = ['deathRayPoison', 'magicWands', 'paralysisTurnToStone', 'dragonBreath', 'spells'] as const;
export type SavingThrow = typeof SAVING_THROWS[number];
export type Die = 4 | 6 | 8 | 10 | 12 | 20;

export type Ability = {
    name: string;
    description: string;
};

export type Class = {
    name: Record<Gender, string>;
    description: string;
    abilities: Ability[];
    race: Race;
    primeRequisites: Attribute[];
    hitDice: Die;
    savingThrows: Record<SavingThrow, number>;
};

export const classes: Class[] =  [
  {
    name: {
      male: "לוחם",
      female: "לוחמת"
    },
    description: ``,
    abilities: [
      {
        name: "",
        description: ""
      }
    ],
    race: "human",
    primeRequisites: ["Strength"],
    hitDice: 10,
    savingThrows: {
      deathRayPoison: 12,
      magicWands: 13,
      paralysisTurnToStone: 14,
      dragonBreath: 15,
      spells: 16
    }
  },
  {
    name: {
      male: "גנב",
      female: "גנבת"
    },
    race: "human",
    description: `גנבים הם אנשים מיוחדים. הם צריכים להיות חכמים, זריזים וזהירים כדי להתגנב ולחקור סודות. גנבים לומדים שפות רבות ולפעמים קצת קסמים. הם עוזרים לחבריהם למצוא דברים נסתרים ולהימלט ממקומות מסוכנים.
    גנבים הם כמו סיירים או מורי דרך שיודעים איך להוביל אותך דרך מקומות מסתוריים ומפחידים. הם זריזים וחריפים.
    להיות גנב זה מקצוע קשה ומסוכן. אם תצליח בו, אולי תוכל להיות מנהיג של קבוצת גנבים. זוהי משימה מורכבת שדורשת כישרונות מיוחדים.`,
    abilities: [
      {
        name: "דקירה בגב",
        description: "כאשר הגנב מתקיף בהפתעה מאחור, הוא זוכה בתוסף +4 לפגיעה וגורם נזק כפול. מדרגה 5 ומעלה הנזק משולש."
      },
      {
        name: "טיפוס על קירות ומצוקים",
        description: "גנבים מסוגלים לטפס על משטחים שאחרים לא יכולים לטפס עליהם. באופן כללי, אם לאדם רגיל יש סיכוי לטפס על קיר מסוים, הגנב יכול כנראה לעשות זאת בלי גלגול כלל."
      },
      {
        name: "מלאכה עדינה",
        description: "זהו הסיכוי להצליח בכיוס או בפירוק מלכודות מכאניות קטנות כדוגמת מחטים רעילות, וגם לפרוץ מנעולים. מיומנות זו משמשת את הגנב גם כאשר הוא בודק אם מכשיר, חור מנעול או מיקום קטן אחר מכילים מלכודת שניתן להסיר. על הגנב להיות מצויד בכלי פריצה לגנב (ראה ברשימת הציוד) על מנת להשתמש במיומנות זו לפריצת מנעולים."
      },
      {
        name: "הקשבה לרעשים",
        description: "גנב יכול לשמוע היטב כאשר הוא מתרכז. לרוב משתמשים במיומנות זו בהאזנה דרך דלתות."
      },
      {
        name: "התגנבות",
        description: "גנבים יכולים להסתתר היטב כאשר הם אורבים בצללים. כולם יכולים להסתתר, כמובן, אבל גנבים נעשים כמעט בלתי נראים, ויכולים להמשיך לנוע בעודם נסתרים. גנבים יכולים גם לנוע בשקט גמור, מבלי להישמע."
      }
    ],
    primeRequisites: ["Dexterity"],
    hitDice: 6,
    savingThrows: {
      deathRayPoison: 13,
      magicWands: 14,
      paralysisTurnToStone: 13,
      dragonBreath: 16,
      spells: 15
    }
  },
  {
    name: {
      male: "כהן",
      female: "כהנת"
    },
    race: "human",
    description: `כוהנים הם אנשים מיוחדים שמשרתים אלים וכוחות גדולים. הם כמו לוחמי קודש שנלחמים בשם האמונה שלהם.
    יש כוהנים שמרפאים ומגנים על אחרים, אבל יש גם כאלה שמגרשים רוחות רעות וכוחות אפלים. לפעמים הכוהנים גם נלחמים יחד עם לוחמים אחרים בקרבות קשים.
    ככל שהכוהן מתמיד ומשתפר, הוא הופך לחזק ומכובד יותר. כוהנים מנוסים יכולים לבנות מקדשים ומנזרים שבהם אנשים רבים מאמינים באל שלהם.
    להיות כוהן זו חוויה מיוחדת - לשרת כוחות גדולים, לעזור לאחרים, וגם להילחם למען האמונה.`,
    abilities: [
      {
        name: "לחשי קדושה",
        description: `כוהנים יכולים להטיל לחשים מיוחדים הנקראים "לחשי קדושה". אלה לחשים חזקים שמגיעים מהאל או הכוח שהכוהן משרת.
        יש רשימה של לחשי קדושה שונים, וכל יום הכוהן יכול לבחור כמה מהלחשים האלה להשתמש בהם. אחרי שהכוהן משתמש בלחש, הוא לא יכול להשתמש בו שוב עד ליום הבא.
        הכוהן צריך להתפלל ולהתכונן לפני שהוא משתמש בלחשי הקדושה השונים. ככל שהכוהן מתמיד, הוא לומד לחשים חזקים ומיוחדים יותר.
        כוחם של לחשי הקדושה מגיע מהאמונה והקשר של הכוהן לכוח העליון שהוא משרת.`
      },
      {
        name: "גירוש אל-מתים",
        description: "כוהנים הנוטים לסדר יכולים לגרש מפלצות אל-מתות (שלדים, זומבים, ערפדים וכולי) ולגרום להן לברוח מפני קדושתו העזה של הכוהן, או אפילו להשמידם כליל."
      }
    ],
    primeRequisites: ["Wisdom"],
    hitDice: 8,
    savingThrows: {
      deathRayPoison: 11,
      magicWands: 12,
      paralysisTurnToStone: 14,
      dragonBreath: 16,
      spells: 15
    }
  },
  {
    name: {
      male: "קוסם",
      female: "קוסמת"
    },
    description: ``,
    abilities: [
      {
        name: "",
        description: ""
      }
    ],
    race: "human",
    primeRequisites: ["Intelligence"],
    hitDice: 4,
    savingThrows: {
      deathRayPoison: 14,
      magicWands: 13,
      paralysisTurnToStone: 13,
      dragonBreath: 15,
      spells: 12
    }
  },
] as const;
