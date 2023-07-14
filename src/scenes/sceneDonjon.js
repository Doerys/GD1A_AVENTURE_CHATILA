import SceneTemplate from "../sceneTemplate.js";

class sceneDonjon extends SceneTemplate {

    constructor() {
        super('sceneDonjon')
    }

    init(data) {
        this.initLauncher(data);
    }

    create() {

        // load de la map
        const levelMap = this.add.tilemap(this.mapName);

        // chargement des calques
        this.loadMap(levelMap);

        // PNJ
        //this.npc = this.physics.add.staticSprite(384, 848, 'npc').setVisible(false);

        this.dialogue1 = ["Voilà la dernière feuille pure", "de la Grande Laitue."];
        this.dialogue2 = ["Avec ce don, appuie sur E,", "pour déployer la feuille."];
        this.dialogue3 = ["Avec, franchis les derniers obstacles", "se dressant sur ta route."];
        this.dialogue4 = ["Sauve la Grande Laitue,", "Sauve le Royaume Potager !"];

        this.loot_salade.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4];

        //this.physics.add.overlap(this.player, this.loot_salade, this.collectSalad, null, this);
    }

    update() {

        this.updateManager();

    }

}

export default sceneDonjon