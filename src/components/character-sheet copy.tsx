import { Application, Assets, Sprite, Text, TextStyle } from "pixi.js";
// src/components/CharacterSheet.tsx
import React, { useEffect, useRef } from "react";

import { Character } from "../utils/character-generator";

interface Props {
  character: Character;
}

const CharacterSheet: React.FC<Props> = ({ character }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application();

    let inited = false;
    (async () => {
      await app.init({ width: 800, height: 1000 });
      inited = true;
      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas);
      }
      const texture = await Assets.load("/template.png");
      const template = new Sprite(texture);
      app.stage.addChild(template);

      const textStyle = new TextStyle({
        fontSize: 20,
        fill: "#000000",
      });

      const attributes = [
        `Strength: ${character.Strength}`,
        `Dexterity: ${character.Dexterity}`,
        `Constitution: ${character.Constitution}`,
        `Intelligence: ${character.Intelligence}`,
        `Wisdom: ${character.Wisdom}`,
        `Charisma: ${character.Charisma}`,
      ];

      attributes.forEach((text, index) => {
        const textElement = new Text({ ...textStyle, text });
        textElement.position.set(50, 200 + index * 50); // Adjust positions as needed
        app.stage.addChild(textElement);
      });
    })();

    // sharedLoader.add("template", "/template.png").load((loader, resources) => {
    //   const template = new PIXI.Sprite(resources.template.texture);
    // });

    return () => {
      app.destroy(inited, inited);
    };
  }, [character]);

  return <div ref={canvasRef}></div>;
};

export default CharacterSheet;
