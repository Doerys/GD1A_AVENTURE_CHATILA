class sceneHub extends Phaser.Scene {

    constructor() {
        super('sceneHub')
    }


    init(data) {
        this.attackCaCLoot = data.attackCaCLoot;
        this.attackDistanceLoot = data.attackDistanceLoot;
        this.volerLoot = data.volerLoot;

        this.graineScore = data.graineScore,

        this.speed = data.speed;
        this.health = data.health;

        this.spawnX = data.spawnX;
        this.spawnY = data.spawnY;
    }

    preload() {}

    create() {

        this.player_block = false; // fige le personnage
        this.player_beHit = false; // subir des dégâts
        this.shoot_lock = false; // bloque l'option de tir
        this.clignotement = 0; // frames d'invulnérabilité
        this.ableSpitMobBDown = true;
        this.ableSpitMobBLeft = true;
        this.ableSpitMobBRight = true;
        this.ableMobC = true;
        this.mobCDanger = true;
        this.carryGraine = false;
        this.flyingMod = false;

        this.dialogueDone = false;

        this.player_facing = "up"; // rotation du personnage standard

        // CHARGEMENT DE LA MAP

        //Load Map
        this.map = this.add.tilemap("map_hub");
        this.tileset = this.map.addTilesetImage('tileset', 'tiles')
        this.tileset_laitue = this.map.addTilesetImage('grande_laitue', 'grande_laitue')

        // loads calques de tuiles

        this.sol = this.map.createLayer('sol_layer', this.tileset); // calque sol
        this.eau = this.map.createLayer('eau_layer', this.tileset);
        this.murs = this.map.createLayer('murs_layer', this.tileset); //calque mur
        this.decor = this.map.createLayer('decor_layer', this.tileset);
        this.laitue = this.map.createLayer('laitue_layer', this.tileset_laitue);

        // Sprites et groupes

        // GRAINE HARICOT

        this.grainesHaricot = this.physics.add.staticGroup();

        this.graines_layer = this.map.getObjectLayer('graines_layer');
        this.graines_layer.objects.forEach(graines_layer => {
            this.graines_create = this.physics.add.staticSprite(graines_layer.x + 16, graines_layer.y + 16, 'box');
            this.grainesHaricot.add(this.graines_create);
        });

        // LOOTS

            //Soin
            this.heal = this.physics.add.group();
            this.heal_layer = this.map.getObjectLayer('heal_layer');
            this.heal_layer.objects.forEach(heal_layer => {
                const Heal = this.heal.create(heal_layer.x + 16, heal_layer.y + 16, "heal");
            });

            // Graines Scores
            this.money = this.physics.add.group();
            this.money_layer = this.map.getObjectLayer('money_layer');
            this.money_layer.objects.forEach(money_layer => {
                const Monnaie = this.money.create(money_layer.x + 16, money_layer.y + 16, "grainesScore");
            });

        // Trous Graine Haricot

        this.murHaricot1 = this.physics.add.staticSprite(2064, 272);
        this.murHaricot1.setSize(32, 32);
        this.echelleHaricot1 = this.physics.add.staticSprite(2064, 288, "echelle");
        this.echelleHaricot1.anims.play('falseEchelle');

        // Fleur de courge 

        this.bridge1Done = false;
        this.bridge1 = this.physics.add.staticSprite(592, 800, 'bridge');
        this.bridge1.anims.play('falseBridge');

        this.murBridge1 = this.physics.add.staticSprite(592, 784);
        this.murBridge1.setSize(32, 96);


        // RONCES 

        this.ronces = this.physics.add.staticGroup();

        this.ronces_layer = this.map.getObjectLayer('ronces_layer');
        this.ronces_layer.objects.forEach(ronces_layer => {
            this.ronces_create = this.physics.add.staticSprite(ronces_layer.x + 16, ronces_layer.y + 16, 'ronces');
            this.ronces.add(this.ronces_create);
        });

        // PNJ
        this.panneau1 = this.physics.add.staticSprite(272, 968, 'panneauG');
        this.panneau2 = this.physics.add.staticSprite(1040, 1032, 'panneauD');
        this.panneau3 = this.physics.add.staticSprite(528, 1000, 'panneauD');

        this.buffHole = this.physics.add.staticSprite(448, 1180, 'buff');

        //Création Attaques CaC et Distance
        this.attaque_sword = this.physics.add.staticGroup();
        this.attaque_shoot = this.physics.add.group();

        // CALQUE DE TUILE "OBSTACLES" (placé dans le code après le joueur, pour qu'il puisse se déplacer derrière)
        this.obstacles = this.map.createLayer('obstacle_layer', this.tileset);

        // CALQUES OBJETS

        // MOB A

        // Va vers le bas
        this.mobADown = this.physics.add.group();

        this.mobADown_layer = this.map.getObjectLayer('mobADown_layer');
        this.mobADown_layer.objects.forEach(mobADown_layer => {
            this.mobADown_create = this.physics.add.sprite(mobADown_layer.x + 16, mobADown_layer.y + 16, 'mobA');
            this.mobADown_create.anims.play('down_mob');
            this.mobADown.add(this.mobADown_create);
        });
        this.mobADown.setVelocityY(100);

        // Va vers le haut
        
        this.mobAUp = this.physics.add.group();

        this.mobAUp_layer = this.map.getObjectLayer('mobAUp_layer');
        this.mobAUp_layer.objects.forEach(mobAUp_layer => {
            this.mobAUp_create = this.physics.add.sprite(mobAUp_layer.x + 16, mobAUp_layer.y + 16, 'mobA');
            this.mobAUp_create.anims.play('up_mob');
            this.mobAUp.add(this.mobAUp_create);
        });
        this.mobAUp.setVelocityY(-100);

        // MOB B

        // Va vers le bas

        this.mobBDown = this.physics.add.staticGroup();

        this.mobBDown_layer = this.map.getObjectLayer('mobBDown_layer');
        this.mobBDown_layer.objects.forEach(mobBDown_layer => {
            this.mobBDown_create = this.physics.add.staticSprite(mobBDown_layer.x + 16, mobBDown_layer.y + 16, 'mobB');
            this.mobBDown.add(this.mobBDown_create);
        });

        this.attaquemobB = this.physics.add.group();

        // Va vers la droite
        this.mobBRight = this.physics.add.staticGroup();

        this.mobBRight_layer = this.map.getObjectLayer('mobBRight_layer');
        this.mobBRight_layer.objects.forEach(mobBRight_layer => {
            this.mobBRight_create = this.physics.add.staticSprite(mobBRight_layer.x + 16, mobBRight_layer.y + 16, 'mobB');
            this.mobBRight.add(this.mobBRight_create);
        });

        // Va vers la gauche

        this.mobBLeft = this.physics.add.staticGroup();

        this.mobBLeft_layer = this.map.getObjectLayer('mobBLeft_layer');
        this.mobBLeft_layer.objects.forEach(mobBLeft_layer => {
            this.mobBLeft_create = this.physics.add.staticSprite(mobBLeft_layer.x + 16, mobBLeft_layer.y + 16, 'mobB');
            this.mobBLeft.add(this.mobBLeft_create);
        });

        this.attaquemobBDown = this.physics.add.group();
        this.attaquemobBLeft = this.physics.add.group();
        this.attaquemobBRight = this.physics.add.group();

        // MOB C

        this.mobC = this.physics.add.group();
        this.mobC_layer = this.map.getObjectLayer('mobC_layer');
        this.mobC_layer.objects.forEach(mobC_layer => {
            this.mobC_create = this.physics.add.sprite(mobC_layer.x + 16, mobC_layer.y + 16, 'mobC');
            this.mobC_create.anims.play('mobC_anims');
            this.mobC.add(this.mobC_create);
        });
    
        //Passages vol

        this.passageVol = this.physics.add.staticGroup();
        this.trouFranchissable_layer = this.map.getObjectLayer('trouFranchissable_layer');
        this.trouFranchissable_layer.objects.forEach(trouFranchissable_layer => {
            this.passageVol_create = this.physics.add.staticSprite(trouFranchissable_layer.x + 16, trouFranchissable_layer.y + 16);
            this.passageVol.add(this.passageVol_create);
        });

        this.stopVol = this.physics.add.staticGroup();
        this.stopVol_layer = this.map.getObjectLayer('stopVol_layer');
        this.stopVol_layer.objects.forEach(stopVol_layer => {
            this.stopVol_create = this.physics.add.staticSprite(stopVol_layer.x + 16, stopVol_layer.y + 16);
            this.stopVol.add(this.stopVol_create);
        });

        // Patterns de déplacement mobs A
        this.switchRight_Layer = this.map.createLayer('switchRight_Layer', this.tileset);
        this.switchRight_Layer.setVisible(false);

        this.switchLeft_Layer = this.map.createLayer('switchLeft_Layer', this.tileset);
        this.switchLeft_Layer.setVisible(false);

        this.switchDown_Layer = this.map.createLayer('switchDown_Layer', this.tileset);
        this.switchDown_Layer.setVisible(false);

        this.switchUp_Layer = this.map.createLayer('switchUp_Layer', this.tileset);
        this.switchUp_Layer.setVisible(false);

        // création joueur
        //this.player = this.physics.add.sprite(500, 1800, 'player');
        this.player = this.physics.add.sprite(this.spawnX, this.spawnY, 'player');
        this.player.setSize(25, 30);
        this.player.setOffset(19, 23);

        // Passage scenes suivantes
        this.versTuto = this.physics.add.staticGroup();
        this.versTuto.create(528, 1488, "passage3x1");

        this.versZone1 = this.physics.add.staticGroup();
        this.versZone1.create(16, 996, "passage1x3");

        this.versZone2 = this.physics.add.staticGroup();
        this.versZone2.create(1168, 1088, "passage1x4");

        // CAMERA et LIMITES DU MONDE
        this.physics.world.setBounds(0, 0, 1184, 1504);
        this.cameras.main.setBounds(32, 0, 1120, 1470);
        this.cameras.main.setSize(683, 384); //format 16/9
        this.cameras.main.startFollow(this.player);
        //player.setCollideWorldBounds(true); (bloque le joueur, NE PAS ACTIVER)

        // UI

        //Barre de vie
        this.interface = this.add.sprite(342,40, 'interface').setScrollFactor(0);
        this.textScore =this.add.text(632,36,`${this.graineScore}`,{fontSize:'14px',fill:'#963d17', align: 'center'}).setOrigin(0,0).setScrollFactor(0);

        this.lifeUI = this.add.sprite(342,40, 'life1').setScrollFactor(0);
        this.serpeUI = this.add.sprite(342,40, 'serpe_ui').setScrollFactor(0);
        this.graineCourgeUI = this.add.sprite(342,40, 'graineCourge_ui').setScrollFactor(0);
        this.saladeUI = this.add.sprite(342,40, 'salade_ui').setScrollFactor(0);

        // COMMANDES

        // récupération des touches direction - CHECK
        this.cursors = this.input.keyboard.createCursorKeys();
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.EKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // COLLISIONS

        // SET BY PROPERTY

        // Calques tuiles
        this.murs.setCollisionByProperty({ estSolide: true });
        this.eau.setCollisionByProperty({ estLiquide: true });
        this.obstacles.setCollisionByProperty({ estSolide: true });
        this.laitue.setCollisionByProperty({ estSolide: true });

        // Pattern déplacement mob A
        this.switchRight_Layer.setCollisionByProperty({ estSolide: true });
        this.switchLeft_Layer.setCollisionByProperty({ estSolide: true });
        this.switchDown_Layer.setCollisionByProperty({ estSolide: true });
        this.switchUp_Layer.setCollisionByProperty({ estSolide: true });

        // COLLIDERS ET OVERLAPS

        // Passage scène hub
        this.physics.add.overlap(this.player, this.versTuto, this.passageSceneTuto, null, this);
        this.physics.add.overlap(this.player, this.versZone1, this.passageSceneZone1, null, this);
        this.physics.add.overlap(this.player, this.versZone2, this.passageSceneZone2, null, this);
        
        // Achat Hub

        this.physics.add.overlap(this.player, this.buffHole, this.unlockBuff, null, this);

        // Joueur - Environnement
        this.collisionMur = this.physics.add.collider(this.player, this.murs);
        this.collisionEau = this.physics.add.collider(this.player, this.eau);
        this.collisionObstacles = this.physics.add.collider(this.player, this.obstacles);
        this.physics.add.collider(this.player, this.laitue);
        this.physics.add.collider(this.player, this.panneau1);
        this.physics.add.collider(this.player, this.panneau2);
        this.physics.add.collider(this.player, this.panneau3);
        this.physics.add.overlap(this.player, this.grainesHaricot, this.grabGraine, null, this);

        this.physics.add.overlap(this.player, this.passageVol, this.sautVide, null, this);
        this.physics.add.overlap(this.player, this.stopVol, this.stopSaut, null, this);

        // INTERACTION MOBS

        // Joueur - Ennemi (perte de vie)
        this.physics.add.overlap(this.player, this.mobC, this.perteVieMobC, null, this);
        this.physics.add.collider(this.player, this.mobBDown);
        this.physics.add.overlap(this.player, this.mobADown, this.perteVieMobA, null, this);
        this.physics.add.overlap(this.player, this.mobAUp, this.perteVieMobA, null, this);
        this.physics.add.collider(this.player, this.ronces);
        
        this.physics.add.overlap(this.player, this.attaquemobBDown, this.perteVieMobB, null, this);
        this.physics.add.overlap(this.player, this.attaquemobBLeft, this.perteVieMobB, null, this);
        this.physics.add.overlap(this.player, this.attaquemobBRight, this.perteVieMobB, null, this);

        this.physics.add.collider(this.attaquemobBDown, this.murs, this.clean_projMobB, null, this);
        this.physics.add.collider(this.attaquemobBLeft, this.murs, this.clean_projMobB, null, this);
        this.physics.add.collider(this.attaquemobBRight, this.murs, this.clean_projMobB, null, this);

        // Loot

        this.physics.add.overlap(this.player, this.money, this.collectLoot, null, this);
        this.physics.add.overlap(this.player, this.heal, this.collectHeal, null, this);

        // Joueur attaques - CaC et distance
        this.physics.add.overlap(this.attaque_sword, this.murs, this.clean_sword, this.if_clean_sword, this);
        this.physics.add.collider(this.attaque_shoot, this.murs, this.delock_shoot, null, this);
        this.physics.add.collider(this.attaque_shoot, this.obstacles, this.delock_shoot, null, this);
        this.physics.add.collider(this.attaque_shoot, this.mobBDown, this.delock_shoot, null, this);

        this.physics.add.collider(this.ronces, this.attaque_sword, this.destroyRonces, null, this);
        this.physics.add.collider(this.mobADown, this.attaque_sword, this.kill_mob, null, this);
        this.physics.add.collider(this.mobAUp, this.attaque_sword, this.kill_mob, null, this);

        this.physics.add.collider(this.mobBDown, this.attaque_sword, this.kill_mob, null, this);
        this.physics.add.collider(this.mobBLeft, this.attaque_sword, this.kill_mob, null, this);
        this.physics.add.collider(this.mobBRight, this.attaque_sword, this.kill_mob, null, this);

        this.physics.add.collider(this.mobADown, this.attaque_shoot, this.kill_mob_shoot, null, this);
        this.physics.add.collider(this.mobAUp, this.attaque_shoot, this.kill_mob_shoot, null, this);

        // Ennemis pattern déplacement
        this.physics.add.collider(this.mobADown, this.switchDown_Layer, this.mob_switch_down, null, this);
        this.physics.add.collider(this.mobAUp, this.switchDown_Layer, this.mob_switch_down, null, this);

        this.physics.add.collider(this.mobADown, this.switchUp_Layer, this.mob_switch_up, null, this);
        this.physics.add.collider(this.mobAUp, this.switchUp_Layer, this.mob_switch_up, null, this);

        this.physics.add.collider(this.mobADown, this.switchLeft_Layer, this.mob_switch_left, null, this);
        this.physics.add.collider(this.mobAUp, this.switchLeft_Layer, this.mob_switch_left, null, this);

        this.physics.add.collider(this.mobADown, this.switchRight_Layer, this.mob_switch_right, null, this);
        this.physics.add.collider(this.mobAUp, this.switchRight_Layer, this.mob_switch_right, null, this);
        
        //Trou à graine courge
        this.physics.add.collider(this.player, this.murBridge1);
        this.physics.add.collider(this.bridge1, this.attaque_shoot, this.createBridge, null, this);

        // Trou à graine haricot
        this.physics.add.collider(this.player, this.murHaricot1);
        this.physics.add.overlap(this.echelleHaricot1, this.grainesHaricot, this.createEchelle, null, this);

        this.stateMobC();

        // boite de dialogue

        // Create dialogue box and text
        this.dialogueBox = this.add.graphics().setScrollFactor(0);
        this.dialogueBox.fillStyle(0x222222, 0.8); // couleur + transparence
        this.dialogueBox.fillRect(225, 300, 250, 50); // position + taille
        this.dialogueText = this.add.text(270, 310, '', { font: '12px Arial', fill: '#ffffff', align: 'justify' }).setScrollFactor(0); // place + style du texte
        this.dialogueText.setWordWrapWidth(600);

        this.contenuPanneau1 = "Vers les Collines Fertiles";
        this.contenuPanneau2 = "Vers les Contrées Arrosées";
        this.contenuPanneau3 = "Vers la Grande Laitue";
    }

    update() {
                
        this.stateBridge(); // check pont activé/désactivé

        if (this.player_block == false) {
            //Mouvement

            this.player.body.setVelocity(0); // l'empêche de continuer dans une direction sans presser lb outon

            if(this.cursors.up.isDown && this.cursors.right.isDown && this.cursors.left.isDown){ // HAUT && DROITE && GAUCHE
                this.player.setVelocityY(-this.speed);
                this.player.anims.play('walk_up', true);
                this.player_facing = "up";
            }

            else if(this.cursors.down.isDown && this.cursors.right.isDown && this.cursors.left.isDown){ // BAS && DROITE && GAUCHE
                this.player.setVelocityY(this.speed);
                this.player.anims.play('walk_down', true);
                this.player_facing = "up";
            }

            else if (this.cursors.up.isDown && this.cursors.right.isDown) { // HAUT && DROITE
                this.player.setVelocityY(-this.speed);
                this.player.setVelocityX(this.speed);
                this.player.anims.play('walk_up', true);
                this.player_facing = "up";
            }

            else if (this.cursors.down.isDown && this.cursors.right.isDown) { // BAS && DROITE
                this.player.setVelocityY(this.speed);
                this.player.setVelocityX(this.speed);
                this.player.anims.play('walk_down', true);
                this.player_facing = "down";
            }

            else if (this.cursors.up.isDown && this.cursors.left.isDown) { // HAUT && GAUCHE
                this.player.setVelocityY(-this.speed);
                this.player.setVelocityX(-this.speed);
                this.player.anims.play('walk_up', true);
                this.player_facing = "up";
            }

            else if (this.cursors.down.isDown && this.cursors.left.isDown) { // BAS && DROITE
                this.player.setVelocityY(this.speed);
                this.player.setVelocityX(-this.speed);
                this.player.anims.play('walk_down', true);
                this.player_facing = "down";
            }

            else if (this.cursors.right.isDown) { // DROITE
                this.player.setVelocityX(this.speed);
                this.player.anims.play('walk_right', true);
                this.player_facing = "right";
            }

            else if (this.cursors.left.isDown) { // GAUCHE
                this.player.setVelocityX(-this.speed);
                this.player.anims.play('walk_left', true);
                this.player_facing = "left";
            }

            else if (this.cursors.up.isDown) { // HAUT
                this.player.setVelocityY(-this.speed);
                this.player.anims.play('walk_up', true);
                this.player_facing = "up";
            }

            else if (this.cursors.down.isDown) { // BAS
                this.player.setVelocityY(this.speed);
                this.player.anims.play('walk_down', true);
                this.player_facing = "down";
            }

            else{
                if(this.player_facing == "left"){
                    this.player.anims.play('left', true);
                }
        
                if(this.player_facing == "right"){
                    this.player.anims.play('right', true);
                }
        
                if(this.player_facing == "up"){
                    this.player.anims.play('up', true);
                }
        
                if(this.player_facing == "down"){
                    this.player.anims.play('down', true);
                }
            }   

            //Attaque
            if (this.cursors.space.isDown && this.attackCaCLoot == true) {
                if (this.player_facing == "up") {
                    this.attaque_sword.create(this.player.x, this.player.y - 32, "sword_y");
                }
                else if (this.player_facing == "down") {
                    this.attaque_sword.create(this.player.x, this.player.y + 32, "sword_y");
                }
                else if (this.player_facing == "right") {
                    this.attaque_sword.create(this.player.x + 32, this.player.y, "sword_x");
                }
                else if (this.player_facing == "left") {
                    this.attaque_sword.create(this.player.x - 32, this.player.y, "sword_x");
                }
                this.player_block = true;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.time.delayedCall(250, this.delock_attaque, [], this);
            }

            //tir

            if (this.shiftKey.isDown && this.shoot_lock == false && this.attackDistanceLoot == true) {
                if (this.player_facing == "up") {
                    this.attaque_shoot.create(this.player.x, this.player.y - 32, "proj");
                    this.attaque_shoot.setVelocityY(-500);
                }
                else if (this.player_facing == "down") {
                    this.attaque_shoot.create(this.player.x, this.player.y + 32, "proj");
                    this.attaque_shoot.setVelocityY(500);
                }
                else if (this.player_facing == "right") {
                    this.attaque_shoot.create(this.player.x + 32, this.player.y, "proj");
                    this.attaque_shoot.setVelocityX(500);
                }
                else if (this.player_facing == "left") {
                    this.attaque_shoot.create(this.player.x - 32, this.player.y, "proj");
                    this.attaque_shoot.setVelocityX(-500);
                }

                this.bridge1Done = false;
                this.bridge1_changeLook = true;
                this.player_block = true;
                this.shoot_lock = true;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.time.delayedCall(250, this.delock_joueur, [], this);
            }
        }

        // Empêche d'aller plus plus en se déplaçant en diagonale
        this.player.body.velocity.normalize().scale(this.speed);

        this.mobBSpit();
        this.putGraine();
        this.gestionUI();
        this.checkLoot();
        
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
            if(this.ableMobC){
                this.ableMobC = false;
                this.mobCDanger = false; 
                this.time.delayedCall(2000, this.enableMobC, [], this);
            }
        }
    
        enableMobC(){
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

    gestionUI(){
        if (this.health == 5){
            this.lifeUI.setTexture('life1')
        }
        if (this.health == 4){
            this.lifeUI.setTexture('life2');
        }
        if (this.health == 3){
            this.lifeUI.setTexture('life3');
        }
        if (this.health == 2){
            this.lifeUI.setTexture('life4');
        }
        if (this.health == 1){
            this.lifeUI.setTexture('life5');
        }
        if (this.health == 0){
            this.lifeUI.setTexture('lifeEmpty');
        }

        if (this.attackCaCLoot == true){
            this.serpeUI.setVisible(true);}
        else{this.serpeUI.setVisible(false);}

        if(this.attackDistanceLoot == true){
            this.graineCourgeUI.setVisible(true);}
        else{this.graineCourgeUI.setVisible(false);}

        if(this.volerLoot == true){
            this.saladeUI.setVisible(true);}
        else{this.saladeUI.setVisible(false);}
    }

    // GESTION DES COLLECTIBLES

    // récupération du heal (si on n'a pas toute sa vie)
    collectHeal(player, heal){

        if(this.health < 5){
        heal.destroy(heal.x, heal.y);
        this.health ++;}
    }

    // récupération du loot
    collectLoot(player, loot){
        loot.destroy(loot.x, loot.y); // détruit l'esprit collecté
        this.graineScore ++; // incrémente le score
        this.changementText();
    }
    
    changementText(){
        this.textScore.setText(`${this.graineScore}`); // montre le score actuel
    }

    // changement d'affichage de l'interface de loot (pour centrer la numération)
    checkLoot(){
        if(this.graineScore > 9){
            this.textScore.setPosition(628,36)
        }
        else if(this.graineScore < 10){
            this.textScore.setPosition(632,36);
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
        if (this.bridge1_changeLook == true){
            if(this.bridge1Done == true){
                this.bridge1.anims.play('trueBridge');
            }
            if (this.bridge1Done == false && this.bridge1Active == true){
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

    grabGraine(player, graine){
        if(Phaser.Input.Keyboard.JustDown(this.FKey) && this.carryGraine == false){
            graine.destroy();
            this.speed = 100;
            this.carryGraine = true;
        }
    }

    putGraine(){
        if(Phaser.Input.Keyboard.JustDown(this.FKey) && this.carryGraine == true){
            this.graines_create = this.physics.add.staticSprite(this.player.x, this.player.y, 'box');
            this.grainesHaricot.add(this.graines_create);
            this.carryGraine = false;
            this.speed = 175;
        }
    }

    // SAUTS - FEUILLE DE SALADE

    sautVide(){
        if(Phaser.Input.Keyboard.JustDown(this.EKey) && this.volerLoot == true && this.carryGraine == false){
            console.log("CHECK");
            this.physics.world.removeCollider(this.collisionMur);
            this.physics.world.removeCollider(this.collisionEau);
            this.player_block = true;
            this.player.setVelocityX(150);
            this.flyingMod = true;
        }
    }

    stopSaut(){
        if(this.flyingMod == true){
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
        else if (distance3 < 50){
            if (!this.dialogueBox.visible) { // affiche le dialogue si la boîte de dialogue n'est pas déjà visible
                this.dialogueBox.visible = true;
                this.dialogueText.setText(this.contenuPanneau3);
            }
        }
         else {
            this.dialogueBox.visible = false;
            this.dialogueText.setText('');
        }
    }

    // ACHAT DE BUFF

    unlockBuff(){
        console.log("CHECK 1")
        if(Phaser.Input.Keyboard.JustDown(this.EKey) && this.graineScore >= 5){
            console.log("CHECK 2")
            this.speed += 25;
            this.graineScore -= 5;
            this.changementText();
        }
    }

    //Passage scène suivante
    passageSceneTuto() {
        this.scene.start('sceneTuto', {
            graineScore : this.graineScore,

            // Variables pour débloquer les mécaniques
            attackCaCLoot : this.attackCaCLoot,
            attackDistanceLoot : this.attackDistanceLoot,
            volerLoot : this.volerLoot,

            speed : this.speed,
            health : this.health,
            spawnX : 2064,
            spawnY : 48
        })
    }

    passageSceneZone1() {
        this.scene.start('sceneZone1', {
            graineScore : this.graineScore,

            // Variables pour débloquer les mécaniques
            attackCaCLoot : this.attackCaCLoot,
            attackDistanceLoot : this.attackDistanceLoot,
            volerLoot : this.volerLoot,

            speed : this.speed,
            health : this.health,
            //spawnX : 3296,
            //spawnY : 4032

            spawnX : 1583,
            spawnY : 1713
        })
    }

    passageSceneZone2() {
        this.scene.start('sceneZone2', {
            graineScore : this.graineScore,

            // Variables pour débloquer les mécaniques
            attackCaCLoot : this.attackCaCLoot,
            attackDistanceLoot : this.attackDistanceLoot,
            volerLoot : this.volerLoot,

            speed : this.speed,
            health : this.health,
            spawnX : 880,
            spawnY : 3008
    
            //spawnX : 2384,
            //spawnY : 2512
        })
    }
}