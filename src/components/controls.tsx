// src/components/Controls.tsx
import React, { useState } from "react";
import { aspectRatio, drawCharacter } from "./draw-character";

import CharacterSheet from "./character-sheet";
import { generateCharacters } from "../utils/character-generator";

const Controls: React.FC = () => {
  const [characters, setCharacters] = useState(generateCharacters(1));

  const handleGenerate = () => {
    setCharacters(generateCharacters(1));
  };

  return (
    <div>
      <button onClick={handleGenerate}>Generate Character Sheets</button>
      <div>
        {characters.map((character, index) => (
          <CharacterSheet
            key={index}
            character={character}
            aspectRatio={aspectRatio}
            drawCharacter={drawCharacter}
          />
        ))}
      </div>
    </div>
  );
};

export default Controls;
