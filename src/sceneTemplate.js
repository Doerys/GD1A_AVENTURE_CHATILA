import BeanLader from "./beanLader.js";
import Bridge from "./bridge.js";

class SceneTemplate extends Phaser.Scene {

    constructor(name) {
        super({
            key: name,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                }
            },
            input: { gamepad: true },
            pixelArt: true,

            fps: {
                target: 60,
            },
        })
    }

    initLauncher(data) {
        this.mapName = data.mapName;
        this.mapTileset = data.mapTileset;
        this.mapTilesetImage = data.mapTilesetImage;

        this.attackCaCLoot = data.attackCaCLoot;
        this.attackDistanceLoot = data.attackDistanceLoot;
        this.volerLoot = data.volerLoot;

        this.graineScore = data.graineScore,

            this.player_facing = data.player_facing,

            this.speed = data.speed;
        this.health = data.health;

        this.spawnX = data.spawnX;
        this.spawnY = data.spawnY;
    }

    loadMap(levelMap) {
        this.player_block = false; // fige le personnage
        this.player_beHit = false; // subir des dégâts
        this.shoot_lock = false; // bloque l'option de tir
        this.clignotement = 0; // frames d'invulnérabilité
        this.ableSpitMobB = true;
        this.ableSpitMobBLeft = true;
        this.ableSpitMobBRight = true;
        this.ableMobC = true;
        this.mobCDanger = true;
        this.carryGraine = false;
        this.flyingMod = false;

        this.controller = false;

        this.nextScene = ""

        // création joueur

        //this.player = this.physics.add.sprite(1632, 1856, 'player')
        //this.player = this.physics.add.sprite(500, 1800, 'player')

        this.player = this.physics.add.sprite(this.spawnX, this.spawnY, 'player')
            .setSize(15, 15)
            .setOffset(24, 42)
            .setDepth(3);

        //Création Attaques CaC et Distance
        this.attaque_sword = this.physics.add.staticGroup();
        this.attaque_shoot = this.physics.add.group();

        // CHARGEMENT DE LA MAP

        //Load Map
        this.map = this.add.tilemap(this.mapName);
        this.tileset = this.map.addTilesetImage(this.mapTileset, this.mapTilesetImage)

        if (this.mapName != "map_tuto" || this.mapName != "map_donjon") {
            this.tileset_laitue = this.map.addTilesetImage('grande_laitue', 'grande_laitue')
            this.laitue = this.map.createLayer('laitue_layer', this.tileset_laitue);

            this.physics.add.collider(this.player, this.laitue);
        }

        // CAMERA et LIMITES DU MONDE

        if (this.mapName == "map_tuto") {
            this.physics.world.setBounds(0, 0, 2496, 2496);
            this.cameras.main.setBounds(0, 32, 2496, 2496)
        }

        else if (this.mapName == "map_hub") {
            this.physics.world.setBounds(0, 0, 1184, 1504);
            this.cameras.main.setBounds(32, 0, 1120, 1470);
        }

        else if (this.mapName == "map_zone1") {
            this.physics.world.setBounds(0, 0, 3584, 4640);
            this.cameras.main.setBounds(-32, 0, 3360, 4640);
        }

        else if (this.mapName == "map_zone2") {
            this.physics.world.setBounds(0, 0, 3072, 4096);
            this.cameras.main.setBounds(32, 0, 3040, 4096);
        }

        else if (this.mapName == "map_donjon") {
            this.physics.world.setBounds(0, 0, 2240, 2784);
            this.cameras.main.setBounds(0, -32, 2240, 2784);
        }

        else if (this.mapName == "map_secrete") {
            this.physics.world.setBounds(0, 0, 1152, 768);
            this.cameras.main.setBounds(32, 0, 1120, 768);
        }

        this.cameras.main.setSize(683, 384) //format 16/9
            .fadeIn(750, 0, 0, 0)
            .startFollow(this.player, true)

        //player.setCollideWorldBounds(true); (bloque le joueur, NE PAS ACTIVER)

        // UI

        //Barre de vie
        this.interface = this.add.sprite(341, 44, 'interface').setScrollFactor(0).setDepth(10);
        this.textScore = this.add.text(636, 44, `${this.graineScore}`, { font: '14px Mabook', fill: '#963d17', align: 'center' }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(10);

        this.lifeUI = this.add.sprite(341, 44, 'life1').setScrollFactor(0).setDepth(10);
        this.serpeUI = this.add.sprite(341, 44, 'serpe_ui').setScrollFactor(0).setDepth(10);
        this.graineCourgeUI = this.add.sprite(341, 44, 'graineCourge_ui').setScrollFactor(0).setDepth(10);
        this.saladeUI = this.add.sprite(341, 44, 'salade_ui').setScrollFactor(0).setDepth(10);

        // boite de dialogue

        // Create dialogue box and text
        this.dialogueBox = this.add.sprite(341.5, 300, "dialogue").setScrollFactor(0).setOrigin(0.5, 0).setDepth(10);

        this.dialogueText = this.add.text(341.5, 330, '', { font: '11px Mabook', fill: '#ffffff', align: 'center' })
            .setOrigin(0.5, 0.5)
            .setScrollFactor(0)
            .setDepth(11); // place + style du texte

        // COMMANDES

        // récupération des touches direction - CHECK
        this.cursors = this.input.keyboard.createCursorKeys();

        this.Zkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.Skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.Qkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.EKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // MANETTE
        this.input.gamepad.once('connected', function (pad) {
            this.controller = pad;
        }, this);

        // loads calques de tuiles

        this.sol = this.map.createLayer('sol_layer', this.tileset).setDepth(-5); // calque sol
        this.eau = this.map.createLayer('eau_layer', this.tileset).setDepth(-4);
        this.murs = this.map.createLayer('murs_layer', this.tileset).setDepth(-4); //calque mur
        this.decor = this.map.createLayer('decor_layer', this.tileset).setDepth(-3);
        this.obstacles = this.map.createLayer('obstacle_layer', this.tileset);
        this.aboveDecor = this.map.createLayer('aboveDecor_layer', this.tileset).setDepth(5);;

        // Sprites et groupes

        // GRAINE HARICOT

        this.grainesHaricot = this.physics.add.group();

        this.graines_layer = this.map.getObjectLayer('graines_layer');
        this.graines_layer.objects.forEach(graines_layer => {
            this.graines_create = this.physics.add.sprite(graines_layer.x + 16, graines_layer.y + 16, 'box');
            this.grainesHaricot.add(this.graines_create);
        });

        if (this.mapName != "map_hub" && this.mapName != "map_secrete") {

            // Trous Graine Haricot

            this.beanHole_layer = this.map.getObjectLayer('beanHole_layer');
            this.beanHole_layer.objects.forEach(beanHole => {
                const echelleHaricot = new BeanLader(this, beanHole.x + 16, beanHole.y, 'echelle');
                echelleHaricot.anims.play('falseEchelle');

                const murHaricot = this.physics.add.staticSprite(beanHole.x + 16, beanHole.y - 16)
                    .setSize(32, 32);

                this.physics.add.collider(this.player, murHaricot);
                this.physics.add.overlap(echelleHaricot, this.grainesHaricot, this.createEchelle, null, this);
                this.physics.add.overlap(echelleHaricot, murHaricot, () => {

                    if (echelleHaricot.isCreated) {

                        this.time.delayedCall(1500, function () {
                            murHaricot.disableBody(true, true);
                        }, [], this);

                    }

                }, null, this);
            });

        }

        if (this.mapName != "map_tuto") {

            // Fleur de courge 
            this.bridges = this.physics.add.group();
            this.murBridges = this.physics.add.group();

            this.bridge_layer = this.map.getObjectLayer('bridge_layer');
            this.bridge_layer.objects.forEach(bridge => {

                const newBridge = new Bridge(this, bridge.x, bridge.y, 'bridge').setOrigin(0, 0)
                    .setPushable(false)

                const murBridge = this.physics.add.sprite(bridge.x + 32, bridge.y + 32).setPushable(false);

                if (bridge.name == "up") {
                    murBridge.setPosition(bridge.x + 16, bridge.y - 48)
                        .setSize(32, 96)

                    newBridge.setPosition(bridge.x, bridge.y - 96).setOffset(0, 96);

                    newBridge.name = "up";

                    newBridge.anims.play('falseBridge');
                }

                else if (bridge.name == "down") {
                    murBridge.setPosition(bridge.x + 16, bridge.y + 80)
                        .setSize(32, 96)

                    newBridge.setOffset(0, 0);

                    newBridge.name = "down";

                    newBridge.anims.play('falseBridgeDown');
                }

                else if (bridge.name == "right") {
                    murBridge.setPosition(bridge.x + 80, bridge.y + 16)
                        .setSize(96, 32);

                    newBridge.setPosition(bridge.x, bridge.y).setOffset(0, 0);

                    newBridge.name = "right";

                    newBridge.anims.play('falseBridgeDown');
                }

                else if (bridge.name == "left") {
                    murBridge.setPosition(bridge.x - 48, bridge.y + 16)
                        .setSize(96, 32);

                    newBridge.setPosition(bridge.x - 96, bridge.y).setOffset(96, 0);

                    newBridge.name = "left";

                    newBridge.anims.play('falseBridgeLeft');
                }

                this.bridges.add(newBridge);
                this.murBridges.add(murBridge);

                this.physics.add.collider(this.player, murBridge);
                this.physics.add.collider(newBridge, this.attaque_shoot, (unit, proj) => {
                    proj.disableBody(true, true);
                    this.shoot_lock = false;
                    newBridge.isCreated = true;

                    murBridge.disableBody(true, true);

                    if (bridge.name == "up") {
                        newBridge.anims.play('trueBridge');
                    }

                    else if (bridge.name == "down") {
                        newBridge.anims.play('trueBridgeDown');
                    }

                    else if (bridge.name == "right") {
                        newBridge.anims.play('trueBridgeRight');
                    }

                    else if (bridge.name == "left") {
                        newBridge.anims.play('trueBridgeLeft');
                    }
                });
            });
        }

        // LOOTS

        if (this.mapName != "map_hub") {

            //Soin
            this.heal = this.physics.add.group();
            this.heal_layer = this.map.getObjectLayer('heal_layer');
            this.heal_layer.objects.forEach(heal_layer => {
                this.healCreate = this.heal.create(heal_layer.x + 16, heal_layer.y + 16, "heal")
                    .setSize(16, 16)
                    .setOrigin(0.5, 0.5)
                this.tweens.add({
                    targets: this.healCreate,
                    y: this.healCreate.y + 5,
                    duration: 500,
                    yoyo: true,
                    delay: 50,
                    repeat: -1
                });
            });

            this.heal.add(this.healCreate);

            // Graines Scores
            this.money = this.physics.add.group();
            this.money_layer = this.map.getObjectLayer('money_layer');
            this.money_layer.objects.forEach(money_layer => {
                this.moneyCreate = this.money.create(money_layer.x + 16, money_layer.y + 16, "grainesScore")
                    .setSize(16, 16)
                    .setOrigin(0.5, 0.5)
                this.tweens.add({
                    targets: this.moneyCreate,
                    y: this.moneyCreate.y + 5,
                    duration: 500,
                    yoyo: true,
                    delay: 50,
                    repeat: -1
                });
            });

            this.money.add(this.moneyCreate);

        }

        // RONCES 

        this.ronces = this.physics.add.staticGroup()

        this.ronces_layer = this.map.getObjectLayer('ronces_layer');
        this.ronces_layer.objects.forEach(ronces_layer => {
            this.ronces_create = this.physics.add.staticSprite(ronces_layer.x + 16, ronces_layer.y + 16, 'ronces');
            this.ronces.add(this.ronces_create);
        });

        // PNJ

        this.npcs = this.physics.add.staticGroup();

        // MOB A

        this.mobA = this.physics.add.group();

        // Va vers le bas

        this.mobADown_layer = this.map.getObjectLayer('mobADown_layer');
        this.mobADown_layer.objects.forEach(mobADown_layer => {
            this.mobADown_create = this.physics.add.sprite(mobADown_layer.x + 16, mobADown_layer.y + 16, 'mobA')
                .setSize(16, 16)
                .setOffset(8, 16)

            this.mobADown_create.anims.play('mobAanim');

            this.mobA.add(this.mobADown_create);

            this.mobADown_create.setVelocityY(100);
        });

        // Va vers le haut

        this.mobAUp_layer = this.map.getObjectLayer('mobAUp_layer');
        this.mobAUp_layer.objects.forEach(mobAUp_layer => {
            this.mobAUp_create = this.physics.add.sprite(mobAUp_layer.x + 16, mobAUp_layer.y + 16, 'mobA')
                .setSize(16, 16)
                .setOffset(8, 16)

            this.mobAUp_create.anims.play('mobAanim');

            this.mobA.add(this.mobAUp_create);

            this.mobAUp_create.setVelocityY(-100);
        });

        // MOB B

        this.mobB = this.physics.add.staticGroup();
        this.attaquemobB = this.physics.add.group();

        // Va vers le bas

        this.mobBDown = this.physics.add.staticGroup();

        this.mobBDown_layer = this.map.getObjectLayer('mobBDown_layer');
        this.mobBDown_layer.objects.forEach(mobBDown_layer => {
            this.mobBDown_create = this.physics.add.staticSprite(mobBDown_layer.x + 16, mobBDown_layer.y + 16, 'mobB')
                .setSize(32, 16)
                .setOffset(0, 16)
            this.mobBDown_create.anims.play('mobBDownanim');

            this.mobB.add(this.mobBDown_create);
            this.mobBDown.add(this.mobBDown_create);
        });

        // Va vers la droite

        this.mobBRight = this.physics.add.staticGroup();

        this.mobBRight_layer = this.map.getObjectLayer('mobBRight_layer');
        this.mobBRight_layer.objects.forEach(mobBRight_layer => {
            this.mobBRight_create = this.physics.add.staticSprite(mobBRight_layer.x + 16, mobBRight_layer.y + 16, 'mobB')
                .setSize(32, 16)
                .setOffset(0, 16)
            this.mobBRight_create.anims.play('mobBRightanim');

            this.mobB.add(this.mobBRight_create);
            this.mobBRight.add(this.mobBRight_create);
        });

        // Va vers la gauche

        this.mobBLeft = this.physics.add.staticGroup();

        this.mobBLeft_layer = this.map.getObjectLayer('mobBLeft_layer');
        this.mobBLeft_layer.objects.forEach(mobBLeft_layer => {
            this.mobBLeft_create = this.physics.add.staticSprite(mobBLeft_layer.x + 16, mobBLeft_layer.y + 16, 'mobB')
                .setSize(32, 16)
                .setOffset(0, 16)
            this.mobBLeft_create.anims.play('mobBLeftanim');

            this.mobB.add(this.mobBLeft_create);
            this.mobBLeft.add(this.mobBLeft_create);
        });

        if (this.mapName != "map_donjon") {

            // MOB C

            this.mobC = this.physics.add.group();

            this.mobC_layer = this.map.getObjectLayer('mobC_layer');
            this.mobC_layer.objects.forEach(mobC_layer => {
                this.mobC_create = this.physics.add.sprite(mobC_layer.x + 16, mobC_layer.y + 16, 'mobC');
                this.mobC_create.setSize(16, 16)
                    .setOffset(8, 16)
                this.mobC_create.anims.play('mobC_anims');
                this.mobC.add(this.mobC_create);
            });

            this.stateMobC();
        }

        else {
            // MOB C

            this.mobC1 = this.physics.add.group();
            this.mobC1_layer = this.map.getObjectLayer('mobC1_layer');
            this.mobC1_layer.objects.forEach(mobC1_layer => {
                this.mobC1_create = this.physics.add.sprite(mobC1_layer.x + 16, mobC1_layer.y + 16, 'mobC');
                this.mobC1_create.setSize(20, 32);
                this.mobC1_create.anims.play('mobC_anims');
                this.mobC1.add(this.mobC1_create);
            });

            this.mobC2 = this.physics.add.group();
            this.mobC2_layer = this.map.getObjectLayer('mobC2_layer');
            this.mobC2_layer.objects.forEach(mobC2_layer => {
                this.mobC2_create = this.physics.add.sprite(mobC2_layer.x + 16, mobC2_layer.y + 16, 'mobC2');
                this.mobC2_create.setSize(20, 32);
                this.mobC2_create.anims.play('mobC2_anims');
                this.mobC2.add(this.mobC2_create);
            });

            this.physics.add.overlap(this.player, this.mobC1, this.perteVieMobC1, null, this);
            this.physics.add.overlap(this.player, this.mobC2, this.perteVieMobC2, null, this);

            this.stateMobC1();
            this.enableMobC2();
        }

        if (this.mapName == "map_donjon") {

            //Passages vol

            this.trouRight = this.physics.add.staticGroup();
            this.trouRight_layer = this.map.getObjectLayer('trouRight_layer');
            this.trouRight_layer.objects.forEach(trouRight_layer => {
                this.trouRight_create = this.physics.add.staticSprite(trouRight_layer.x + 16, trouRight_layer.y + 16);
                this.trouRight.add(this.trouRight_create);
            });

            this.trouLeft = this.physics.add.staticGroup();
            this.trouLeft_layer = this.map.getObjectLayer('trouLeft_layer');
            this.trouLeft_layer.objects.forEach(trouLeft_layer => {
                this.trouLeft_create = this.physics.add.staticSprite(trouLeft_layer.x + 16, trouLeft_layer.y + 16);
                this.trouLeft.add(this.trouLeft_create);
            });

            this.trouDown = this.physics.add.staticGroup();
            this.trouDown_layer = this.map.getObjectLayer('trouDown_layer');
            this.trouDown_layer.objects.forEach(trouDown_layer => {
                this.trouDown_create = this.physics.add.staticSprite(trouDown_layer.x + 16, trouDown_layer.y + 16);
                this.trouDown.add(this.trouDown_create);
            });

            this.trouUp = this.physics.add.staticGroup();
            this.trouUp_layer = this.map.getObjectLayer('trouUp_layer');
            this.trouUp_layer.objects.forEach(trouUp_layer => {
                this.trouUp_create = this.physics.add.staticSprite(trouUp_layer.x + 16, trouUp_layer.y + 16);
                this.trouUp.add(this.trouUp_create);
            });

            this.stopVol = this.physics.add.staticGroup();
            this.stopVol_layer = this.map.getObjectLayer('stopVol_layer');
            this.stopVol_layer.objects.forEach(stopVol_layer => {
                this.stopVol_create = this.physics.add.staticSprite(stopVol_layer.x + 16, stopVol_layer.y + 16);
                this.stopVol.add(this.stopVol_create);
            });

        }

        // PASSAGES DE SCENE

        if (this.mapName == "map_tuto") {

            // Passage scene HUB
            this.versHub = this.physics.add.staticGroup();
            this.versHub.create(2064, 16, "passage3x1");

            // Passage scène hub
            this.physics.add.overlap(this.player, this.versHub, this.passageScene, null, this);
        }

        else if (this.mapName == "map_hub") {

            this.versTuto = this.physics.add.staticGroup();
            this.versTuto.create(528, 1488, "passage3x1");

            this.versZone1 = this.physics.add.staticGroup();
            this.versZone1.create(16, 996, "passage1x3");

            this.versZone2 = this.physics.add.staticGroup();
            this.versZone2.create(1168, 1088, "passage1x4");

            this.versDonjon = this.physics.add.staticGroup();
            this.versDonjon.create(592, 560, "passage3x1");

            // Passage scène hub
            this.physics.add.collider(this.player, this.versTuto);
            this.physics.add.overlap(this.player, this.versZone1, () => { this.nextScene = "zone1"; this.passageScene() }, null, this);
            this.physics.add.overlap(this.player, this.versZone2, () => { this.nextScene = "zone2"; this.passageScene() }, null, this);
            this.physics.add.overlap(this.player, this.versDonjon, () => { this.nextScene = "zoneDonjon"; this.passageScene() }, null, this);
        }

        else if (this.mapName == "map_zone1") {

            // Passage scene HUB
            this.sceneSuivante = this.physics.add.staticGroup();
            this.sceneSuivante.create(3344, 4048, "passage1x3");

            // Passage scene SECRETE
            this.sceneSecrete = this.physics.add.staticGroup();
            this.sceneSecrete.create(3344, 704, "passage1x4");

            // Passage scène hub
            this.physics.add.overlap(this.player, this.sceneSuivante, () => { this.nextScene = "hub"; this.passageScene() }, null, this);
            this.physics.add.overlap(this.player, this.sceneSecrete, () => { this.nextScene = "secret"; this.passageScene() }, null, this);

        }

        else if (this.mapName == "map_zone2") {

            // Passage scene HUB
            this.sceneSuivante = this.physics.add.staticGroup();
            this.sceneSuivante.create(16, 3040, "passage1x4");

            this.sceneSecrete = this.physics.add.staticGroup();
            this.sceneSecrete.create(16, 752, "passage1x3");

            // Passage scène hub
            this.physics.add.overlap(this.player, this.sceneSuivante, () => { this.nextScene = "hub"; this.passageScene() }, null, this);
            this.physics.add.overlap(this.player, this.sceneSecrete, () => { this.nextScene = "secret"; this.passageScene() }, null, this);

        }

        else if (this.mapName == "map_donjon") {
            // Passage scene HUB
            this.scene1 = this.physics.add.staticGroup();
            this.scene1.create(1136, 2768, "passage3x1");

            // Passage scène hub
            this.physics.add.overlap(this.player, this.scene1, this.passageHub, null, this);
        }

        else if (this.mapName == "map_secrete") {
            // Passage scene HUB
            this.scene1 = this.physics.add.staticGroup();
            this.scene1.create(16, 416, "passage1x4");

            this.scene2 = this.physics.add.staticGroup();
            this.scene2.create(1136, 432, "passage1x3");

            // Passage scène hub
            this.physics.add.overlap(this.player, this.scene1, () => { this.nextScene = "zone1"; this.passageScene() }, null, this);
            this.physics.add.overlap(this.player, this.scene2, () => { this.nextScene = "zone2"; this.passageScene() }, null, this);
        }

        // Patterns de déplacement mobs A
        this.switchRight_Layer = this.map.createLayer('switchRight_Layer', this.tileset);
        this.switchRight_Layer.setVisible(false);

        this.switchLeft_Layer = this.map.createLayer('switchLeft_Layer', this.tileset);
        this.switchLeft_Layer.setVisible(false);

        this.switchDown_Layer = this.map.createLayer('switchDown_Layer', this.tileset);
        this.switchDown_Layer.setVisible(false);

        this.switchUp_Layer = this.map.createLayer('switchUp_Layer', this.tileset);
        this.switchUp_Layer.setVisible(false);

        // COLLISIONS

        // SET BY PROPERTY

        // Calques tuiles
        this.murs.setCollisionByProperty({ estSolide: true });
        this.eau.setCollisionByProperty({ estLiquide: true });
        this.obstacles.setCollisionByProperty({ estSolide: true });

        // Pattern déplacement mob A
        this.switchRight_Layer.setCollisionByProperty({ estSolide: true });
        this.switchLeft_Layer.setCollisionByProperty({ estSolide: true });
        this.switchDown_Layer.setCollisionByProperty({ estSolide: true });
        this.switchUp_Layer.setCollisionByProperty({ estSolide: true });

        // COLLIDERS ET OVERLAPS

        // Joueur - Environnement
        this.collisionMur = this.physics.add.collider(this.player, this.murs);
        this.collisionEau = this.physics.add.collider(this.player, this.eau);
        this.collisionObstacles = this.physics.add.collider(this.player, this.obstacles);

        this.physics.add.overlap(this.player, this.grainesHaricot, this.grabGraine, null, this);

        this.physics.add.overlap(this.player, this.trouRight, this.sautRight, null, this);
        this.physics.add.overlap(this.player, this.trouLeft, this.sautLeft, null, this);
        this.physics.add.overlap(this.player, this.trouDown, this.sautDown, null, this);
        this.physics.add.overlap(this.player, this.trouUp, this.sautUp, null, this);
        this.physics.add.overlap(this.player, this.stopVol, this.stopSaut, null, this);

        // INTERACTION MOBS

        // Ennemis pattern déplacement
        this.physics.add.collider(this.mobA, this.switchDown_Layer, this.mob_switch_down, null, this);

        this.physics.add.collider(this.mobA, this.switchUp_Layer, this.mob_switch_up, null, this);

        this.physics.add.collider(this.mobA, this.switchLeft_Layer, this.mob_switch_left, null, this);

        this.physics.add.collider(this.mobA, this.switchRight_Layer, this.mob_switch_right, null, this);

        // Joueur - Ennemi (perte de vie)

        this.physics.add.collider(this.mobA, this.attaque_sword, this.kill_mob, null, this);
        this.physics.add.collider(this.mobA, this.attaque_shoot, this.kill_mob_shoot, null, this);
        this.physics.add.overlap(this.player, this.mobA, this.perteVieMobA, null, this);
        this.physics.add.overlap(this.player, this.mobA, this.perteVieMobA, null, this);

        this.physics.add.collider(this.player, this.mobB);
        this.physics.add.collider(this.player, this.mobB);
        this.physics.add.collider(this.player, this.mobB);
        this.physics.add.collider(this.mobB, this.attaque_sword, this.kill_mob, null, this);
        this.physics.add.collider(this.mobB, this.attaque_sword, this.kill_mob, null, this);
        this.physics.add.collider(this.mobB, this.attaque_sword, this.kill_mob, null, this);

        this.physics.add.overlap(this.player, this.attaquemobB, this.perteVieMobB, null, this);
        this.physics.add.collider(this.attaquemobB, this.murs, this.clean_projMobB, null, this);

        this.physics.add.overlap(this.player, this.mobC, this.perteVieMobC, null, this);
        this.physics.add.collider(this.player, this.ronces);

        this.physics.add.collider(this.player, this.npcs);

        // Loot

        this.physics.add.overlap(this.player, this.money, this.collectLoot, null, this);
        this.physics.add.overlap(this.player, this.heal, this.collectHeal, null, this);

        // Joueur attaques - CaC et distance
        this.physics.add.overlap(this.attaque_sword, this.murs, this.clean_sword, this.if_clean_sword, this);
        this.physics.add.collider(this.attaque_shoot, this.murs, this.delock_shoot, null, this);
        this.physics.add.collider(this.attaque_shoot, this.obstacles, this.delock_shoot, null, this);
        this.physics.add.collider(this.attaque_shoot, this.mobB, this.delock_shoot, null, this);
        this.physics.add.collider(this.attaque_shoot, this.eau, this.delock_shoot, null, this);

        this.physics.add.collider(this.ronces, this.attaque_sword, this.destroyRonces, null, this);
    }

    updateManager() {

        if (this.player_block == false) {
            //Mouvement

            this.player.body.setVelocity(0); // l'empêche de continuer dans une direction sans presser lb outon

            if ((this.cursors.up.isDown || this.Zkey.isDown) && (this.cursors.right.isDown || this.Dkey.isDown) && (this.cursors.left.isDown || this.Qkey.isDown)) { // HAUT && DROITE && GAUCHE
                this.player.setVelocityY(-this.speed);

                if (this.carryGraine) {
                    this.player.anims.play('walk_up_carry', true);
                }
                else { this.player.anims.play('walk_up', true); }

                this.player_facing = "up";
            }

            else if ((this.cursors.down.isDown || this.Skey.isDown) && (this.cursors.right.isDown || this.Dkey.isDown) && (this.cursors.left.isDown || this.Qkey.isDown)) { // BAS && DROITE && GAUCHE
                this.player.setVelocityY(this.speed);

                if (this.carryGraine) {
                    this.player.anims.play('walk_down_carry', true);
                }
                else { this.player.anims.play('walk_down', true); }

                this.player_facing = "down";
            }

            else if ((this.cursors.up.isDown || this.Zkey.isDown) && (this.cursors.right.isDown || this.Dkey.isDown)) { // HAUT && DROITE
                this.player.setVelocityY(-this.speed);
                this.player.setVelocityX(this.speed);
                if (this.carryGraine) {
                    this.player.anims.play('walk_up_carry', true);
                }
                else { this.player.anims.play('walk_up', true); }
                this.player_facing = "up";
            }

            else if ((this.cursors.down.isDown || this.Skey.isDown) && (this.cursors.right.isDown || this.Dkey.isDown)) { // BAS && DROITE
                this.player.setVelocityY(this.speed);
                this.player.setVelocityX(this.speed);
                if (this.carryGraine) {
                    this.player.anims.play('walk_down_carry', true);
                }
                else { this.player.anims.play('walk_down', true); }
                this.player_facing = "down";
            }

            else if ((this.cursors.up.isDown || this.Zkey.isDown) && (this.cursors.left.isDown || this.Qkey.isDown)) { // HAUT && GAUCHE
                this.player.setVelocityY(-this.speed);
                this.player.setVelocityX(-this.speed);
                if (this.carryGraine) {
                    this.player.anims.play('walk_up_carry', true);
                }
                else { this.player.anims.play('walk_up', true); }
                this.player_facing = "up";
            }

            else if ((this.cursors.down.isDown || this.Skey.isDown) && (this.cursors.left.isDown || this.Qkey.isDown)) { // BAS && DROITE
                this.player.setVelocityY(this.speed);
                this.player.setVelocityX(-this.speed);
                if (this.carryGraine) {
                    this.player.anims.play('walk_down_carry', true);
                }
                else { this.player.anims.play('walk_down', true); }
                this.player_facing = "down";
            }

            else if (this.cursors.right.isDown || this.controller.right || this.Dkey.isDown) { // DROITE
                this.player.setVelocityX(this.speed);
                if (this.carryGraine) {
                    this.player.anims.play('walk_right_carry', true);
                }
                else { this.player.anims.play('walk_right', true); }
                this.player_facing = "right";
            }

            else if (this.cursors.left.isDown || this.controller.left || this.Qkey.isDown) { // GAUCHE
                this.player.setVelocityX(-this.speed);
                if (this.carryGraine) {
                    this.player.anims.play('walk_left_carry', true);
                }
                else { this.player.anims.play('walk_left', true); }
                this.player_facing = "left";
            }

            else if (this.cursors.up.isDown || this.controller.up || this.Zkey.isDown) { // HAUT
                this.player.setVelocityY(-this.speed);
                if (this.carryGraine) {
                    this.player.anims.play('walk_up_carry', true);
                }
                else { this.player.anims.play('walk_up', true); }
                this.player_facing = "up";
            }

            else if (this.cursors.down.isDown || this.controller.down || this.Skey.isDown) { // BAS
                this.player.setVelocityY(this.speed);
                if (this.carryGraine) {
                    this.player.anims.play('walk_down_carry', true);
                }
                else { this.player.anims.play('walk_down', true); }
                this.player_facing = "down";
            }

            else {
                if (this.player_facing == "left") {
                    if (this.carryGraine) {
                        this.player.anims.play('left_carry', true);
                    }
                    else { this.player.anims.play('left', true); }

                }

                if (this.player_facing == "right") {
                    if (this.carryGraine) {
                        this.player.anims.play('right_carry', true);
                    }
                    else { this.player.anims.play('right', true); }
                }

                if (this.player_facing == "up") {
                    if (this.carryGraine) {
                        this.player.anims.play('up_carry', true);
                    }
                    else { this.player.anims.play('up', true); }
                }

                if (this.player_facing == "down") {
                    if (this.carryGraine) {
                        this.player.anims.play('down_carry', true);
                    }
                    else { this.player.anims.play('down', true); }
                }
            }

            //Attaque
            if ((this.cursors.space.isDown || this.controller.A) && this.attackCaCLoot == true && !this.carryGraine) {
                if (this.player_facing == "up") {
                    this.player.anims.play('attack_up', true);
                    this.attaque_sword.create(this.player.x, this.player.y, "sword_y").setVisible(false);
                }
                else if (this.player_facing == "down") {
                    this.player.anims.play('attack_down', true);
                    this.attaque_sword.create(this.player.x, this.player.y + 32, "sword_y").setVisible(false);
                }
                else if (this.player_facing == "right") {
                    this.player.anims.play('attack_right', true);
                    this.attaque_sword.create(this.player.x + 16, this.player.y + 16, "sword_x").setVisible(false);
                }
                else if (this.player_facing == "left") {
                    this.player.anims.play('attack_left', true);
                    this.attaque_sword.create(this.player.x - 16, this.player.y + 16, "sword_x").setVisible(false);
                }
                this.player_block = true;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.time.delayedCall(500, this.delock_attaque, [], this);
            }

            //tir

            if ((this.shiftKey.isDown || this.controller.R2) && this.shoot_lock == false && this.attackDistanceLoot == true && !this.carryGraine) {
                if (this.player_facing == "up") {
                    this.player.anims.play('shoot_up');
                    this.time.delayedCall(300, function () {
                        this.attaque_shoot.create(this.player.x, this.player.y - 32, "proj").setSize(16, 16);
                        this.attaque_shoot.setVelocityY(-500);
                    }, [], this);
                }
                else if (this.player_facing == "down") {
                    this.player.anims.play('shoot_down');
                    this.time.delayedCall(300, function () {
                        this.attaque_shoot.create(this.player.x, this.player.y + 32, "proj").setSize(16, 16);
                        this.attaque_shoot.setVelocityY(500);
                    }, [], this);
                }
                else if (this.player_facing == "right") {
                    this.player.anims.play('shoot_right');

                    this.time.delayedCall(300, function () {
                        this.attaque_shoot.create(this.player.x + 32, this.player.y, "proj").setSize(16, 16);
                        this.attaque_shoot.setVelocityX(500);
                    }, [], this);

                }
                else if (this.player_facing == "left") {

                    this.player.anims.play('shoot_left');

                    this.time.delayedCall(300, function () {
                        this.attaque_shoot.create(this.player.x - 32, this.player.y, "proj").setSize(16, 16);
                        this.attaque_shoot.setVelocityX(-500);
                    }, [], this);
                }

                if (this.mapName != "map_tuto") {
                    this.bridges.children.each(bridge => {

                        if (bridge.isCreated) {
                            bridge.isCreated = false;

                            if (bridge.name == "up") {
                                bridge.anims.play('falseBridge');
                            }

                            else if (bridge.name == "down") {
                                bridge.anims.play('falseBridgeDown');
                            }

                            else if (bridge.name == "right") {
                                bridge.anims.play('falseBridgeRight');
                            }

                            else if (bridge.name == "left") {
                                bridge.anims.play('falseBridgeLeft');
                            }
                        }

                    });

                    this.murBridges.children.each(mur => {
                        mur.enableBody();
                    });

                }

                this.player_block = true;
                this.shoot_lock = true;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.time.delayedCall(500, this.delock_joueur, [], this);
            }
        }

        // Empêche d'aller plus plus en se déplaçant en diagonale
        this.player.body.velocity.normalize().scale(this.speed);

        if (this.mapName != "map_hub") {
            this.mobBSpit();
        }

        this.putGraine();
        this.gestionUI();
    }

    // FONCTIONS COMPORTEMENTS MOBS

    //Gestion Pattern Mob A
    mob_switch_right(mobA) {
        mobA.setVelocity(100, 0);
        //mobA.anims.play('right_mob')
    }

    mob_switch_left(mobA) {
        mobA.setVelocity(-100, 0);
        //mobA.anims.play('left_mob')
    }

    mob_switch_up(mobA) {
        mobA.setVelocity(0, -100);
        //mobA.anims.play('up_mob')
    }

    mob_switch_down(mobA) {
        mobA.setVelocity(0, 100);
        //mobA.anims.play('down_mob')
    }

    // Gestion crachat des mobs B
    mobBSpit() {
        if (this.ableSpitMobB) {
            this.mobBDown.children.each(mobBDown => {
                this.attaquemobBDown_create = this.physics.add.sprite(mobBDown.x, mobBDown.y + 16, 'projmobB')
                this.attaquemobB.add(this.attaquemobBDown_create);
                this.attaquemobBDown_create.setVelocityY(250);
            });
            //
            this.mobBLeft.children.each(mobBLeft => {
                this.attaquemobBLeft_create = this.physics.add.sprite(mobBLeft.x - 16, mobBLeft.y, 'projmobB')
                this.attaquemobB.add(this.attaquemobBLeft_create);
                this.attaquemobBLeft_create.setVelocityX(-250);
            });
            //
            this.mobBRight.children.each(mobBRight => {
                this.attaquemobBRight_create = this.physics.add.sprite(mobBRight.x + 16, mobBRight.y, 'projmobB')
                this.attaquemobB.add(this.attaquemobBRight_create);
                this.attaquemobBRight_create.setVelocityX(250);
            });

            this.ableSpitMobB = false;
            this.time.delayedCall(1000, this.enableSpitmobB, [], this);
        }
    }

    // Fonction qui fait ping pong avec le mobBSpit pour gérer le cooldown de crachat
    enableSpitmobB() {
        this.ableSpitMobB = true;
    }

    // fais disparaître le projectile si collider
    clean_projMobB(proj) {
        proj.disableBody(true, true);
    }

    // GESTION MOB C - Fonctions ping pong pour gérer cooldown 

    stateMobC() {
        if (this.ableMobC) {
            this.ableMobC = false;

            this.time.delayedCall(2000, this.enableMobC, [], this);
        }
    }

    enableMobC() {

        this.time.delayedCall(225, () => {

            this.ableMobC = true;
            this.mobCDanger = true;

            this.mobC.children.each(mobC => {
                this.mobC.setAlpha(1);
            });

        }, [], this);

        this.time.delayedCall(1250, () => {
            this.mobCDanger = false;

            this.mobC.children.each(mobC => {
                this.mobC.setAlpha(0.8);
            });
        }, [], this);

        this.time.delayedCall(2000, this.stateMobC, [], this);
    }

    // GESTION MOB C - Fonctions ping pong pour gérer cooldown 

    stateMobC1() {

        if (this.ableMobC1) {
            this.ableMobC1 = false;

            this.time.delayedCall(2000, this.enableMobC, [], this);
        }

    }

    enableMobC1() {

        this.time.delayedCall(225, () => {

            this.ableMobC1 = true;
            this.mobC1Danger = true;

            this.mobC1.children.each(mobC => {
                this.mobC1.setAlpha(1);
            });

        }, [], this);

        this.time.delayedCall(1250, () => {
            this.mobC1Danger = false;

            this.mobC1.children.each(mobC => {
                this.mobC1.setAlpha(0.8);
            });
        }, [], this);

        this.time.delayedCall(2000, this.stateMobC1, [], this);
    }

    stateMobC2() {
        if (this.ableMobC2) {

            this.ableMobC2 = false;
            this.time.delayedCall(2000, this.enableMobC2, [], this);
        }
    }

    enableMobC2() {

        this.time.delayedCall(225, () => {

            this.ableMobC2 = true;
            this.mobC2Danger = true;

            this.mobC2.children.each(mobC => {
                this.mobC2.setAlpha(1);
            });

        }, [], this);

        this.time.delayedCall(1250, () => {
            this.mobC2Danger = false;

            this.mobC2.children.each(mobC => {
                this.mobC2.setAlpha(0.8);
            });
        }, [], this);

        this.time.delayedCall(2000, this.stateMobC2, [], this);
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

            // retrait des pv dans la variable
            this.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.health == 0) {
                this.killPlayer();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                // Visuel de la frame d'invulnérabilité
                this.pinvisible();

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

            // retrait des pv dans la variable
            this.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.health == 0) {
                this.killPlayer();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                // Visuel de la frame d'invulnérabilité
                this.pinvisible();

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

            // retrait des pv dans la variable
            this.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.health < 0) {
                this.killPlayer();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                // Visuel de la frame d'invulnérabilité
                this.pinvisible();

                this.time.delayedCall(500, this.delock_joueur, [], this);
                this.time.delayedCall(1500, this.able_hit, [], this);
            }
        }
    }

    //Perte de vie si touché par mob C
    perteVieMobC1(player, mobC) {
        if (this.player_beHit == false && this.mobC1Danger) {

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

            // retrait des pv dans la variable
            this.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.health < 0) {
                this.killPlayer();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                // Visuel de la frame d'invulnérabilité
                this.pinvisible();

                this.time.delayedCall(500, this.delock_joueur, [], this);
                this.time.delayedCall(1500, this.able_hit, [], this);
            }
        }
    }

    perteVieMobC2(player, mobC) {
        if (this.player_beHit == false && this.mobC2Danger) {

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

            // retrait des pv dans la variable
            this.health -= 1;

            // si la vie est en-dessous de 0, on meurt.
            if (this.health < 0) {
                this.killPlayer();
            }

            // Sinon, on débloque le joueur 0.5 sec plus tard, et on autorise qu'il se fasse taper dessus.
            else {
                // Visuel de la frame d'invulnérabilité
                this.pinvisible();

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

        if (this.loot == 1 && this.health != 5) {
            this.healCreate = this.physics.add.sprite(mob.x, mob.y, 'heal').setSize(16, 16)
            this.tweens.add({
                targets: this.healCreate,
                y: this.healCreate.y + 5,
                duration: 500,
                yoyo: true,
                delay: 50,
                repeat: -1
            });
            this.heal.add(this.healCreate);
        }
        else if (this.loot == 2 || ((this.loot == 1 || this.loot == 2) && this.health == 5)) {

            this.moneyCreate = this.physics.add.sprite(mob.x, mob.y, 'grainesScore').setSize(16, 16)
            this.tweens.add({
                targets: this.moneyCreate,
                y: this.moneyCreate.y + 5,
                duration: 500,
                yoyo: true,
                delay: 50,
                repeat: -1
            });
            this.money.add(this.moneyCreate);
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
        this.textScore.setText(`${this.graineScore}`); // montre le score actuel
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
        graine.disableBody(true, true);
        this.shoot_lock = false;
        trou.isCreated = true;
    }

    // affiche un pont si graine de courge plantée, et enlève le mur invisible qui bloque
    stateBridge() {

        if (this.bridge1Done == true) {
            this.bridge1.anims.play('trueBridge');
            this.murBridge1.disableBody(true, true);
        }
        if (this.bridge1Done == false) {
            this.bridge1.anims.play('falseBridge');
            this.murBridge1.enableBody();
        }
    }

    // ECHELLES HARICOTS

    // affiche une échelle si graine de haricot plantée, et enlève le mur invisible qui bloque
    createEchelle(trou, graine) {
        graine.disableBody(true, true);
        trou.anims.play('trueEchelle');
        trou.isCreated = true;
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
            this.graines_create = this.physics.add.sprite(this.player.x, this.player.y + 16, 'box');
            this.grainesHaricot.add(this.graines_create);
            this.carryGraine = false;
            this.speed = 175;
        }
    }

    // SAUTS - FEUILLE DE SALADE

    sautRight() {
        if ((Phaser.Input.Keyboard.JustDown(this.EKey) || this.controller.B) && this.volerLoot == true && this.carryGraine == false) {
            console.log("CHECK");
            this.player.anims.play("fly_right");
            this.physics.world.removeCollider(this.collisionMur);
            this.physics.world.removeCollider(this.collisionEau);
            this.player_block = true;
            this.player.setVelocityX(150);
            this.flyingMod = true;
        }
    }

    sautLeft() {
        if (Phaser.Input.Keyboard.JustDown(this.EKey) && this.volerLoot == true && this.carryGraine == false) {
            console.log("CHECK");
            this.player.anims.play("fly_left");
            this.physics.world.removeCollider(this.collisionMur);
            this.physics.world.removeCollider(this.collisionEau);
            this.player_block = true;
            this.player.setVelocityX(-150);
            this.flyingMod = true;
        }
    }

    sautDown() {
        if (Phaser.Input.Keyboard.JustDown(this.EKey) && this.volerLoot == true && this.carryGraine == false) {
            console.log("CHECK");
            this.player.anims.play("fly_down");
            this.physics.world.removeCollider(this.collisionMur);
            this.physics.world.removeCollider(this.collisionEau);
            this.player_block = true;
            this.player.setVelocityY(150);
            this.flyingMod = true;
        }
    }

    sautUp() {
        if (Phaser.Input.Keyboard.JustDown(this.EKey) && this.volerLoot == true && this.carryGraine == false) {
            this.player.anims.play("fly_up");
            console.log("CHECK");
            this.physics.world.removeCollider(this.collisionMur);
            this.physics.world.removeCollider(this.collisionEau);
            this.player_block = true;
            this.player.setVelocityY(-150);
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
        const distance1 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y);
        const distance2 = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc2.x, this.npc2.y);
        if (distance1 < 50) { // la distance de déclenchement du dialogue
            if (!this.dialogueBox.visible) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
                this.dialogueBox.visible = true;
                this.dialogueText.setText(this.dialogues[0]);
                let temps = 3000;

                for (let step = 1; step < 5; step++) {
                    this.time.delayedCall(temps, function () {
                        this.dialogueText.setText(this.dialogues[step]);
                    }, [], this);
                    temps += 5000
                }
            }
        }

        else if (distance2 < 50) { // la distance de déclenchement du dialogue
            if (!this.dialogueBox.visible) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
                this.dialogueBox.visible = true;
                this.dialogueText.setText(this.dialogues2[0]);
                let temps = 3000;

                for (let step = 1; step < 5; step++) {
                    this.time.delayedCall(temps, function () {
                        this.dialogueText.setText(this.dialogues2[step]);
                    }, [], this);
                    temps += 5000
                }
            }
        }
        else {
            this.dialogueBox.visible = false;
            this.dialogueText.setText('');
        }
    }

    killPlayer() {

        this.player_block = true;

        this.player.disableBody(true);

        this.tweens.add({
            targets: this.player,
            alpha: 0,
            duration: 750,  // Durée de l'animation en millisecondes
            ease: 'Linear', // Fonction d'interpolation pour l'animation
        });

        this.time.delayedCall(750, function () {
            this.cameras.main.fadeOut(750, 0, 0, 0);
        }, [], this);
        
        this.time.delayedCall(1500, function () {

            if (this.graineScore >= 10) {

                this.scene.start('sceneHub', {

                    mapName: "map_hub", // nom de la map
                    mapTileset: "tileset", // nom du tileset sur TILED
                    mapTilesetImage: "tileset_image", // nom du fichier image du tileset

                    graineScore: this.graineScore - 10,

                    player_facing: "down",

                    // Variables pour débloquer les mécaniques
                    attackCaCLoot: this.attackCaCLoot,
                    attackDistanceLoot: this.attackDistanceLoot,
                    volerLoot: this.volerLoot,

                    speed: this.speed,
                    health: 5,

                    spawnX: 448,
                    spawnY: 1145
                });
            }

            else {
                this.scene.start('sceneTuto', {

                    mapName: "map_tuto", // nom de la map
                    mapTileset: "tileset", // nom du tileset sur TILED
                    mapTilesetImage: "tileset_image", // nom du fichier image du tileset

                    graineScore: 0,

                    player_facing: "down",

                    // Variables pour débloquer les mécaniques
                    attackCaCLoot: false,
                    attackDistanceLoot: false,
                    volerLoot: false,

                    speed: 175,
                    //speed : 800,
                    health: 5,

                    // SPAWN TUTO
                    spawnX: 400,
                    spawnY: 1808

                });
            }
        }, [], this);
    }

    respawn() {

    }

    //Passage scène suivante
    passageScene() {

        this.player_block = true;

        this.cameras.main.fadeOut(750, 0, 0, 0);

        let id_map = null;
        let currentMapName = null;

        let currentSpawnX = null;
        let currentSpawnY = null;

        if (this.mapName == "map_tuto") {

            id_map = 'sceneHub'
            currentMapName = 'map_hub'
            currentSpawnX = 528
            currentSpawnY = 1445

        }

        else if (this.mapName == "map_hub") {

            if (this.nextScene == "zone1") {
                id_map = 'sceneZone1'
                currentMapName = 'map_zone1'
                currentSpawnX = 3296
                currentSpawnY = 4032
            }

            else if (this.nextScene == "zone2") {
                id_map = 'sceneZone2'
                currentMapName = 'map_zone2'
                currentSpawnX = 48
                currentSpawnY = 3040
            }

            else if (this.nextScene == "zoneDonjon") {
                id_map = 'sceneDonjon'
                currentMapName = 'map_donjon'
                currentSpawnX = 1136
                currentSpawnY = 2720
            }
        }

        else if (this.mapName == "map_zone1") {

            if (this.nextScene == "hub") {
                id_map = 'sceneHub'
                currentMapName = 'map_hub'
                currentSpawnX = 48
                currentSpawnY = 976
            }

            else if (this.nextScene == "secret") {
                id_map = 'sceneSecrete'
                currentMapName = 'map_secrete'
                currentSpawnX = 48
                currentSpawnY = 416
            }
        }

        else if (this.mapName == "map_zone2") {

            if (this.nextScene == "hub") {
                id_map = 'sceneHub'
                currentMapName = 'map_hub'
                currentSpawnX = 1136
                currentSpawnY = 1088
            }

            else if (this.nextScene == "secret") {
                id_map = 'sceneSecrete'
                currentMapName = 'map_secrete'
                currentSpawnX = 1104
                currentSpawnY = 432
            }
        }

        else if (this.mapName == "map_donjon") {
            id_map = 'sceneHub'
            currentMapName = 'map_hub'
            currentSpawnX = 592
            currentSpawnY = 624
        }

        else if (this.mapName == "map_secrete") {

            if (this.nextScene == "zone1") {
                id_map = 'sceneZone1'
                currentMapName = 'map_zone1'
                currentSpawnX = 3312
                currentSpawnY = 704
            }

            if (this.nextScene == "zone2") {
                id_map = 'sceneZone2'
                currentMapName = 'map_zone2'
                currentSpawnX = 48
                currentSpawnY = 752
            }
        }

        this.time.delayedCall(1000, function () {

            this.scene.start(id_map, {

                mapName: currentMapName, // nom de la map
                mapTileset: "tileset", // nom du tileset sur TILED
                mapTilesetImage: "tileset_image", // nom du fichier image du tileset

                graineScore: this.graineScore,

                player_facing: this.player_facing,

                // Variables pour débloquer les mécaniques
                attackCaCLoot: this.attackCaCLoot,
                attackDistanceLoot: this.attackDistanceLoot,
                volerLoot: this.volerLoot,

                speed: this.speed,
                health: this.health,
                spawnX: currentSpawnX,
                spawnY: currentSpawnY
            });
        }, [], this);
    }
}

export default SceneTemplate