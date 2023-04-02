class sceneHub extends Phaser.Scene {

    constructor() {
        super('sceneHub')
    }

    init(data) {
        this.argent = data.argent;
        this.attackCaCLoot = data.attackCaCLoot;
        this.attackDistanceLoot = data.attackDistanceLoot;
        this.volerLoot = data.volerLoot;

        this.speed = data.speed;
        this.health = data.health;

        this.spawnX = data.spawnX;
        this.spawnY = data.spawnY;
    }

    preload() {
    }

    create() {
        this.player_block = false; // fige le personnage
        this.player_beHit = false; // subir des dégâts
        this.shoot_lock = false; // bloque l'option de tir
        this.clignotement = 0; // frames d'invulnérabilité

        this.player_facing = "up"; // rotation du personnage standard

        // CHARGEMENT DE LA MAP

        //Load Map
        this.map = this.add.tilemap("map_hub");
        this.tileset = this.map.addTilesetImage('tileset', 'tiles')

        // loads calques de tuiles

        this.sol = this.map.createLayer('sol_layer', this.tileset); // calque sol
        this.eau = this.map.createLayer('eau_layer', this.tileset);
        this.murs = this.map.createLayer('murs_layer', this.tileset); //calque mur
        this.decor = this.map.createLayer('decor_layer', this.tileset);

        // Sprites et groupes

        // création joueur
        this.player = this.physics.add.sprite(this.spawnX, this.spawnY, 'player');
        this.player.setSize(20, 20);

        //Création Attaques CaC et Distance
        this.attaque_sword = this.physics.add.staticGroup();
        this.attaque_shoot = this.physics.add.group();

        // CALQUE DE TUILE "OBSTACLES" (placé dans le code après le joueur, pour qu'il puisse se déplacer derrière)
        this.obstacles = this.map.createLayer('obstacle_layer', this.tileset);

        // Trous Graine Haricot

        this.trouHaricot1 = this.physics.add.staticSprite(800, -1232, 'trou');
        this.murHaricot1 = this.physics.add.staticSprite(800, -1296);
        this.murHaricot1.setSize(32, 96);
        this.echelleHaricot1 = this.physics.add.staticSprite(800, -1296, "echelle");
        this.echelleHaricot1.anims.play('falseEchelle');

        // Fleur de courge 
        
        this.bridge1Done = false;
        this.holeSeed1 = this.physics.add.staticSprite(270, 818, 'box');
        this.murBridge1 = this.physics.add.staticSprite(335, 818);
        this.murBridge1.setSize(96, 32);
        this.bridge1 = this.physics.add.staticSprite(335, 818, 'bridge');
        this.bridge1.anims.play('falseBridge');

        // CALQUES OBJETS

        // RONCES 

        this.ronces = this.physics.add.staticGroup();

        this.ronces_layer = this.map.getObjectLayer('ronces_layer');
        this.ronces_layer.objects.forEach(ronces_layer => {
            this.ronces_create = this.physics.add.staticSprite(ronces_layer.x + 16, ronces_layer.y + 16, 'mobA');
            this.ronces_create.anims.play('down_mob');
            this.ronces.add(this.ronces_create);
        });

        this.versTuto = this.physics.add.staticGroup();
        this.versTuto.create(528, 848, "passage3x1");

        this.versZone1 = this.physics.add.staticGroup();
        this.versZone1.create(16, 336, "passage1x3");

        this.versZone2 = this.physics.add.staticGroup();
        this.versZone2.create(1168, 448, "passage1x4");

        // CAMERA et LIMITES DU MONDE
        this.physics.world.setBounds(0, 0, 1184, 864);
        this.cameras.main.setBounds(32, 0, 1120, 832);
        this.cameras.main.setSize(683, 384); //format 16/9
        this.cameras.main.startFollow(this.player);
        //player.setCollideWorldBounds(true); (bloque le joueur, NE PAS ACTIVER)

        // UI

        //Barre de vie
        this.UIvie = this.add.sprite(100, 40, "CadreVie").setScrollFactor(0);
        this.barreVie = this.add.sprite(this.UIvie.x, this.UIvie.y, "BarreVie").setScrollFactor(0);
        this.healthMask = this.add.sprite(this.barreVie.x, this.barreVie.y, "BarreVie").setScrollFactor(0);
        this.healthMask.visible = false;
        this.barreVie.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask);

        // COMMANDES

        // récupération des touches direction - CHECK
        this.cursors = this.input.keyboard.createCursorKeys();
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // COLLISIONS

        // SET BY PROPERTY

        // Calques tuiles
        this.murs.setCollisionByProperty({ estSolide: true });
        this.eau.setCollisionByProperty({ estLiquide: true });
        this.obstacles.setCollisionByProperty({ estSolide: true });

        // COLLIDERS ET OVERLAPS

        // Passage scène hub
        this.physics.add.overlap(this.player, this.versTuto, this.passageSceneTuto, null, this);
        this.physics.add.overlap(this.player, this.versZone1, this.passageSceneZone1, null, this);
        this.physics.add.overlap(this.player, this.versZone2, this.passageSceneZone2, null, this);

        // Joueur - Environnement
        this.physics.add.collider(this.player, this.murs);
        this.physics.add.collider(this.player, this.eau);
        this.physics.add.collider(this.player, this.ronces);
        this.physics.add.collider(this.player, this.obstacles);

        // Joueur attaques - CaC et distance
        this.physics.add.overlap(this.attaque_sword, this.murs, this.clean_sword, this.if_clean_sword, this);
        this.physics.add.collider(this.attaque_shoot, this.murs, this.delock_shoot, null, this);
        this.physics.add.collider(this.ronces, this.attaque_sword, this.destroyRonces, null, this);

        //Trou à graine
        this.physics.add.collider(this.player, this.murBridge1);
        this.physics.add.collider(this.holeSeed1, this.attaque_shoot, this.createBridge, null, this);

        this.physics.add.collider(this.player, this.murHaricot1);
        this.physics.add.overlap(this.trouHaricot1, this.grainesHaricot, this.createEchelle, null, this);
    }

    update() {

        this.stateBridge(); // check pont activé/désactivé

        if (this.player_block == false) {
            //Mouvement

            this.player.body.setVelocity(0); // l'empêche de continuer dans une direction sans presser lb outon

            if (this.cursors.right.isDown) { // DROITE
                this.player.setVelocityX(this.speed);
                this.player.anims.play('right');
                this.player_facing = "right";
            }
            else if (this.cursors.left.isDown) { // GAUCHE
                this.player.setVelocityX(-this.speed);
                this.player.anims.play('left');
                this.player_facing = "left";
            }

            if (this.cursors.up.isDown) { // HAUT
                this.player.setVelocityY(-this.speed);
                this.player.anims.play('up');
                this.player_facing = "up";
            }
            else if (this.cursors.down.isDown) { // BAS
                this.player.setVelocityY(this.speed);
                this.player.anims.play('down');
                this.player_facing = "down";
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

            if (this.shootKey.isDown && this.shoot_lock == false && this.attackDistanceLoot == true) {
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
                this.player_block = true;
                this.shoot_lock = true;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.time.delayedCall(250, this.delock_joueur, [], this);
            }
        }

        // Empêche d'aller plus plus en se déplaçant en diagonale
        this.player.body.velocity.normalize().scale(this.speed);
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

    // destruction d'une ronce si frappé par la serpe
    destroyRonces(ronces) {
        ronces.disableBody(true, true);
    }

    // valide la création du pont si graine de courge détecté
    createBridge(trou, graine) {
        console.log("création pont");
        graine.disableBody(true, true);
        this.shoot_lock = false;
        this.bridge1Done = true;
    }

    // affiche une échelle si graine de haricot plantée, et enlève le mur invisible qui bloque
    createEchelle(trou, graine) {
        graine.disableBody(true, true);
        this.echelleHaricot1.anims.play('trueEchelle');
        this.murHaricot1.disableBody(true, true);
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

    //Passage scène suivante
    passageSceneTuto() {
        this.scene.start('sceneTuto', {
            argent : this.argent,

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
            argent : this.argent,

            // Variables pour débloquer les mécaniques
            attackCaCLoot : this.attackCaCLoot,
            attackDistanceLoot : this.attackDistanceLoot,
            volerLoot : this.volerLoot,

            speed : this.speed,
            health : this.health,
            spawnX : 480,
            spawnY : 800
        })
    }

    passageSceneZone2() {
        this.scene.start('sceneZone2', {
            argent : this.argent,

            // Variables pour débloquer les mécaniques
            attackCaCLoot : this.attackCaCLoot,
            attackDistanceLoot : this.attackDistanceLoot,
            volerLoot : this.volerLoot,

            speed : this.speed,
            health : this.health,
            //spawnX : 880,
            //spawnY : 3008
    
            spawnX : 2384,
            spawnY : 2512
        })
    }
}