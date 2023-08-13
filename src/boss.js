import MobD from "./mobD.js";
import DialogEntity from "./dialogEntity.js";

class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
        this.initEvents();
    }

    init() {

        this.isChasing = false;
        this.isHitting = false;
        this.isCasting = false;
        this.isBigHitting = false;

        this.isDangerous = false;

        this.speed = 50;
        this.speedProj = 150;
        this.phase = 1;
        this.health = 15;

        this.eventPhase2 = false;
        this.eventPhase3 = false;

        this.eventShoutPhase1 = false;
        this.eventShoutPhase2 = false;
        this.eventShoutPhase3 = false;

        this.clignotement = 0;

        this.isAlive = true;
        this.isActivated = false;

        this.attacks = this.scene.physics.add.group();

        this.playerInMiddle = true;
        this.playerAround = false;

        this.scene.physics.add.collider(this, this.scene.player);
        this.scene.physics.add.collider(this, this.scene.eau);

        this.attacksCollider = this.scene.physics.add.overlap(this.attacks, this.scene.player, this.hitPlayer, null, this);
        this.scene.physics.add.overlap(this.scene.tileAttackGroup, this.scene.player, this.hitPlayerBigAttack, null, this);

        this.scene.physics.add.overlap(this.scene.tileMiddleGroup, this.scene.player, () => {
            this.playerAround = false;
            this.playerInMiddle = true;

            if (!this.isActivated && !this.scene.cinematicOpening) {

                this.scene.player_block = true;
                this.scene.cinematicOpening = true;

                this.scene.cameras.main.stopFollow()
                    .pan(this.x, this.y, 3000, 'Linear');

                this.scene.player.anims.play('walk_up', true);
                this.scene.player_facing = "up";

                this.scene.tweens.add({
                    targets: this.scene.player,
                    x: this.x,
                    y: this.y + 196,
                    duration: 1500,  // Durée de l'animation en millisecondes
                    ease: 'Linear', // Fonction d'interpolation pour l'animation
                });

                this.scene.time.delayedCall(5000, () => {

                    this.isActivated = true;

                    this.scene.cameras.main.pan(this.scene.player.x, this.scene.player.y, 500, 'Linear');

                    this.scene.time.delayedCall(500, () => {

                        this.scene.cameras.main.startFollow(this.scene.player, true);
                        this.scene.player_block = false;

                    }, null, this);

                    // CREATION DU TIMER
                    this.castTimer = this.scene.time.addEvent({
                        delay: 10000,                // ms

                        callback: (() => {
                            this.castMobs()
                        }),

                        loop: true
                    });

                }, null, this);

            }

        }, null, this);

        this.scene.physics.add.overlap(this.scene.tileAroundGroup, this.scene.player, () => {
            this.playerAround = true;
            this.playerInMiddle = false;
        }, null, this);

        this.scene.physics.add.overlap(this, this.scene.attaque_sword, this.perteVieBoss, null, this);
        this.scene.physics.add.overlap(this, this.scene.attaque_shoot, this.perteVieBossShoot, null, this);
    }

    initEvents() { // fonction qui permet de déclencher la fonction update
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

        if (this.isAlive) {

            if (this.isActivated) {

                //console.log(this.castTimer.getOverallRemainingSeconds());

                const distanceX = Math.abs(this.x - this.scene.player.x);

                const distanceY = Math.abs(this.y - (this.scene.player.y + 16));

                // poursuit si le boss ne tape pas, n'invoque pas de mignons et ne déclenche pas une grosse attaque 
                if (!this.isHitting && !this.isCasting && !this.isBigHitting) {

                    this.isChasing = true;

                    if (this.playerInMiddle || (this.playerAround && (distanceX > 192 || distanceY > 192))) {

                        this.anims.play("bossWalk_anims", true);

                        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y + 8, this.speed);

                    }
                }

                // sinon, désactive le "isChasing"
                else {
                    this.isChasing = false;
                }

                // attaque si le joueur est à proximité

                if (!this.isCasting && !this.isBigHitting && this.isChasing) {

                    if (this.playerInMiddle && distanceX < 64 && distanceY < 64) {

                        this.setVelocity(0, 0);

                        this.anims.play("bossHit_anims", true);

                        this.isHitting = true;

                        let attack = null;

                        if (this.phase == 1) {
                            attack = this.scene.physics.add.sprite(this.x, this.y, 'bossAttack1').setSize(120, 120);
                            attack.anims.play("attackBoss1_anims", true);
                        }

                        else if (this.phase == 2) {
                            attack = this.scene.physics.add.sprite(this.x, this.y, 'bossAttack2').setSize(186, 186);
                            attack.anims.play("attackBoss2_anims", true);
                        }

                        else if (this.phase == 3) {
                            attack = this.scene.physics.add.sprite(this.x, this.y, 'bossAttack3').setSize(250, 250);
                            attack.anims.play("attackBoss3_anims", true);
                        }

                        attack.setDepth(-5)
                        this.attacks.add(attack);

                        this.scene.time.delayedCall(1500, () => {

                            this.isDangerous = true;
                            attack.setAlpha(1);

                        }, null, this);

                        this.scene.time.delayedCall(2000, () => {

                            this.isDangerous = false;

                            this.scene.tweens.add({
                                targets: attack,
                                alpha: 0,
                                duration: 500,  // Durée de l'animation en millisecondes
                                ease: 'Linear', // Fonction d'interpolation pour l'animation
                            });

                            this.isHitting = false;

                        }, null, this);

                        this.scene.time.delayedCall(2500, () => {

                            attack.destroy();

                        }, null, this);

                    }

                    // tir de projectile
                    else if (this.playerAround && distanceX < 192 && distanceY < 192) {
                        this.shoutProj()
                    }

                    else if (this.health <= 13 && !this.eventShoutPhase1) {
                        this.eventShoutPhase1 = true;
                        this.shoutProj()
                    }

                    else if (this.health <= 8 && !this.eventShoutPhase2) {
                        this.eventShoutPhase2 = true;
                        this.shoutProj()
                    }

                    else if (this.health <= 3 && !this.eventShoutPhase3) {
                        this.eventShoutPhase3 = true;
                        this.shoutProj()
                    }
                }

                if (this.health <= 10 && !this.isHittindg && !this.isCasting && !this.eventPhase2) {
                    this.eventPhase2 = true;
                    this.phase = 2;
                    this.bigAttack();
                }

                if (this.health <= 5 && !this.isHitting && !this.isCasting && !this.eventPhase3) {
                    this.eventPhase3 = true;
                    this.phase = 3;
                    this.bigAttack();
                }

                if (this.health == 0) {

                    this.isAlive = false;
                    this.scene.cinematicEnding = true;

                    // On ne peut plus se déplacer
                    this.scene.player_block = true;
                    // variable qui empêchera de se faire taper pendant la frame d'invul
                    this.scene.player_beHit = true;

                    if (this.scene.player_facing == "up") {
                        this.scene.player.anims.play('up', true)
                    }

                    else if (this.scene.player_facing == "down") {
                        this.scene.player.anims.play('down', true)
                    }

                    else if (this.scene.player_facing == "right") {
                        this.scene.player.anims.play('right', true)
                    }

                    else if (this.scene.player_facing == "left") {
                        this.scene.player.anims.play('left', true)
                    }

                    this.scene.cameras.main.stopFollow()
                        .pan(this.x, this.y, 500, 'Linear');

                    this.scene.mobD.children.each(obj => {

                        this.scene.tweens.add({
                            targets: obj,
                            alpha: 0,
                            duration: 500,  // Durée de l'animation en millisecondes
                            ease: 'Linear', // Fonction d'interpolation pour l'animation
                        });
                    });

                    this.scene.mobC1.children.each(obj => {

                        this.scene.tweens.add({
                            targets: obj,
                            alpha: 0,
                            duration: 500,  // Durée de l'animation en millisecondes
                            ease: 'Linear', // Fonction d'interpolation pour l'animation
                        });
                    });

                    this.scene.mobC2.children.each(obj => {

                        this.scene.tweens.add({
                            targets: obj,
                            alpha: 0,
                            duration: 500,  // Durée de l'animation en millisecondes
                            ease: 'Linear', // Fonction d'interpolation pour l'animation
                        });
                    });

                    this.attacks.children.each(obj => {

                        this.scene.tweens.add({
                            targets: obj,
                            alpha: 0,
                            duration: 500,  // Durée de l'animation en millisecondes
                            ease: 'Linear', // Fonction d'interpolation pour l'animation
                        });
                    });

                    this.scene.physics.world.removeCollider(this.scene.colliderMobD);
                    this.scene.physics.world.removeCollider(this.attacksCollider);

                    this.scene.time.delayedCall(3000, () => {

                        this.scene.tweens.add({
                            targets: this,
                            alpha: 0,
                            duration: 1500,  // Durée de l'animation en millisecondes
                            ease: 'Linear', // Fonction d'interpolation pour l'animation
                        });

                        this.final_Loot = new DialogEntity(this.scene, this.x, this.y, "final_loot").setAlpha(0);

                        this.final_Loot.name = "final";

                        this.dialogue1 = ["Congratulation! You defeated", "the monstrous Beasticide!"];
                        this.dialogue2 = ["Now that he's defeated, its corruption", "should cease to spread."];
                        this.dialogue3 = ["Among the rests of this horrible creature,", "you find a splendid treasure."];
                        this.dialogue4 = ["The Hearth of the Garden Kingdom.", "The Seed of the Great Lettuce."];
                
                        this.final_Loot.listDialog = [this.dialogue1, this.dialogue2, this.dialogue3, this.dialogue4]
            
                        this.scene.tweens.add({
                            targets: this.final_Loot,
                            alpha: 1,
                            duration: 500,  // Durée de l'animation en millisecondes
                            ease: 'Linear', // Fonction d'interpolation pour l'animation
                        });

                        this.scene.tweens.add({
                            targets: this.final_Loot,
                            y: this.final_Loot.y + 5,
                            duration: 500,
                            yoyo: true,
                            delay: 50,
                            repeat: -1
                        });
            
                        this.scene.items.add(this.final_Loot);

                    }, null, this);

                    this.scene.time.delayedCall(4500, () => {

                        this.disableBody(true, true);
                        this.scene.player_block = false;
                        this.scene.cinematicEnding = false;
                        this.scene.bossDefeated = true;

                    }, null, this);
                }

                //console.log(this.health, this.isHitting, this.isCasting, this.eventPhase2)
            }

        }
    }

    hitPlayer(player, attackZone) {

        if (this.isDangerous && !this.scene.player_beHit) {

            const distanceX = this.x - player.x;
            const distanceY = this.y - player.y;

            // On ne peut plus se déplacer
            this.scene.player_block = true;
            // variable qui empêchera de se faire taper pendant la frame d'invul
            this.scene.player_beHit = true;

            // repoussoir du personnage
            if (distanceX >= 0) { // X positif (va à gauche)

                if (Math.abs(distanceX) > Math.abs(distanceY)) {

                    player.setVelocityX(-600);
                }

                else {

                    if (distanceY >= 0) { // Y positif (va en haut)
                        player.setVelocityY(-600);
                    }
                    else if (distanceY < 0) { // Y positif (va en bas)
                        player.setVelocityY(600);
                    }
                }

            }

            else if (distanceX < 0) { // X négatif (va à droite)

                if (Math.abs(distanceX) > Math.abs(distanceY)) {
                    player.setVelocityX(600);
                }

                else {
                    if (distanceY >= 0) { // Y positif (va en haut)
                        player.setVelocityY(-600);
                    }
                    else if (distanceY < 0) { // Y positif (va en bas)
                        player.setVelocityY(600);
                    }
                }
            }


            // retrait des pv dans la variable
            this.scene.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.scene.health < 0) {
                this.scene.killPlayer();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                this.scene.time.delayedCall(500, () => { this.scene.delock_joueur() }, null, this);

                // Visuel de la frame d'invulnérabilité
                this.scene.pinvisible();
            }
        }
    }

    hitPlayerBigAttack(player, attackZone) {

        if (this.isDangerous && !this.scene.player_beHit && this.isBigHitting) {

            const distanceX = this.x - player.x;
            const distanceY = this.y - player.y;

            // variable qui empêchera de se faire taper pendant la frame d'invul
            this.scene.player_beHit = true;

            // retrait des pv dans la variable
            this.scene.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.scene.health < 0) {
                this.scene.killPlayer();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                // Visuel de la frame d'invulnérabilité
                this.scene.pinvisible();
            }
        }
    }

    bigAttack() {

        this.setVelocity(0, 0);
        this.isBigHitting = true;

        this.anims.play("bossBigHit_anims", true);

        this.scene.tileAttackGroup.children.each(obj => {

            this.scene.time.delayedCall(1000, () => {

                obj.setAlpha(1);
                obj.enableBody(true, obj.x, obj.y, true, true);
                obj.anims.play("tileAttack_anims", true);
                //obj.setAlpha(.5);

            }, null, this);

            this.scene.time.delayedCall(4000, () => {

                //obj.setAlpha(1);
                this.isDangerous = true;

            }, null, this);

            this.scene.time.delayedCall(4500, () => {

                obj.anims.play("tileAttackIn_anims", true);

                //obj.disableBody(true, true);
                this.isDangerous = false;
                this.isBigHitting = false;

            }, null, this);

            this.scene.time.delayedCall(4750, () => {

                this.scene.tweens.add({
                    targets: obj,
                    alpha: 0,
                    duration: 500,  // Durée de l'animation en millisecondes
                    ease: 'Linear', // Fonction d'interpolation pour l'animation
                });

            }, null, this);

        })

    }

    shoutProj() {
        this.setVelocity(0, 0);
        this.isHitting = true;

        this.anims.play("bossHitDist_anims", true);

        this.scene.time.delayedCall(1000, () => {

            if (this.phase == 1) {
                const newProj = this.scene.physics.add.sprite(this.x, this.y, 'projmobB').setDepth(2);
                newProj.anims.play("projBoss", true);
                this.scene.attaquemobB.add(newProj)
                this.scene.physics.moveTo(newProj, this.scene.player.x, this.scene.player.y + 8, this.speedProj);

            }

            else if (this.phase == 2) {
                const newProj = this.scene.physics.add.sprite(this.x, this.y, 'projmobB').setDepth(2);
                newProj.anims.play("projBoss", true);
                this.scene.attaquemobB.add(newProj);
                this.scene.physics.moveTo(newProj, this.scene.player.x, this.scene.player.y + 8, this.speedProj);

                this.scene.time.delayedCall(500, () => {

                    const newProj2 = this.scene.physics.add.sprite(this.x, this.y, 'projmobB').setDepth(2);
                    newProj2.anims.play("projBoss", true);
                    this.scene.attaquemobB.add(newProj2)
                    this.scene.physics.moveTo(newProj2, this.scene.player.x, this.scene.player.y + 8, this.speedProj);

                }, null, this);
            }

            else if (this.phase == 3) {
                const newProj = this.scene.physics.add.sprite(this.x, this.y, 'projmobB').setDepth(2);
                newProj.anims.play("projBoss", true);

                this.scene.attaquemobB.add(newProj)

                this.scene.physics.moveTo(newProj, this.scene.player.x, this.scene.player.y + 8, this.speedProj);

                this.scene.time.delayedCall(500, () => {

                    const newProj2 = this.scene.physics.add.sprite(this.x, this.y, 'projmobB').setDepth(2);
                    newProj2.anims.play("projBoss", true);
                    this.scene.attaquemobB.add(newProj2)
                    this.scene.physics.moveTo(newProj2, this.scene.player.x, this.scene.player.y + 8, this.speedProj);

                }, null, this);

                this.scene.time.delayedCall(1000, () => {

                    const newProj3 = this.scene.physics.add.sprite(this.x, this.y, 'projmobB').setDepth(2);
                    newProj3.anims.play("projBoss", true);
                    this.scene.attaquemobB.add(newProj3)
                    this.scene.physics.moveTo(newProj3, this.scene.player.x, this.scene.player.y + 8, this.speedProj);

                }, null, this);
            }

            // fin du tir
            this.scene.time.delayedCall(1500, () => {

                this.isHitting = false;

            }, null, this);

        }, null, this);
    }

    castMobs() {

        if (!this.isHitting && !this.isBigHitting && this.isChasing) {

            this.setVelocity(0, 0);

            this.anims.play("bossCastIn_anims", true);

            this.isCasting = true;
            let xSpawn = null;
            let ySpawn = null;
            let numberStep = null;

            this.castTimer.paused = true;

            if (this.phase == 1) {
                ySpawn = this.y;
                numberStep = 2;
            }

            else if (this.phase == 2) {
                numberStep = 3;
            }

            else if (this.phase == 3) {
                numberStep = 4;
            }

            this.scene.time.delayedCall(2000, () => {

                console.log(numberStep);

                for (let step = 0; step < numberStep; step++) {

                    if (this.phase == 1) {

                        if (step == 0) {
                            xSpawn = this.x - 48
                        }
                        else {
                            xSpawn = this.x + 48
                        }

                    }

                    if (this.phase == 2) {

                        if (step == 0) {
                            xSpawn = this.x - 48
                            ySpawn = this.y - 48;
                        }
                        else if (step == 1) {
                            xSpawn = this.x + 48
                            ySpawn = this.y - 48
                        }
                        else {
                            xSpawn = this.x
                            ySpawn = this.y + 48
                        }

                    }

                    if (this.phase == 3) {

                        if (step == 0) {
                            xSpawn = this.x - 48;
                            ySpawn = this.y - 48;
                        }
                        else if (step == 1) {
                            xSpawn = this.x + 48;
                            ySpawn = this.y - 48;
                        }
                        else if (step == 2) {
                            xSpawn = this.x - 48;
                            ySpawn = this.y + 48;
                        }
                        else if (step == 3) {
                            xSpawn = this.x + 48;
                            ySpawn = this.y + 48;
                        }

                    }

                    this.anims.play("bossCastOut_anims", true);

                    const castMobD = new MobD(this.scene, xSpawn, ySpawn, 'mobD').setOrigin(.5, .5)
                        .setSize(16, 24)
                        .setDepth(1)
                        .setAlpha(0);

                    this.scene.tweens.add({
                        targets: castMobD,
                        alpha: 1,
                        duration: 500,  // Durée de l'animation en millisecondes
                        ease: 'Linear', // Fonction d'interpolation pour l'animation
                    });

                    this.scene.mobD.add(castMobD);
                }

                this.scene.time.delayedCall(2500, () => {

                    this.isCasting = false;
                    this.castTimer.paused = false;

                }, null, this);

            }, null, this);
        }
    }

    // Duo de fonctions qui font ping pong pour frames d'invulnérabilités
    pinvisible() {
        this.setVisible(false);
        this.scene.time.delayedCall(50, this.pvisible, [], this);
    }

    pvisible() {
        if (this.clignotement < 3) {
            this.scene.time.delayedCall(50, this.pinvisible, [], this);
            this.visible = true;
            this.clignotement += 1;
        }
        else {
            this.visible = true;
            this.clignotement = 0;
        }
    }

    // Hit au CAC
    perteVieBoss(mobA, attaque) {
        this.health -= 1;
        this.pinvisible();
        attaque.disableBody(true, true);
    }

    // Hit à distance
    perteVieBossShoot(mobA, attaque_shoot) {

        //this.health -= 1;
        //this.pinvisible();

        attaque_shoot.disableBody(true, true);
        this.scene.shoot_lock = false;
    }
}

export default Boss