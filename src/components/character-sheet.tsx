import { ATTRIBUTES, Character } from "../utils/character-generator";
import {
  Application,
  Assets,
  Sprite,
  Text,
  TextOptions,
  TextStyle,
} from "pixi.js";
import React, { useEffect, useRef, useState } from "react";

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
    (globalThis as any).__PIXI_APP__ = app; // eslint-disable-line
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
          align: "right",
        });
        addText(app, {
          anchor: 1,
          style: textStyle,
          text: character.name,
          x: 1860,
          y: 110,
        });

        for (const [index, attributeName] of ATTRIBUTES.entries()) {
          addText(app, {
            anchor: 0.5,
            style: textStyle,
            text: character[attributeName],
            x: 2020,
            y: 340 + index * 150,
          });
          addText(app, {
            anchor: { x: 0.5, y: 1 },
            style: textStyle,
            text: character[`${attributeName}Adj`].toLocaleString("en", {
              signDisplay: "exceptZero",
            }),
            x: 1714,
            y: 345 + index * 150,
          });
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
function addText(
  app: Application,
  options: TextOptions & {
    x: number;
    y: number;
  }
) {
  const textElement = new Text(options);
  textElement.position = options;
  app.stage.addChild(textElement);
}
