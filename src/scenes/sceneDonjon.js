import DialogEntity from "../dialogEntity.js";
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

        this.cornNPC = new DialogEntity (this, 1760, 704, 'npc2');

        this.dialoguecornNPC1 = ["Pirlouit ! Notre sauveur !", "Quel plaisir de te voir !"];
        this.dialoguecornNPC2 = ["Tu es sacrément costaud !", "Tu vas nous sortir de là, hein ?"];
        this.dialoguecornNPC3 = ["N'oublie pas ! En pressant F,", "tu peux porter certaines choses"];
        this.dialoguecornNPC4 = ["et les déplacer où tu veux.", "N'oublie pas, hein !"];
        this.dialoguecornNPC5 = ["Allez, bon courage !", "Tu es notre Gardien !"];

        this.cornNPC.listDialog = [this.dialoguecornNPC1, this.dialoguecornNPC2, this.dialoguecornNPC3, this.dialoguecornNPC4, this.dialoguecornNPC5]

        this.npcs.add(this.cornNPC);     

        this.npcs.children.each(npc => {
            this.physics.add.collider(this.player, npc, this.checkInteractCollision, null, this)
        });  

        this.dialogue1 = ["Voilà la dernière feuille pure", "de la Grande Laitue."];
        this.dialogue2 = ["Avec ce don, appuie sur E,", "pour déployer la feuille."];
        this.dialogue3 = ["Avec, franchis les derniers obstacles", "se dressant sur ta route."];
        this.dialogue4 = ["Sauve la Grande Laitue,", "Sauve le Royaume Potager !"];

        if (!this.volerLoot) {
            this.loot_salade.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4];
        }
    }

    update() {

        this.updateManager();

    }

}

export default sceneDonjon