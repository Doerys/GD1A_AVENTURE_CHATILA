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

        this.dialoguecornNPC1 = ["Pirlouit? I didn't expect to find", "a friendly face in a place like this."];
        this.dialoguecornNPC2 = ["All the monsters that sow terror", "in our kingdom seem to come from here."];
        this.dialoguecornNPC3 = ["So I came to discover the origin of this", "Applecalypse. And I found their source..."];
        this.dialoguecornNPC4 = ["What I saw was... unimaginable. It was", "gigantic! So many fangs, so much slobber..."];
        this.dialoguecornNPC5 = ["Who would have thought such a thing", "could exist? I'm still shaking..."];
        this.dialoguecornNPC6 = ["Don't go that way! You can't beat", "such an abomination. It'll eat you alive."];

        this.cornNPC.listDialog = [this.dialoguecornNPC1, this.dialoguecornNPC2, this.dialoguecornNPC3, this.dialoguecornNPC4, this.dialoguecornNPC5, this.dialoguecornNPC6]

        this.npcs.add(this.cornNPC);

        this.npcs.children.each(npc => {
            this.physics.add.collider(this.player, npc, this.checkInteractCollision, null, this)
        });  

        this.dialogue1 = ["Congratulation! You've just retrieved", "the Last Pure Leaf of the Great Lettuce!"];
        this.dialogue2 = ["When you're facing a hole, press E", "to spread your leaf and fly over it."];
        this.dialogue3 = ["With this gift in your possession,", "clear the final hurdles along the way."];
        this.dialogue4 = ["Save the Great Lettuce,", "Save the Garden Kingdom!"];

        if (!this.volerLoot) {
            this.loot_salade.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4];
        }
    }

    update() {

        this.updateManager();

    }

}

export default sceneDonjon