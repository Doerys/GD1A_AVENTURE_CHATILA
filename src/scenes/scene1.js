import DialogEntity from "../dialogEntity.js";
import SceneTemplate from "../sceneTemplate.js";

class sceneTuto extends SceneTemplate {

    constructor() {
        super('sceneTuto')
    }

    init(data) {

        this.initLauncher(data);
    }

    create() {

        // load de la map
        const levelMap = this.add.tilemap(this.mapName);

        // chargement des calques
        this.loadMap(levelMap);

        // ELEMENTS D'UN NIVEAU

        // PNJ
        this.npc = new DialogEntity (this, 400, 1750, 'npc');
        this.npc2 = new DialogEntity (this, 2048, 464, 'npc2');

        this.dialogue1 = ["Pirlouit ! Te voilà enfin !", "J'ai de tristes nouvelles !"];
        this.dialogue2 = ["Pendant ton absence, le", "Royaume Potager a été corrompu !"];
        this.dialogue3 = ["Des habitants sont transformés", "en monstres aggressifs."];
        this.dialogue4 = ["La corruption semble provenir", "de la Grande Laitue."];
        this.dialogue5 = ["Pars, noble Gardien du Potager.", "Sauve le Royaume !"];

        this.npc.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4, this.dialogue5]

        this.dialogue21 = ["Pirlouit ! Notre sauveur !", "Quel plaisir de te voir !"];
        this.dialogue22 = ["Tu es sacrément costaud !", "Tu vas nous sortir de là, hein ?"];
        this.dialogue23 = ["N'oublie pas ! En pressant F,", "tu peux porter certaines choses"];
        this.dialogue24 = ["et les déplacer où tu veux.", "N'oublie pas, hein !"];
        this.dialogue25 = ["Allez, bon courage !", "Tu es notre Gardien !"];

        this.npc2.listDialog = [this.dialogue21, this.dialogue22, this.dialogue23, this.dialogue24, this.dialogue25]

        this.npcs.add(this.npc);
        this.npcs.add(this.npc2);       

        this.npcs.children.each(npc => {
            this.physics.add.collider(this.player, npc, this.checkInteractCollision, null, this)
        });
    }

    update() {

        this.updateManager();

    }

}

export default sceneTuto 
