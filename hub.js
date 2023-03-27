class sceneHub extends Phaser.Scene{
    
    constructor(){
        super('sceneHub')
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
        this.load.tilemapTiledJSON('map_hub', 'map_hub.json');
        
        // Preload box
        this.load.image('box', 'assets/box.png');
        this.load.spritesheet('bridge', 'assets/pont.png',
            { frameWidth: 96, frameHeight:32});

        this.load.image('trou', 'assets/trouGraine.png');
        this.load.spritesheet('echelle', 'assets/haricot.png',
        { frameWidth: 32, frameHeight:96});

        //Preload Attaque
        this.load.image("sword_y", "assets/attaque_joueur_y.png");
        this.load.image("sword_x", "assets/attaque_joueur_x.png");

        //Preload Barre de vie
        this.load.image("CadreVie", "assets/CadreVie.png");
        this.load.image("BarreVie", "assets/BarreVie.png");
    }

    create(){

        this.attackCaCLoot = true;
        this.attackDistanceLoot = true;
        this.volerLoot = true;

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

        // ANIMATION BRIDGE

        this.anims.create({
            key: 'trueBridge',
            frames: [{key: 'bridge', frame: 0}],
        });
        this.anims.create({
            key: 'falseBridge',
            frames: [{key: 'bridge', frame: 1}],
        });

        this.anims.create({
            key: 'trueEchelle',
            frames: [{key: 'echelle', frame: 0}],
        });
        this.anims.create({
            key: 'falseEchelle',
            frames: [{key: 'echelle', frame: 1}],
        });

        // ANIMATION JOUEUR

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
        this.map = this.add.tilemap("map_hub");
        this.tileset = this.map.addTilesetImage('tileset', 'tiles')

        // loads calques
        this.sol = this.map.createLayer('sol_layer', this.tileset); // calque sol
        this.murs = this.map.createLayer('murs_layer', this.tileset); //calque mur
        this.decor = this.map.createLayer('decor_layer', this.tileset);

        //Calque Solide
        this.murs.setCollisionByProperty({ estSolide: true });
        this.murs.setCollisionByProperty({ estLiquide: true });
        this.decor.setCollisionByProperty({ estSolide : true});

        // création joueur
        this.player = this.physics.add.sprite(200, 200, 'player');  
        this.player.setSize(20, 20);
        
        //player.setCollideWorldBounds(true); (bloque le joueur, NE PAS ACTIVER)
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
        this.physics.world.setBounds(0, 0, 2496, 2496);
        this.cameras.main.setBounds(0, 0, 2496, 2496);
        this.cameras.main.setSize(683, 384); //format 16/9
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

        // Joueur - Environnement
        this.physics.add.collider(this.player, this.murs);
        this.physics.add.collider(this.player, this.decor);
        this.physics.add.collider(this.player, this.grainesHaricot);


    }

    update(){

        this.speed = 175;
        this.stateBridge();
        console.log(this.bridgeDone);

        this.player.body.setVelocity(0);

        if (this.player_block == false) {
            //Mouvement

            if (this.cursors.right.isDown) {
                this.player.setVelocityX(this.speed);
                this.player.anims.play('right');
                this.player_facing = "right";
            }
            else if (this.cursors.left.isDown) {
                this.player.setVelocityX(-this.speed);
                this.player.anims.play('left');
                this.player_facing = "left";
            }

            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-this.speed);
                this.player.anims.play('up');
                this.player_facing = "up";
            }
            else if (this.cursors.down.isDown) {
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
                this.time.delayedCall(500, this.delock_attaque, [], this);
            }

            //tir

            if (this.shootKey.isDown && this.shoot_lock == false && this.attackDistanceLoot == true){
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
                this.bridgeDone = false;
                this.player_block = true;
                this.shoot_lock = true;
                this.player.setVelocityX(0);
                this.player.setVelocityY(0);
                this.time.delayedCall(500, this.delock_joueur, [], this);
            }
        }
        
            // Normalize and scale the velocity so that player can't move faster along a diagonal
            this.player.body.velocity.normalize().scale(this.speed);   
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

    destroyRonces(ronces) {
        ronces.disableBody(true, true);
    }

    createBridge(trou, graine){       
        console.log("création pont"); 
        graine.disableBody(true, true);
        this.shoot_lock = false;
        this.bridgeDone = true;
    }

    createEchelle(trou, graine){
        graine.disableBody(true, true);
        this.echelleHaricot1.anims.play('trueEchelle');
        this.murHaricot1.disableBody(true, true);
    }

    stateBridge(){
        if(this.bridgeDone == true){
            this.bridge1.anims.play('trueBridge');
            this.murBridge1.disableBody(true, true);
        }
        if (this.bridgeDone == false){
            this.bridge1.anims.play('falseBridge');
            this.murBridge1.enableBody();
        }
    }
}