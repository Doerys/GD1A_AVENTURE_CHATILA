import SceneTemplate from "../sceneTemplate.js";
import DialogEntity from "../dialogEntity.js";

class sceneZoneSecrete extends SceneTemplate {

    constructor() {
        super('sceneSecrete')
    }

    init(data) {

        this.initLauncher(data);

    }

    create() {

        // load de la map
        const levelMap = this.add.tilemap(this.mapName);

        // chargement des calques
        this.loadMap(levelMap);

    }

    update() {

        this.updateManager();

    }

}

export default sceneZoneSecrete