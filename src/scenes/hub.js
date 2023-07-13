import SceneTemplate from "../sceneTemplate.js";

class sceneHub extends SceneTemplate {

    constructor() {
        super('sceneHub')
    }


    init(data) {
        this.initLauncher(data);
    }

    preload() { }

    create() {

        // load de la map
        const levelMap = this.add.tilemap(this.mapName);

        // chargement des calques
        this.loadMap(levelMap);

        // Joueur - Environnement

        // PNJ
        this.panneau1 = this.physics.add.staticSprite(272, 968, 'panneauG').setOrigin(0.5, 0.5);
        this.panneau2 = this.physics.add.staticSprite(1040, 1032, 'panneauD').setOrigin(0.5, 0.5);
        this.panneau3 = this.physics.add.staticSprite(528, 1000, 'panneauD').setOrigin(0.5, 0.5)

        this.buffHole = this.physics.add.staticSprite(448, 1110, 'statue').setOrigin(0.5, 0.5);

        this.npcs.add(this.panneau1);
        this.npcs.add(this.panneau2);
        this.npcs.add(this.panneau3);
        this.npcs.add(this.buffHole);

        // Achat Hub

        this.physics.add.overlap(this.player, this.buffHole, this.unlockBuff, null, this);

        // REPLIQUES

        this.contenuPanneau1 = ["Vers les Collines Fertiles"];
        this.contenuPanneau2 = ["Vers les Contrées Arrosées"];
        this.contenuPanneau3 = ["Vers la Grande Laitue"];

        this.dialogue1 = ["Un écriteau se situe", "sous la statue :"];
        this.dialogue2 = ["Le Royaume Potager est protégé", "depuis toujours par les Gardiens."];
        this.dialogue3 = ["Leur rapidité légendaire fut transmise", "de génération en génération."];
        this.dialogue4 = ["Selon la tradition, on offre,", "5 graines pour nous porter chance."];
        this.dialogue5 = ["Pressez E pour déposer 5 graines", "devant la statue."];

        this.statueDialogue = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4, this.dialogue5]

        this.texteOffrande = ["Les Gardiens passés vous inspirent.", "Vous vous sentez plus rapide."]
    }

    update() {

        this.updateManager();
    }

    // DIALOGUES

    /*checkSpeak() {
        const distance1 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.panneau1.x, this.panneau1.y);
        const distance2 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.panneau2.x, this.panneau2.y);
        const distance3 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.panneau3.x, this.panneau3.y);
        const distance4 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.buffHole.x, this.buffHole.y);

        if (distance1 < 50) { // la distance de déclenchement du dialogue
            if (!this.dialogueBox.visible) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
                this.dialogueBox.visible = true;
                this.dialogueText.setText(this.contenuPanneau1);
            }
        }
        else if (distance2 < 50) { // la distance de déclenchement du dialogue
            if (!this.dialogueBox.visible) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
                this.dialogueBox.visible = true;
                this.dialogueText.setText(this.contenuPanneau2);
            }
        }
        else if (distance3 < 50) {
            if (!this.dialogueBox.visible) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
                this.dialogueBox.visible = true;
                this.dialogueText.setText(this.contenuPanneau3);
            }
        }
        else if (distance4 < 50) {
            if (!this.dialogueBox.visible) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
                this.dialogueBox.visible = true;
                this.dialogueText.setText(this.statueDialogue[0]);
                let temps = 3000;

                for (let step = 1; step < 5; step++) {
                    this.time.delayedCall(temps, function () {
                        this.dialogueText.setText(this.statueDialogue[step]);
                    }, [], this);
                    temps += 5000
                }
            }
            if (Phaser.Input.Keyboard.JustDown(this.EKey) && this.graineScore >= 5) {
                console.log("CHECK 2")
                this.dialogueText.setText(this.texteOffrande);
                this.speed += 25;
                this.graineScore -= 5;
                this.changementText();
            }
        }
        else {
            this.dialogueBox.visible = false;
            this.dialogueText.setText('');
        }
    }*/

    // ACHAT DE BUFF

    unlockBuff() {
        console.log("CHECK 1")
        if (Phaser.Input.Keyboard.JustDown(this.EKey) && this.graineScore >= 5) {
            console.log("CHECK 2")
            this.speed += 25;
            this.graineScore -= 5;
            this.changementText();
        }
    }

    //Passage scène suivante
    passageSceneTuto() {
        this.scene.start('sceneTuto', {
            graineScore: this.graineScore,

            // Variables pour débloquer les mécaniques
            attackCaCLoot: this.attackCaCLoot,
            attackDistanceLoot: this.attackDistanceLoot,
            volerLoot: this.volerLoot,

            speed: this.speed,
            health: this.health,
            spawnX: 2064,
            spawnY: 48
        })
    }

    passageSceneZone1() {
        this.scene.start('sceneZone1', {
            graineScore: this.graineScore,

            // Variables pour débloquer les mécaniques
            attackCaCLoot: this.attackCaCLoot,
            attackDistanceLoot: this.attackDistanceLoot,
            volerLoot: this.volerLoot,

            speed: this.speed,
            health: this.health,
            spawnX: 3296,
            spawnY: 4032

            //spawnX : 2464,
            //spawnY : 1480
        })
    }

    passageSceneZone2() {
        this.scene.start('sceneZone2', {
            graineScore: this.graineScore,

            // Variables pour débloquer les mécaniques
            attackCaCLoot: this.attackCaCLoot,
            attackDistanceLoot: this.attackDistanceLoot,
            volerLoot: this.volerLoot,

            speed: this.speed,
            health: this.health,
            spawnX: 48,
            spawnY: 3040

            //spawnX : 1248,
            //spawnY : 1248
        })
    }

    passageSceneDonjon() {
        this.scene.start('sceneDonjon', {
            graineScore: this.graineScore,

            // Variables pour débloquer les mécaniques
            attackCaCLoot: this.attackCaCLoot,
            attackDistanceLoot: this.attackDistanceLoot,
            volerLoot: this.volerLoot,

            speed: this.speed,
            health: this.health,
            //spawnX : 48,
            //spawnY : 3040

            spawnX: 1136,
            spawnY: 2720
        })
    }
}

export default sceneHub