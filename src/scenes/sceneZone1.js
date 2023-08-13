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

        // PNJ

        if (!this.attackCaCLoot) {
            
            this.pimentNPC = new DialogEntity(this, 1616, 2064, 'npc5');

            this.dialoguePimentNPC1 = ["Pirlouit! It's been a while! It's so", "good to see a childhood friend again!"];
            this.dialoguePimentNPC2 = ["I'm looking for something that", "might help us defend ourselves."];
            this.dialoguePimentNPC3 = ["It's a weapon Dad used to cut weeds.", "I'm pretty sure to find it here."];
            this.dialoguePimentNPC4 = ["I found myself caught in the crossfire", "of these horrible berry monsters!"];
            this.dialoguePimentNPC5 = ["Don't get any ideas! I'm not afraid of them!", "I'm not afraid of anything!"];
            this.dialoguePimentNPC6 = ["...okay, maybe I'm a bit overwhelmed.", "I'd better get out of the way..."]
            this.dialoguePimentNPC7 = ["If you want to keep going, the weapon", "is probably further in that direction."];
            this.dialoguePimentNPC8 = ["Good luck Pirlouit! Stay safe!"]

            this.pimentNPC.listDialog = [this.dialoguePimentNPC1, this.dialoguePimentNPC2, this.dialoguePimentNPC3, this.dialoguePimentNPC4, this.dialoguePimentNPC5,this.dialoguePimentNPC6, this.dialoguePimentNPC7, this.dialoguePimentNPC8]

            this.npcs.add(this.pimentNPC);
            this.npcs.children.each(npc => {
                this.physics.add.collider(this.player, npc, this.checkInteractCollision, null, this)
            });

        }

        this.physics.add.overlap(this.player, this.loot_serpe, this.collectItem, null, this);

        // Create dialogue text

        this.dialogue1 = ["Congratulation! You've just", "retrieved the Sickle!"];
        this.dialogue2 = ["Press SPACE to", "hit your ennemies."];
        this.dialogue3 = ["If you're blocked,", "don't hesitate to use this weapon."];
        this.dialogue4 = ["Its sharp blade can", "slice through some obstacles!"];

        if (!this.attackCaCLoot) {

            this.loot_serpe.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4]

        }
    }

    update() {

        this.updateManager();

    }
}

export default sceneZone1