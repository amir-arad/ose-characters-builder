import React, { useEffect, useRef, useState } from "react";

import { Application } from "pixi.js";
import { Character } from "../utils/character-generator";

declare global {
  interface Window {
    __PIXI_APP__: Application | null;
  }
}

interface Props {
  character: Character;
  aspectRatio: number;
  drawCharacter(app: Application, character: Character): unknown;
}

const CharacterSheet: React.FC<Props> = ({
  character,
  aspectRatio,
  drawCharacter,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    const pixiApp = new Application();

    const setCanvasSize = () => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = canvasWidth / aspectRatio;
      pixiApp.renderer.resize(canvasWidth, canvasHeight);
      pixiApp.stage.scale = canvasWidth / 2200;
    };

    let inited = false;
    let destroyed = false;
    (async () => {
      await pixiApp.init({
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        backgroundColor: 0x1099bb,
      });
      if (destroyed) {
        pixiApp.destroy();
        setApp(null);
      } else {
        inited = true;
        setApp(pixiApp);
        if (canvasRef.current) {
          canvasRef.current.appendChild(pixiApp.canvas);
        }
        window.addEventListener("resize", setCanvasSize);
        setCanvasSize();
      }
    })();
    return () => {
      if (inited) {
        pixiApp.destroy(true, true);
        setApp(null);
        window.removeEventListener("resize", setCanvasSize);
      } else {
        destroyed = true;
      }
    };
  }, []);

  useEffect(() => {
    window.__PIXI_APP__ = app; // eslint-disable-line
  }, [app]);

  useEffect(() => {
    if (app) {
      drawCharacter(app, character);
      return () => {
        app.stage.removeChildren();
      };
    }
  }, [app, drawCharacter, character]);

  return <div ref={canvasRef}></div>;
};

export default CharacterSheet;
