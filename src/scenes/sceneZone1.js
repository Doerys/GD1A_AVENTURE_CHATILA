import DialogEntity from "../dialogEntity.js";
import SceneTemplate from "../sceneTemplate.js";

class sceneZone1 extends SceneTemplate {

    constructor() {
        super('sceneZone1')
    }

    init(data) {
        this.initLauncher(data);
    }

    create() {

        // load de la map
        const levelMap = this.add.tilemap(this.mapName);

        // chargement des calques
        this.loadMap(levelMap);
        
        this.physics.add.overlap(this.player, this.loot_serpe, this.collectItem, null, this);

        // Create dialogue text

        this.dialogue1 = ["Bravo ! Tu viens de", "récupérer la serpe !"];
        this.dialogue2 = ["Appuie sur ESPACE pour", "frapper tes ennemis."];
        this.dialogue3 = ["Si tu es bloqué,", "n'hésite pas à utiliser cette arme."];
        this.dialogue4 = ["Sa lame aiguisée peut", "trancher certains obstacles !"];

        this.loot_serpe.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4]
    }

    update() {

        this.updateManager();

    }
}

export default sceneZone1