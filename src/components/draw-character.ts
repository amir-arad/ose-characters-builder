import { ATTRIBUTES, SAVING_THROWS } from "../utils/system";
import {
    Application,
    Assets,
    Sprite,
    Text,
    TextOptions,
    TextStyle,
} from "pixi.js";

import { Character } from "../utils/character-generator";

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
  
export  const aspectRatio = 22 / 17; // the background image is 2200x1700
  
export  async function drawCharacter(app: Application, character: Character) {
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
    addText(app, {
      anchor: 1,
      style: textStyle,
      text: character.class.name[character.gender],
      x: 1300,
      y: 100,
    });
    addText(app, {
      anchor: 1,
      style: textStyle,
      text: character.level,
      x: 725,
      y: 100,
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
    for (const [index, savingThrowName] of SAVING_THROWS.entries()) {
        addText(app, {
            anchor: 0.5,
            style: textStyle,
            text: character.class.savingThrows[savingThrowName],
            x: 2010 - index * 151,
            y: 1340,
          });
    }
  }
  
  