import DialogEntity from "../dialogEntity.js";
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

        if (!this.attackDistanceLoot) {

            this.brocoliNPC = new DialogEntity(this, 1856, 1840, 'npc6');

            this.dialogueBrocoliNPC1 = [];
            this.dialogueBrocoliNPC2 = [];
            this.dialogueBrocoliNPC3 = [];
            this.dialogueBrocoliNPC4 = [];
            this.dialogueBrocoliNPC5 = [];

            this.brocoliNPC.listDialog = [this.dialogueBrocoliNPC1, this.dialogueBrocoliNPC2, this.dialogueBrocoliNPC3, this.dialogueBrocoliNPC4, this.dialogueBrocoliNPC5]

            this.npcs.add(this.brocoliNPC);

            this.npcs.children.each(npc => {
                this.physics.add.collider(this.player, npc, this.checkInteractCollision, null, this)
            });
        }

        //this.npc = this.physics.add.staticSprite(1216, 1248, 'npc').setVisible(false);

        this.dialogue1 = ["Congratulation! You've just", "retrieved the Squash Seed!"];
        this.dialogue2 = ["Press SHIFT to", "throw your Seed."];
        this.dialogue3 = ["Don't hesitate: the Seeds", "are made to grow."];
        this.dialogue4 = ["Yours will undoubtedly", "grow wonders!"];

        if (!this.attackDistanceLoot) {
            this.loot_courge.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4];
        }
    }

    update() {

        this.updateManager();

    }

}

export default sceneZone2