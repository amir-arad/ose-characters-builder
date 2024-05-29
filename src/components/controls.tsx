// src/components/Controls.tsx
import React, { useState } from "react";

import CharacterSheet from "./character-sheet";
import { generateCharacters } from "../utils/character-generator";

const Controls: React.FC = () => {
  const [characters, setCharacters] = useState(generateCharacters(1));

  const handleGenerate = () => {
    setCharacters(generateCharacters(1)); // Change 30 to any desired number
  };

  return (
    <div>
      <button onClick={handleGenerate}>Generate Character Sheets</button>
      <div>
        {characters.map((character, index) => (
          <CharacterSheet key={index} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Controls;
