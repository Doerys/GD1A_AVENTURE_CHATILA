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

        // loot final - Serpe

        this.loot_serpe = this.physics.add.sprite(2800, 1392, "serpe_loot");
        this.tweens.add({
            targets: this.loot_serpe,
            y: this.loot_serpe.y + 5,
            duration: 500,
            yoyo: true,
            delay: 50,
            repeat: -1
        });
        
        this.physics.add.overlap(this.player, this.loot_serpe, this.collectSerpe, null, this);

        // PNJ
        this.npc = this.physics.add.staticSprite(2800, 1392, 'npc').setVisible(false);

        // Create dialogue text

        this.dialogue1 = ["Bravo ! Tu viens de", "récupérer la serpe !"];
        this.dialogue2 = ["Appuie sur ESPACE pour", "frapper tes ennemis."];
        this.dialogue3 = ["Si tu es bloqué,", "n'hésite pas à utiliser cette arme."];
        this.dialogue4 = ["Sa lame aiguisée peut", "trancher certains obstacles !"];

        this.texteLoot = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4]
    }

    update() {

        this.updateManager();

        this.textLootSerpe();
    }

    // GESTION DES COLLECTIBLES

    // récupération de la serpe

    collectSerpe(player, serpe) {

        console.log("CHECK SERPE");

        serpe.destroy(serpe.x, serpe.y);
        this.attackCaCLoot = true;
        this.textLootSerpe();
    }

    textLootSerpe() {

        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);
        if (distance < 50) { // la distance de déclenchement du dialogue
            if (!this.dialogueBox.visible && this.attackCaCLoot) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
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

export default sceneZone1