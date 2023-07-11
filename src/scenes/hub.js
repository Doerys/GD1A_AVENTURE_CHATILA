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
        this.panneau1 = this.physics.add.staticSprite(272, 968, 'panneauG');
        this.panneau2 = this.physics.add.staticSprite(1040, 1032, 'panneauD');
        this.panneau3 = this.physics.add.staticSprite(528, 1000, 'panneauD');

        this.buffHole = this.physics.add.staticSprite(448, 1110, 'statue');

        this.npcs.add(this.panneau1);
        this.npcs.add(this.panneau2);
        this.npcs.add(this.panneau3);
        this.npcs.add(this.buffHole);

        // Achat Hub

        this.physics.add.overlap(this.player, this.buffHole, this.unlockBuff, null, this);

        // REPLIQUES

        this.contenuPanneau1 = "Vers les Collines Fertiles";
        this.contenuPanneau2 = "Vers les Contrées Arrosées";
        this.contenuPanneau3 = "Vers la Grande Laitue";

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

        this.checkSpeak();
    }

    // FONCTIONS COMPORTEMENTS MOBS

    //Gestion Pattern Mob A
    mob_switch_right(mobA) {
        mobA.setVelocityX(150);
        mobA.setVelocityY(0);
        mobA.anims.play('right_mob')
    }

    mob_switch_left(mobA) {
        mobA.setVelocityX(-150);
        mobA.setVelocityY(0);
        mobA.anims.play('left_mob')
    }

    mob_switch_up(mobA) {
        mobA.setVelocityX(0);
        mobA.setVelocityY(-150);
        mobA.anims.play('up_mob')
    }

    mob_switch_down(mobA) {
        mobA.setVelocityX(0);
        mobA.setVelocityY(150);
        mobA.anims.play('down_mob')
    }

    // Gestion crachat des mobs B

    mobBSpit() {
        if (this.ableSpitMobBDown) {
            this.mobBDown.children.each(mobBDown => {
                this.attaquemobBDown_create = this.physics.add.sprite(mobBDown.x, mobBDown.y + 16, 'projmobB');
                this.attaquemobBDown.add(this.attaquemobBDown_create);
            });

            this.attaquemobBDown.setVelocityY(250);
            this.ableSpitMobBDown = false;
            this.time.delayedCall(1000, this.enableSpitmobB, [], this);
        }

        if (this.ableSpitMobBLeft) {
            this.mobBLeft.children.each(mobBLeft => {
                this.attaquemobBLeft_create = this.physics.add.sprite(mobBLeft.x - 16, mobBLeft.y, 'projmobB');
                this.attaquemobBRight.add(this.attaquemobBLeft_create);
            });

            this.attaquemobBRight.setVelocityX(-250);
            this.ableSpitMobBLeft = false;
            this.time.delayedCall(1000, this.enableSpitmobB, [], this);
        }

        if (this.ableSpitMobBRight) {
            this.mobBRight.children.each(mobBRight => {
                this.attaquemobBRight_create = this.physics.add.sprite(mobBRight.x + 16, mobBRight.y, 'projmobB');
                this.attaquemobBLeft.add(this.attaquemobBRight_create);
            });

            this.attaquemobBLeft.setVelocityX(250);
            this.ableSpitMobBRight = false;
            this.time.delayedCall(1000, this.enableSpitmobB, [], this);
        }
    }

    // Fonction qui fait ping pong avec le mobBSpit pour gérer le cooldown de crachat
    enableSpitmobB() {
        this.ableSpitMobBDown = true;
        this.ableSpitMobBLeft = true;
        this.ableSpitMobBRight = true;
    }

    // fais disparaître le projectile si collider
    clean_projMobB(proj) {
        proj.disableBody(true, true);
    }

    // GESTION MOB C - Fonctions ping pong pour gérer cooldown 

    stateMobC() {
        if (this.ableMobC) {
            this.ableMobC = false;
            this.mobCDanger = false;
            this.time.delayedCall(2000, this.enableMobC, [], this);
        }
    }

    enableMobC() {
        this.ableMobC = true;
        this.mobCDanger = true;
        this.time.delayedCall(2000, this.stateMobC, [], this);
    }


    // FONCTIONS PRISE DE DEGATS

    //Perte de vie si touché par mob A
    perteVieMobA(player, mobA) {

        if (this.player_beHit == false) {

            // On ne peut plus se déplacer
            this.player_block = true;
            // variable qui empêchera de se faire taper pendant la frame d'invul
            this.player_beHit = true;

            // repoussoir du personnage
            if (mobA.body.touching.left) {
                player.setVelocityX(-600);
            }
            else if (mobA.body.touching.right) {
                player.setVelocityX(600);
            }
            else if (mobA.body.touching.up) {
                player.setVelocityY(-600);
            }
            else if (mobA.body.touching.down) {
                player.setVelocityY(600);
            }

            // Visuel de la frame d'invulnérabilité
            this.pinvisible();

            // retrait des pv dans la variable
            this.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.health == 0) {
                this.player_block = true;
                player.setTint(0xff0000);
                this.physics.pause();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                this.time.delayedCall(500, this.delock_joueur, [], this);
                this.time.delayedCall(1500, this.able_hit, [], this);
            }
        }
    }

    //Perte de vie si touché par mob B
    perteVieMobB(player, mobB) {

        if (this.player_beHit == false) {

            // On ne peut plus se déplacer
            this.player_block = true;
            // variable qui empêchera de se faire taper pendant la frame d'invul
            this.player_beHit = true;

            // repoussoir du personnage
            if (mobB.body.touching.left) {
                player.setVelocityX(-600);
            }
            else if (mobB.body.touching.right) {
                player.setVelocityX(600);
            }
            else if (mobB.body.touching.up) {
                player.setVelocityY(-600);
            }
            else if (mobB.body.touching.down) {
                player.setVelocityY(600);
            }

            // Visuel de la frame d'invulnérabilité
            this.pinvisible();

            // retrait des pv dans la variable
            this.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.health == 0) {
                this.player_block = true;
                player.setTint(0xff0000);
                this.physics.pause();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                this.time.delayedCall(500, this.delock_joueur, [], this);
                this.time.delayedCall(1500, this.able_hit, [], this);
            }
        }
        mobB.destroy();
    }

    //Perte de vie si touché par mob C
    perteVieMobC(player, mobC) {
        if (this.player_beHit == false && this.mobCDanger) {

            // On ne peut plus se déplacer
            this.player_block = true;
            // variable qui empêchera de se faire taper pendant la frame d'invul
            this.player_beHit = true;

            // repoussoir du personnage
            if (mobC.body.touching.left) {
                player.setVelocityX(-600);
            }
            else if (mobC.body.touching.right) {
                player.setVelocityX(600);
            }
            else if (mobC.body.touching.up) {
                player.setVelocityY(-600);
            }
            else if (mobC.body.touching.down) {
                player.setVelocityY(600);
            }

            // Visuel de la frame d'invulnérabilité
            this.pinvisible();

            // retrait des pv dans la variable
            this.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.health < 0) {
                this.player_block = true;
                player.setTint(0xff0000);
                this.physics.pause();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                this.time.delayedCall(500, this.delock_joueur, [], this);
                this.time.delayedCall(1500, this.able_hit, [], this);
            }
        }
    }

    // FONCTIONS POUR TUER LES MOBS

    // Kill au CAC
    kill_mob(mobA) {
        mobA.destroy();
        this.lootMob(mobA);
    }

    // Kill à distance
    kill_mob_shoot(mobA, attaque_shoot) {
        mobA.destroy();
        attaque_shoot.disableBody(true, true);
        this.shoot_lock = false;

        this.lootMob(mobA);
    }

    // Drop des mobs
    lootMob(mob) {
        this.loot = Math.floor(Math.random() * (4 - 1)) + 1;
        console.log(this.loot);
        if (this.loot == 1) {
            this.heal.create(mob.x, mob.y, "heal");
        }
        else if (this.loot == 2) {
            this.money.create(mob.x, mob.y, "grainesScore");
        }
    }

    // FONCTIONS LIEES A L'ATTAQUE CAC

    //Clean Attaque

    // fais disparaître la zone de frappe après le coup
    clean_sword(attaque_sword) {
        attaque_sword.disableBody(true, true);
    }

    // booléenne pour activer clean_sword
    if_clean_sword() {
        if (this.trigger_cleanSword == true) {
            this.trigger_cleanSword = false;
            return true
        }
        else {
            return false
        }
    }

    //Débloque l'attaque CaC
    delock_attaque() {
        this.player_block = false;
        this.trigger_cleanSword = true;
    }

    //débloque le Joueur
    delock_joueur() {
        this.player_block = false;
    }

    // FONCTIONS LIEES A L'ATTAQUE DISTANCE

    // débloque le tir  
    delock_shoot(attaque_shoot) {
        attaque_shoot.disableBody(true, true);
        this.shoot_lock = false;
    }

    // détruit le tir après un certain temps (marche pas)
    destroyShoot(attaque_shoot) {
        attaque_shoot.disableBody(true, true);
        this.shoot_lock = false;
    }

    destroyShootMobB(attaque_shoot) {
        attaque_shoot.destroy();
    }

    // FONCTIONS LIEES A LA PRISE DE DEGATS

    //Débloque la possibilité de subit dégâts
    able_hit() {
        this.player_beHit = false;
    }

    // booléen 
    getHit() {
        if (this.player_beHit == false) {
            return true
        }
        else {
            return false
        }
    }

    // Duo de fonctions qui font ping pong pour frames d'invulnérabilités
    pinvisible() {
        this.player.setVisible(false);
        this.time.delayedCall(50, this.pvisible, [], this);
    }

    pvisible() {
        if (this.clignotement < 3) {
            this.time.delayedCall(50, this.pinvisible, [], this);
            this.player.visible = true;
            this.clignotement += 1;
        }
        else {
            this.player.visible = true;
            this.clignotement = 0;
            this.able_hit();
        }
    }

    // GESTION DE L'interface

    gestionUI() {
        if (this.health == 5) {
            this.lifeUI.setTexture('life1')
        }
        if (this.health == 4) {
            this.lifeUI.setTexture('life2');
        }
        if (this.health == 3) {
            this.lifeUI.setTexture('life3');
        }
        if (this.health == 2) {
            this.lifeUI.setTexture('life4');
        }
        if (this.health == 1) {
            this.lifeUI.setTexture('life5');
        }
        if (this.health == 0) {
            this.lifeUI.setTexture('lifeEmpty');
        }

        if (this.attackCaCLoot == true) {
            this.serpeUI.setVisible(true);
        }
        else { this.serpeUI.setVisible(false); }

        if (this.attackDistanceLoot == true) {
            this.graineCourgeUI.setVisible(true);
        }
        else { this.graineCourgeUI.setVisible(false); }

        if (this.volerLoot == true) {
            this.saladeUI.setVisible(true);
        }
        else { this.saladeUI.setVisible(false); }
    }

    // GESTION DES COLLECTIBLES

    // récupération du heal (si on n'a pas toute sa vie)
    collectHeal(player, heal) {

        if (this.health < 5) {
            heal.destroy(heal.x, heal.y);
            this.health++;
        }
    }

    // récupération du loot
    collectLoot(player, loot) {
        loot.destroy(loot.x, loot.y); // détruit l'esprit collecté
        this.graineScore++; // incrémente le score
        this.changementText();
    }

    changementText() {
        this.textScore.setText(`${this.graineScore}`); // montre le score actuel
    }

    // changement d'affichage de l'interface de loot (pour centrer la numération)
    checkLoot() {
        if (this.graineScore > 9) {
            this.textScore.setPosition(628, 36)
        }
        else if (this.graineScore < 10) {
            this.textScore.setPosition(632, 36);
        }
    }

    // FONCTIONS GESTION D'OBSTACLES

    // RONCES

    // destruction d'une ronce si frappé par la serpe
    destroyRonces(ronces) {
        ronces.disableBody(true, true);
    }

    // PONTS COURGES

    // valide la création du pont si graine de courge détecté
    createBridge(trou, graine) {
        console.log("création pont");
        graine.disableBody(true, true);
        this.bridge1_changeLook = true;
        this.shoot_lock = false;
        this.bridge1Done = true;
        this.bridge1Active = true; // pour rétracter le pont seulement quand il a déjà été posé
    }

    // affiche un pont si graine de courge plantée, et enlève le mur invisible qui bloque
    stateBridge() {
        //changement d'apparence
        if (this.bridge1_changeLook == true) {
            if (this.bridge1Done == true) {
                this.bridge1.anims.play('trueBridge');
            }
            if (this.bridge1Done == false && this.bridge1Active == true) {
                this.bridge1.anims.play('falseBridge');
                this.bridge1Active = false;
            }
            this.bridge1_changeLook = false;
        }

        // retrait ou ajout du mur invisible

        if (this.bridge1Done == true) {
            this.murBridge1.disableBody(true, true);
        }
        if (this.bridge1Done == false) {
            this.murBridge1.enableBody();
        }
    }

    // ECHELLES HARICOTS

    // affiche une échelle si graine de haricot plantée, et enlève le mur invisible qui bloque
    createEchelle(trou, graine) {
        graine.disableBody(true, true);
        this.echelleHaricot1.anims.play('trueEchelle');

        this.time.delayedCall(1500, function () {
            this.murHaricot1.disableBody(true, true);
        }, [], this);
    }

    grabGraine(player, graine) {
        if ((Phaser.Input.Keyboard.JustDown(this.FKey) || this.controller.L1) && this.carryGraine == false) {
            graine.destroy();
            this.speed = 100;
            this.carryGraine = true;
        }
    }

    putGraine() {
        if ((Phaser.Input.Keyboard.JustDown(this.FKey) || this.controller.L1) && this.carryGraine == true) {
            this.graines_create = this.physics.add.staticSprite(this.player.x, this.player.y, 'box');
            this.grainesHaricot.add(this.graines_create);
            this.carryGraine = false;
            this.speed = 175;
        }
    }

    // SAUTS - FEUILLE DE SALADE

    sautVide() {
        if ((Phaser.Input.Keyboard.JustDown(this.EKey) || this.controller.B) && this.volerLoot == true && this.carryGraine == false) {
            console.log("CHECK");
            this.physics.world.removeCollider(this.collisionMur);
            this.physics.world.removeCollider(this.collisionEau);
            this.player_block = true;
            this.player.setVelocityX(150);
            this.flyingMod = true;
        }
    }

    stopSaut() {
        if (this.flyingMod == true) {
            console.log("CHECK 2");
            this.physics.world.colliders.add(this.collisionMur);
            this.physics.world.colliders.add(this.collisionEau);
            this.delock_joueur();
            this.flyingMod = false;
        }
    }

    // DIALOGUES

    checkSpeak() {
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
    }

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