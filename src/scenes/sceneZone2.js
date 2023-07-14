import SceneTemplate from "../sceneTemplate.js";

class sceneZone2 extends SceneTemplate {

    constructor() {
        super('sceneZone2')
    }

    init(data) {
        this.initLauncher(data);
    }

    create() {

        // load de la map
        const levelMap = this.add.tilemap(this.mapName);

        // chargement des calques
        this.loadMap(levelMap);

        //this.npc = this.physics.add.staticSprite(1216, 1248, 'npc').setVisible(false);

        this.dialogue1 = ["Bravo ! Tu viens de", "récupérer la graine de courge !"];
        this.dialogue2 = ["Appuie sur SHIFT pour", "projeter ta graine."];
        this.dialogue3 = ["N'oublie pas : les graines", "sont faîtes pour germer."];
        this.dialogue4 = ["Nul doute que la tienne", "fera pousser des merveilles !"];

        this.loot_courge.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4];
    }

    update() {

        this.updateManager();

    }

}

export default sceneZone2