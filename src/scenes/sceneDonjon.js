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

        this.loot_salade = this.physics.add.sprite(384, 848, "salade_loot");
        this.tweens.add({
            targets: this.loot_salade,
            y: this.loot_salade.y + 5,
            duration: 500,
            yoyo: true,
            delay: 50,
            repeat: -1
        });

        // PNJ
        this.npc = this.physics.add.staticSprite(384, 848, 'npc').setVisible(false);

        this.dialogue1 = ["Voilà la dernière feuille pure", "de la Grande Laitue."];
        this.dialogue2 = ["Avec ce don, appuie sur E,", "pour déployer la feuille."];
        this.dialogue3 = ["Avec, franchis les derniers obstacles", "se dressant sur ta route."];
        this.dialogue4 = ["Sauve la Grande Laitue,", "Sauve le Royaume Potager !"];

        this.texteLoot = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4];

        this.physics.add.overlap(this.player, this.loot_salade, this.collectSalad, null, this);
    }

    update() {

        this.updateManager();

        this.textLootSalade();
    }

    // GESTION DES COLLECTIBLES

    collectSalad(player, salade) {
        salade.destroy(salade.x, salade.y);
        this.volerLoot = true;
        this.textLootSalade();
    }

    textLootSalade() {

        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);
        if (distance < 50) { // la distance de déclenchement du dialogue
            console.log("CHECK réponse pnj")
            if (!this.dialogueBox.visible && this.volerLoot) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
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

export default sceneDonjon