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
        this.onionNPC = new DialogEntity (this, 400, 1750, 'npc');

        this.dialogueOignonNPC1 = ["Pirlouit! At last you're here!", "I have sad news..."];
        this.dialogueOignonNPC2 = ["While you were away, the", "Garden Kingdom has been corrupted!"];
        this.dialogueOignonNPC3 = ["Our land is now invaded by", "hordes of aggressive monsters."];
        this.dialogueOignonNPC4 = ["We call them Vegeterrors.", "They are very dangerous!"]
        this.dialogueOignonNPC5 = ["The corruption seems to come from", "the Great Lettuce."];
        this.dialogueOignonNPC6 = ["Maybe are you strong enough to", "fix this? I hope so!"];

        this.onionNPC.listDialog = [this.dialogueOignonNPC1, this.dialogueOignonNPC2, this.dialogueOignonNPC3, this.dialogueOignonNPC4, this.dialogueOignonNPC5, this.dialogueOignonNPC6];

        this.npcs.add(this.onionNPC);

        this.npcs.children.each(npc => {
            this.physics.add.collider(this.player, npc, this.checkInteractCollision, null, this)
        });
    }

    update() {

        this.updateManager();

    }

}

export default sceneTuto 
