import DialogEntity from "../dialogEntity.js";
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

        if (!this.bossDefeated) {

            this.poireNPC = new DialogEntity(this, 704, 1120, 'npc4');

            this.dialoguePoireNPC1 = ["Our country used to be a splendid place.", "But today, everything is wild and distorted."];
            this.dialoguePoireNPC2 = ["And the Great Lettuce... My tears flow", "every time I think of the state it remains."];
            this.dialoguePoireNPC3 = ["Mysteriously, here seems to", "be the last place we are safe."];
            this.dialoguePoireNPC4 = ["Perhaps the statue of the Garden's Keeper", "scare away nearby Vegeterrors?"];
            this.dialoguePoireNPC5 = ["You look a lot like this hero.", "You seem to share the same strength."];

            this.poireNPC.listDialog = [this.dialoguePoireNPC1, this.dialoguePoireNPC2, this.dialoguePoireNPC3, this.dialoguePoireNPC4, this.dialoguePoireNPC5]

            this.npcs.add(this.poireNPC);

            this.carotteNPC = new DialogEntity(this, 512, 1128, 'npc3');

            this.dialogueCarotteNPC1 = ["I remember a time when dozens of Garden's", "Keepers watched over the Garden Kingdom."];
            this.dialogueCarotteNPC2 = ["We lived in peace, for they warded off", "any threat that came too close to us."];
            this.dialogueCarotteNPC3 = ["Time passed, and the Keepers", "disappeared one after the other."];
            this.dialogueCarotteNPC4 = ["The day this statue was built,", "it was meant to glorify our defenders."];
            this.dialogueCarotteNPC5 = ["Today, it is merely a reminder", "of those former heroes."];
            this.dialogueCarotteNPC6 = ["Today, all the Keepers are gone and the", "shadows have spread over our beloved land."];
            this.dialogueCarotteNPC7 = ["... I miss the good old days."]

            this.carotteNPC.listDialog = [this.dialogueCarotteNPC1, this.dialogueCarotteNPC2, this.dialogueCarotteNPC3, this.dialogueCarotteNPC4, this.dialogueCarotteNPC5, this.dialogueCarotteNPC6, this.dialogueCarotteNPC7]

            this.npcs.add(this.carotteNPC);

            if (this.attackCaCLoot) {

                this.pimentNPC = new DialogEntity(this, 384, 912, 'npc5');

                this.dialoguePimentNPC1 = ["Oh! You find Dad's Sickle!", "That's really good work!"];
                this.dialoguePimentNPC2 = ["You know what? You can keep it.", "It suits better on you than me."];
                this.dialoguePimentNPC3 = ["Before my father passed away,", "he wanted me to stop playing hero."] ;
                this.dialoguePimentNPC4 = ["He said it was the Guardians' duty", "to keep the Kingdom safe."] ;
                this.dialoguePimentNPC5 = ["I didn't want to wait to act.", "I couldn't remain passive."] ;
                this.dialoguePimentNPC6 = ["But finally, Dad was right.", "Now, I know the Kingdom will be safe."] ;

                this.pimentNPC.listDialog = [this.dialoguePimentNPC1, this.dialoguePimentNPC2, this.dialoguePimentNPC3, this.dialoguePimentNPC4, this.dialoguePimentNPC5, this.dialoguePimentNPC6]

                this.npcs.add(this.pimentNPC);

            }

            if (this.attackDistanceLoot) {

                this.brocoliNPC = new DialogEntity(this, 880, 960, 'npc6');

                this.dialogueBrocoliNPC1 = ["Oh my... The Squash Seed!", "Yes! You retrieved it!"];
                this.dialogueBrocoliNPC2 = ["I'm very happy you got it back, Pirlouit.", "It means a lot to me."];
                this.dialogueBrocoliNPC3 = ["Seeds are not only important", "to ensure the prosperity of our land."];
                this.dialogueBrocoliNPC4 = ["They embody our hopes, our future.", "We must think beyond today."];
                this.dialogueBrocoliNPC5 = ["When this whole disaster is over, they", "will allow us to create a new kingdom."];
                this.dialogueBrocoliNPC6 = ["I can't wait to see it happen."];

                this.brocoliNPC.listDialog = [this.dialogueBrocoliNPC1, this.dialogueBrocoliNPC2, this.dialogueBrocoliNPC3, this.dialogueBrocoliNPC4, this.dialogueBrocoliNPC5, this.dialogueBrocoliNPC6]

                this.npcs.add(this.brocoliNPC);

            }
        }

        else if (this.bossDefeated) {

            this.poireNPC = new DialogEntity(this, 342, 1088, 'npc4Happy').setDepth(1);
            this.cornNPC = new DialogEntity(this, 390, 1075, 'npc2Happy').setDepth(1);
            this.carotteNPC = new DialogEntity(this, 448, 1168, 'npc3').setDepth(1);
            this.pimentNPC = new DialogEntity(this, 384, 1128, 'npc5').setDepth(1);
            this.brocoliNPC = new DialogEntity(this, 512, 1128, 'npc6').setDepth(1);
            this.onionNPC = new DialogEntity (this, 560, 1100, 'npcHappy').setDepth(1);

            this.finalDialog0 = ["Fruitizens... We are gathered", "here to commemoration."]
            this.finalDialog1 = ["The Garden Kingdom never suffered", "such distress and havocs before."];
            this.finalDialog2 = ["The darkness had completely", "covered our peaceful land."];
            this.finalDialog3 = ["The despair had won the heart", "of the poor fruitizens..."];
            this.finalDialog4 = ["Until a light of hope", "comes out of the shadow,"];
            this.finalDialog5 = ["A hero, brave enough to face the", "evil threat spreading in our country."];
            this.finalDialog6 = ["Pirlouit. Come closer, my child."];
            
            this.finalDialog7 = ["Pirlouit came across all over", "the Kingdom to fight the Vegeterrors..."];
            this.finalDialog8 = ["...sank deep into the Great Lettuce,", " to defeat the Abomination lurking there..."];
            this.finalDialog9 = ["... and get what will allow the Garden", "Kingdom to regain its former splendor."];
            this.finalDialog10 = ["Show us, Pirlouit. Show us", "the Hearth of the Garden Kingdom."];
            
            this.finalDialog11 = ["May this elder relic ", "mark the beginning of a new era."]; 
            this.finalDialog12 = ["And its bearer, the true hero,", "who destroyed the origin of evil,"];
            this.finalDialog13 = ["be thanked, in the name of all", "Fruitizens of our land."];
            
            this.finalDialog14 = ["By virtue of my title of Elder", "Wise, Consellor, and above all, Carott,"];
            this.finalDialog15 = ["I appoint you, Pirlouit, as", "the new Garden's Keeper of our Kingdom."];

            this.cornNPC.listDialog1 = [this.finalDialog0, this.finalDialog1, this.finalDialog2, this.finalDialog3, this.finalDialog4, this.finalDialog5, this.finalDialog6]
            this.savedListDialog = this.cornNPC.listDialog1;

            this.cornNPC.listDialog2 = [this.finalDialog7, this.finalDialog8, this.finalDialog9, this.finalDialog10];

            this.cornNPC.listDialog3 = [this.finalDialog11, this.finalDialog12, this.finalDialog13];

            this.cornNPC.listDialog4 = [this.finalDialog14, this.finalDialog15];

            this.interface.setVisible(false);
            this.textScore.setVisible(false);
            this.lifeUI.setVisible(false);
            this.serpeUI.setVisible(false);
            this.graineCourgeUI.setVisible(false);
            this.saladeUI.setVisible(false);

            this.player.anims.play('up', true);

            this.player_block = true;

            this.time.delayedCall(1500, () => {

                this.canInteract = true;
                this.bigStep = 1;
                this.savedNpc = this.cornNPC;

            }, [], this);
        }

        // Joueur - Environnement

        // PNJ
        this.panneau1 = new DialogEntity(this, 272, 968, 'panneauG').setOrigin(0.5, 0.5);
        this.panneau2 = new DialogEntity(this, 1040, 1032, 'panneauD').setOrigin(0.5, 0.5);
        this.panneau3 = new DialogEntity(this, 528, 1000, 'panneauD').setOrigin(0.5, 0.5)

        this.statue = new DialogEntity(this, 448, 1110, 'statue').setOrigin(0.5, 0.5);

        this.statueDialog1 = ["A sign is placed", "below the statue:"];
        this.statueDialog2 = ["''The Garden Kingdom has always", "been protected by the Keepers"];
        this.statueDialog3 = ["And it will always be.''"]
        this.statueDialog4 = ["Next to the panel is a bowl", "filled with seeds."];
        this.statueDialog5 = ["It appears to be an offering."];

        this.statue.listDialog = [this.statueDialog1, this.statueDialog2, this.statueDialog3, this.statueDialog4, this.statueDialog5]

        this.npcs.add(this.statue);

        //this.physics.add.collider(this.player, this.statue)

        this.npcs.add(this.panneau1);
        this.npcs.add(this.panneau2);
        this.npcs.add(this.panneau3);

        // REPLIQUES

        this.panneau1.listDialog = ["Towards Fertile Hills"];
        this.panneau2.listDialog = ["Towards Watered Lands"];
        this.panneau3.listDialog = ["Towards the Great Lettuce"];

        this.statueDialog1 = ["A sign is placed", "below the statue:"];
        this.statueDialog2 = ["The Garden Kingdom has always", "been protected by the Keepers."];
        this.statueDialog3 = ["Leur rapidité légendaire fut transmise", "de génération en génération."];
        this.statueDialog4 = ["Selon la tradition, on offre,", "5 graines pour nous porter chance."];
        this.statueDialog5 = ["Pressez E pour déposer 5 graines", "devant la statue."];

        this.npcs.children.each(npc => {
            this.physics.add.collider(this.player, npc, this.checkInteractCollision, null, this)
        });

    }

    update() {

        this.updateManager();
    }

}

export default sceneHub