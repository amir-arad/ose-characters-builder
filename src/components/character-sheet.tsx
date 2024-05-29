import { Application, Assets, Sprite, Text, TextStyle } from "pixi.js";
import React, { useEffect, useRef, useState } from "react";

import { Character } from "../utils/character-generator";

declare global {
  interface Window {
    __PIXI_APP__: Application | null;
  }
}

interface Props {
  character: Character;
}

const CharacterSheet: React.FC<Props> = ({ character }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    const pixiApp = new Application();
    let inited = false;
    let destroyed = false;
    (async () => {
      await pixiApp.init({ width: 2200, height: 1700 });
      console.log("init");
      if (destroyed) {
        pixiApp.destroy();
        setApp(null);
      } else {
        inited = true;
        setApp(pixiApp);
        if (canvasRef.current) {
          canvasRef.current.appendChild(pixiApp.canvas);
        }
      }
    })();
    return () => {
      if (inited) {
        pixiApp.destroy(true, true);
        setApp(null);
      } else {
        destroyed = true;
      }
    };
  }, []);

  useEffect(() => {
    (globalThis as any).__PIXI_APP__ = app;
  }, [app]);

  useEffect(() => {
    if (app) {
      const loadAssets = async () => {
        const texture = await Assets.load("/template.png");
        const template = new Sprite(texture);
        app.stage.addChild(template);

        const textStyle = new TextStyle({
          fontSize: "60px",
          fill: "#000000",
        });

        // const attributes = [
        //   `Strength: ${character.Strength}`,
        //   `Dexterity: ${character.Dexterity}`,
        //   `Constitution: ${character.Constitution}`,
        //   `Intelligence: ${character.Intelligence}`,
        //   `Wisdom: ${character.Wisdom}`,
        //   `Charisma: ${character.Charisma}`,
        // ];
        const attributes = [
          character.Strength,
          character.Dexterity,
          character.Constitution,
          character.Intelligence,
          character.Wisdom,
          character.Charisma,
        ];
        for (const [index, text] of attributes.entries()) {
          const textElement = new Text({ style: textStyle, text });
          textElement.position.set(2022, 338 + index * 50); // Adjust positions as needed
          app.stage.addChild(textElement);
        }
      };

      loadAssets();

      return () => {
        app.stage.removeChildren();
      };
    }
  }, [app, character]);

  return <div ref={canvasRef}></div>;
};

export default CharacterSheet;
