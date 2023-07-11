import PreloadScene from "./src/scenes/preload.js";
import mainScreen from "./src/scenes/mainScreen.js";
import sceneTuto from "./src/scenes/scene1.js";
import sceneHub from "./src/scenes/hub.js";
import sceneZone1 from "./src/scenes/sceneZone1.js";
import sceneZone2 from "./src/scenes/sceneZone2.js";
import sceneZoneSecrete from "./src/scenes/sceneZoneSecrete.js"
import sceneDonjon from "./src/scenes/sceneDonjon.js";

const WIDTH = 683;
const HEIGHT = 384;
const ZOOM_FACTOR = 2;

// FINALEMENT INUTILE
const SHARED_CONFIG = {
    mode: Phaser.Scale.FIT,
    width: WIDTH,
    height: HEIGHT,
    zoomFactor: ZOOM_FACTOR,
}

const Scenes = [PreloadScene, mainScreen, sceneTuto, sceneHub, sceneZone1, sceneZone2, sceneDonjon, sceneZoneSecrete] // on liste les scènes
const createScene = Scene => new Scene(SHARED_CONFIG) // on crée une scène qui possède les configs
const initScenes = () => Scenes.map(createScene) // crée une scène pour chaque élément de la map. Lance la 1ere scène automatiquement

const config = {
    type: Phaser.AUTO,
    scale: {
        width: 683,
        height: 384
    },
    scene: initScenes()
}

new Phaser.Game(config);
