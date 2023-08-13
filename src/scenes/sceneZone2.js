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

            this.dialogueBrocoliNPC1 = ["Pirlouit? Buddy, you're back! Well, you're", "just in time! I get stuck in here!"];
            this.dialogueBrocoliNPC2 = ["I tried to shelter as many seeds as possible", "before making my way to a safe spot."];
            this.dialogueBrocoliNPC3 = ["Maybe I've bitten off more than I", "can chew. I missed the evacuation!"];
            this.dialogueBrocoliNPC4 = ["Eggplants with big jaws appeared from", "I don't know where and started chasing me."];
            this.dialogueBrocoliNPC5 = ["That was so scary Pirlouit...", "On my run, I even dropped a rare seed!"];
            this.dialogueBrocoliNPC6 = ["I curse myself! This seed was more", "precious than any I could carry."];
            this.dialogueBrocoliNPC7 = ["I wouldn't go any further if I were you.", "This is too dangerous!"]
            this.dialogueBrocoliNPC8 = ["As soon as I've caught my breath, I'm off.", "Be safe, Pirlouit!"]

            this.brocoliNPC.listDialog = [this.dialogueBrocoliNPC1, this.dialogueBrocoliNPC2, this.dialogueBrocoliNPC3, this.dialogueBrocoliNPC4, this.dialogueBrocoliNPC5, this.dialogueBrocoliNPC6, this.dialogueBrocoliNPC7, this.dialogueBrocoliNPC8]

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