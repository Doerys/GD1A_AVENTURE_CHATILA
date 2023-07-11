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

        // loot final - Serpe

        this.loot_courge = this.physics.add.sprite(1216, 1248, "courge_loot");
        this.tweens.add({
            targets: this.loot_courge,
            y: this.loot_courge.y + 5,
            duration: 500,
            yoyo: true,
            delay: 50,
            repeat: -1
        });

        this.physics.add.overlap(this.player, this.loot_courge, this.collectCourge, null, this);

        this.npc = this.physics.add.staticSprite(1216, 1248, 'npc').setVisible(false);

        // Joueur - Environnement
        this.physics.add.collider(this.player, this.obstacles2);
        this.physics.add.collider(this.player, this.obstacles3);

        this.dialogue1 = ["Bravo ! Tu viens de", "récupérer la graine de courge !"];
        this.dialogue2 = ["Appuie sur SHIFT pour", "projeter ta graine."];
        this.dialogue3 = ["N'oublie pas : les graines", "sont faîtes pour germer."];
        this.dialogue4 = ["Nul doute que la tienne", "fera pousser des merveilles !"];

        this.texteLoot = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4];
    }

    update() {

        this.updateManager();

        this.textLootCourge();
    }

    collectCourge(player, courge) {
        courge.destroy(courge.x, courge.y);
        this.attackDistanceLoot = true;
        this.textLootCourge();
    }

    textLootCourge() {

        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);
        if (distance < 50) { // la distance de déclenchement du dialogue
            console.log("CHECK réponse pnj")
            if (!this.dialogueBox.visible && this.attackDistanceLoot) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
                this.dialogueBox.visible = true;
                this.dialogueText.setText(this.texteLoot[0]);
                let temps = 3000;

                for (let step = 1; step < 5; step++) {
                    this.time.delayedCall(temps, function () {
                        this.dialogueText.setText(this.texteLoot[step]);
                    }, [], this);
                    temps += 5000
                }
            }
        } else {
            this.dialogueBox.visible = false;
            this.dialogueText.setText('');
        }
    }
}

export default sceneZone2