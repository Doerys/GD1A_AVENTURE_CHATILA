
class Game extends Phaser.Scene{
        
    constructor(){
        super('game')
    }

    preload(){
        // spritesheet perso - CHECK
        this.load.spritesheet('player', 'assets/perso.png',
            { frameWidth: 32, frameHeight: 32 });

        // spritesheet Mob - CHECK
        this.load.spritesheet('mobA', 'assets/mobA.png',
            { frameWidth: 32, frameHeight: 32 });

        // Preload assets Tiled - CHECK 
        this.load.image('tiles', 'assets/tileset.png');
        this.load.tilemapTiledJSON('map', 'map.json');
        
        // Preload box
        this.load.image('box', 'assets/box.png');

        //Preload Attaque
        this.load.image("sword_y", "assets/attaque_joueur_y.png");
        this.load.image("sword_x", "assets/attaque_joueur_x.png");

        //Preload Barre de vie
        this.load.image("CadreVie", "assets/CadreVie.png");
        this.load.image("BarreVie", "assets/BarreVie.png");
    }

    create(){

        this.player_block = false;
        this.player_beHit = false;
        this.shoot_lock = false;
        this.clignotement = 0;
        this.health = 99;

        this.player_facing = "up";

        //Création Attaque
        this.attaque_sword = this.physics.add.staticGroup();
        this.attaque_shoot = this.physics.add.group();

        //création mob

        this.anims.create({
            key: 'left_mob',
            frames: [{ key: 'mobA', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'up_mob',
            frames: [{ key: 'mobA', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'down_mob',
            frames: [{ key: 'mobA', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right_mob',
            frames: [{ key: 'mobA', frame: 1 }],
            frameRate: 20
        });

        //Load Map
        this.map = this.add.tilemap("map");
        this.tileset = this.map.addTilesetImage('tileset', 'tiles')

        // loads calques
        this.sol = this.map.createLayer('sol_layer', this.tileset); // calque sol
        this.murs = this.map.createLayer('murs_layer', this.tileset); //calque mur
        this.decor = this.map.createLayer('decor_layer', this.tileset);
        this.ronces = this.map.createLayer('ronces_layer', this.tileset);

        // Calque objet - Mobs
        this.mobA = this.physics.add.group();

        this.mobA_layer = this.map.getObjectLayer('mobA/mobA_layer');
        this.mobA_layer.objects.forEach(mobA_layer => {
            this.mobA_create = this.physics.add.sprite(mobA_layer.x + 16, mobA_layer.y + 16, 'mobA');
            this.mobA_create.anims.play('down_mob');
            this.mobA.add(this.mobA_create);
        });
        this.mobA.setVelocityY(100);

        this.mobB = this.physics.add.group();

        this.mobB_layer = this.map.getObjectLayer('mobB/mobB_layer');
        this.mobB_layer.objects.forEach(mobB_layer => {
            this.mobB_create = this.physics.add.sprite(mobB_layer.x + 16, mobB_layer.y + 16, 'mobA');
            this.mobB_create.anims.play('down_mob');
            this.mobB.add(this.mobB_create);
        });
        this.mobB.setVelocityY(100);

        // Bordures patterns mobs
        this.switchRight_Layer = this.map.createLayer('mobA/switchRight_Layer', this.tileset);
        this.switchRight_Layer.setVisible(false);
        
        this.switchLeft_Layer = this.map.createLayer('mobA/switchLeft_Layer', this.tileset);
        this.switchLeft_Layer.setVisible(false);

        this.switchDown_Layer = this.map.createLayer('mobA/switchDown_Layer', this.tileset);
        this.switchDown_Layer.setVisible(false);

        this.switchUp_Layer = this.map.createLayer('mobA/switchUp_Layer', this.tileset);
        this.switchUp_Layer.setVisible(false);

        // Bordures patterns mobs B

        this.switchHautDroite_Layer = this.map.createLayer('mobB/switchHautDroite_Layer', this.tileset);
        //this.switchHautDroite_Layer.setVisible(false);
        
        this.switchHautGauche_Layer = this.map.createLayer('mobB/switchHautGauche_Layer', this.tileset);
        //this.switchHautGauche_Layer.setVisible(false);

        this.switchBasDroite_Layer = this.map.createLayer('mobB/switchBasDroite_Layer', this.tileset);
        //this.switchBasDroite_Layer.setVisible(false);

        this.switchBasGauche_Layer = this.map.createLayer('mobB/switchBasGauche_Layer', this.tileset);
        //this.switchBasGauche_Layer.setVisible(false);

        //Calque Solide
        this.murs.setCollisionByProperty({ estSolide: true });
        this.murs.setCollisionByProperty({ estLiquide: true });
        this.decor.setCollisionByProperty({ estSolide : true});
        this.ronces.setCollisionByProperty({ estDestructible : true});


        this.switchRight_Layer.setCollisionByProperty({ estSolide: true });
        this.switchLeft_Layer.setCollisionByProperty({ estSolide: true });
        this.switchDown_Layer.setCollisionByProperty({ estSolide: true });
        this.switchUp_Layer.setCollisionByProperty({ estSolide: true });

        this.switchHautDroite_Layer.setCollisionByProperty({ estSolide: true });
        this.switchHautGauche_Layer.setCollisionByProperty({ estSolide: true });
        this.switchBasDroite_Layer.setCollisionByProperty({ estSolide: true });
        this.switchBasGauche_Layer.setCollisionByProperty({ estSolide: true });

        // création joueur
        this.player = this.physics.add.sprite(1000, 800, 'player');    
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'up',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'down',
            frames: [{ key: 'player', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 20
        });

        //Création Caméra
        //this.physics.world.setBounds(0, 0, 9600, 9600);
        //this.cameras.main.setBounds(0, 0, 9600, 9600);
        this.cameras.main.setSize(960, 640);
        this.cameras.main.startFollow(this.player);

        //Création Barre de vie
        this.UIvie = this.add.sprite(100, 40, "CadreVie").setScrollFactor(0);
        this.barreVie = this.add.sprite(this.UIvie.x, this.UIvie.y, "BarreVie").setScrollFactor(0);
        this.healthMask = this.add.sprite(this.barreVie.x, this.barreVie.y, "BarreVie").setScrollFactor(0);
        this.healthMask.visible = false;
        this.barreVie.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask);

        // récupération des touches direction - CHECK
        this.cursors = this.input.keyboard.createCursorKeys();
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //Création Collision
        //Joueur
        this.physics.add.collider(this.player, this.murs);
        this.physics.add.collider(this.player, this.decor);
        this.physics.add.overlap(this.player, this.mobA, this.perteVie, null, this);
        this.physics.add.collider(this.player, this.ronces);

        //Création Collision Attaque
        this.physics.add.overlap(this.attaque_sword, this.murs, this.clean_sword, this.if_clean_sword, this);
        this.physics.add.collider(this.attaque_shoot, this.murs, this.delock_shoot, null, this);

        //Ennemi

        this.physics.add.collider(this.mobA, this.switchDown_Layer, this.mob_switch_down, null, this);
        this.physics.add.collider(this.mobA, this.switchUp_Layer, this.mob_switch_up, null, this);
        this.physics.add.collider(this.mobA, this.switchLeft_Layer, this.mob_switch_left, null, this);
        this.physics.add.collider(this.mobA, this.switchRight_Layer, this.mob_switch_right, null, this);

        this.physics.add.collider(this.mobB, this.switchHautDroite_Layer, this.mob_switch_upRight, null, this);
        this.physics.add.collider(this.mobB, this.switchHautGauche_Layer, this.mob_switch_upLeft, null, this);
        this.physics.add.collider(this.mobB, this.switchBasDroite_Layer, this.mob_switch_downRight, null, this);
        this.physics.add.collider(this.mobB, this.switchBasGauche_Layer, this.mob_switch_downLeft, null, this);
        
        this.physics.add.collider(this.mobA, this.attaque_sword, this.kill_mob, null, this);      
        this.physics.add.collider(this.mobA, this.attaque_shoot, this.kill_mob_shoot, null, this);
    }

    update(){

        this.speed = 175;

        if (this.player_block == false) {
            //Mouvement
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-this.speed);
                this.player.setVelocityX(0);
                this.player.anims.play('up');
                this.player_facing = "up";
            }
            else if (this.cursors.down.isDown) {
                this.player.setVelocityY(this.speed);
                this.player.setVelocityX(0);
                this.player.anims.play('down');
                this.player_facing = "down";
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(this.speed);
                this.player.setVelocityY(0);
                this.player.anims.play('right');
                this.player_facing = "right";
            }
            else if (this.cursors.left.isDown) {
                this.player.setVelocityX(-this.speed);
                this.player.setVelocityY(0);
                this.player.anims.play('left');
                this.player_facing = "left";
            }
            else {
                this.player.setVelocityY(0);
                this.player.setVelocityX(0);
            }
            //Attaque
            if (this.cursors.space.isDown) {
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
                this.time.delayedCall(500, this.delock_attaque, [], this);
            }

            //tir

            if (this.shootKey.isDown && this.shoot_lock == false){
                console.log("Check");
                if (this.player_facing == "up") {
                    this.attaque_shoot.create(this.player.x, this.player.y - 32, "sword_y");
                    this.attaque_shoot.setVelocityY(-500);
                }
                else if (this.player_facing == "down") {
                    this.attaque_shoot.create(this.player.x, this.player.y + 32, "sword_y");
                    this.attaque_shoot.setVelocityY(500);
                }
                else if (this.player_facing == "right") {
                    this.attaque_shoot.create(this.player.x + 32, this.player.y, "sword_x");
                    this.attaque_shoot.setVelocityX(500);
                }
                else if (this.player_facing == "left") {
                    this.attaque_shoot.create(this.player.x - 32, this.player.y, "sword_x");
                    this.attaque_shoot.setVelocityX(-500);
                }
                this.player_block = true;
                this.shoot_lock = true;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.time.delayedCall(500, this.delock_joueur, [], this);
            }
        }
        
            // Normalize and scale the velocity so that player can't move faster along a diagonal
            //this.player.body.velocity.normalize().scale(speed);   
    }

    //Gestion Pattern Mob
    mob_switch_right(mobA) {
        mobA.setVelocityX(100);
        mobA.setVelocityY(0);
        mobA.anims.play('right_mob')
    }

    mob_switch_left(mobA) {
        mobA.setVelocityX(-100);
        mobA.setVelocityY(0);
        mobA.anims.play('left_mob')
    }

    mob_switch_up(mobA) {
        mobA.setVelocityX(0);
        mobA.setVelocityY(-100);
        mobA.anims.play('up_mob')
    }

    mob_switch_down(mobA) {
        mobA.setVelocityX(0);
        mobA.setVelocityY(100);
        mobA.anims.play('down_mob')
    }

    mob_switch_upRight(mobB) {
        mobB.setVelocityX(100);
        mobB.setVelocityY(-100);
    }

    mob_switch_upLeft(mobB) {
        mobB.setVelocityX(-100);
        mobB.setVelocityY(-100);
    }

    mob_switch_downRight(mobB) {
        mobB.setVelocityX(100);
        mobB.setVelocityY(100);
    }

    mob_switch_downLeft(mobB) {
        mobB.setVelocityX(-100);
        mobB.setVelocityY(100);
    }

    //Kill Mob
    kill_ronces(ronces){
        ronces.destroyLayer()
    }

    //Kill Mob
    kill_mob(mobA){
        mobA.disableBody(true, true);
    }

    kill_mob_shoot(mobA, attaque_shoot){
        mobA.disableBody(true, true);
        attaque_shoot.disableBody(true, true);
        this.shoot_lock = false;
    }

// FONCTIONS LIEES A L'ATTAQUE CAC

    //Clean Attaque
    clean_sword(attaque_sword) {
        attaque_sword.disableBody(true, true);
    }

    if_clean_sword() {
        if (this.trigger_cleanSword == true) {
            this.trigger_cleanSword = false;
            return true
        }
        else {
            return false
        }
    }

    //Delock Joueur
    delock_attaque() {
        this.player_block = false;
        this.trigger_cleanSword = true;
    }

    //Delock Joueur
    delock_joueur() {
        this.player_block = false;
    }

// FONCTIONS LIEES A L'ATTAQUE DISTANCE

    delock_shoot(attaque_shoot){
        attaque_shoot.disableBody(true, true);
        this.shoot_lock = false;
    }


// FONCTIONS LIEES A LA PRISE DE DEGATS

    //Gestion Frame Imu
    able_hit() {
        this.player_beHit = false;
    }

    getHit() {
        if (this.player_beHit == false) {
            return true
        }
        else {
            return false
        }
    }

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

    //Gestion Vie
    perteVie(player, mobA) {
        this.player_block = true;
        this.player_beHit = true;
        if (mobA.body.touching.left) {
            player.setVelocityX(-400);
        }
        else if (mobA.body.touching.right) {
            player.setVelocityX(400);
        }
        else if (mobA.body.touching.up) {
            player.setVelocityY(-400);
        }
        else if (mobA.body.touching.down) {
            player.setVelocityY(400);
        }
        this.pinvisible();
        this.healthMask.x -= 10;
        this.health -= 10;
        if (this.health < 0) {
            this.player_block = true;
            player.setTint(0xff0000);
            this.physics.pause();
        }
        else {
            this.time.delayedCall(200, this.delock_joueur, [], this);
            this.time.delayedCall(200, this.able_hit, [], this);
        }
    }

}