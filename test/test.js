
class Game extends Phaser.Scene{
        
    constructor(){
        super('game')
    }

    preload(){
        // spritesheet perso
        this.load.spritesheet('player', 'assets/perso.png',
            { frameWidth: 32, frameHeight: 32 });

        // spritesheet Mob
        this.load.spritesheet('mob', 'assets/mob.png',
            { frameWidth: 32, frameHeight: 32 });

        // Preload assets Tiled
        this.load.image('tiles', 'assets/tileset.png');
        this.load.tilemapTiledJSON('map', 'map_test.json');
            
        this.load.image('box', 'assets/box.png');

        //Preload Attaque
        this.load.image("sword_y", "assets/attaque_joueur_y.png");
        this.load.image("sword_x", "assets/attaque_joueur_x.png");

        //Preload Barre de vie
        this.load.image("CadreVie", "assets/CadreVie.png");
        this.load.image("BarreVie", "assets/BarreVie.png");
    }

    create(){

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player_facing = "up";

        // création joueur
        this.player = this.physics.add.sprite(150, 150, 'player');    
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

        //Création Attaque
        this.attaque_sword = this.physics.add.staticGroup();

        //création mob
        this.mob = this.physics.add.group();

        this.anims.create({
            key: 'left_mob',
            frames: [{ key: 'mob', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'up_mob',
            frames: [{ key: 'mob', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'down_mob',
            frames: [{ key: 'mob', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right_mob',
            frames: [{ key: 'mob', frame: 1 }],
            frameRate: 20
        });

        //Load Map
        this.map = this.add.tilemap("map");
        this.tileset = this.map.addTilesetImage('tileset', 'tiles')

        // loads calques
        this.murs = this.map.createLayer('murs_Layer', this.tileset); //calque mur
        this.sol = this.map.createLayer('sol_Layer', this.tileset); // calque sol

        // Calque objet - Mobs
        this.mob_Layer = this.map.getObjectLayer('mob_Layer');
        this.mob_Layer.objects.forEach(mob_Layer => {
            this.mob_create = this.physics.add.sprite(mob_Layer.x + 16, mob_Layer.y + 16, 'mob');
            this.mob_create.anims.play('down_mob');
            this.mob.add(this.mob_create)
        });
        this.mob.setVelocityY(100);

        // Bordures patterns mobs
        this.switchRight_Layer = this.map.createLayer('switchRight_Layer', this.tileset);
        this.switchLeft_Layer = this.map.createLayer('switchLeft_Layer', this.tileset);
        this.switchDown_Layer = this.map.createLayer('switchDown_Layer', this.tileset);
        this.switchUp_Layer = this.map.createLayer('switchUp_Layer', this.tileset);

        //Calque Solide
        this.murs.setCollisionByProperty({ estSolide: true });
        this.switchDown_Layer.setCollisionByProperty({ estSolide: true });
        this.switchUp_Layer.setCollisionByProperty({ estSolide: true });
        this.switchLeft_Layer.setCollisionByProperty({ estSolide: true });
        this.switchRight_Layer.setCollisionByProperty({ estSolide: true });

        //Création Caméra
        this.physics.world.setBounds(0, 0, 3200, 3200);
        this.cameras.main.setBounds(0, 0, 3200, 3200);
        this.cameras.main.startFollow(this.player);

        //Création Barre de vie
        this.UIvie = this.add.sprite(100, 40, "CadreVie").setScrollFactor(0);
        this.barreVie = this.add.sprite(this.UIvie.x, this.UIvie.y, "BarreVie").setScrollFactor(0);
        this.healthMask = this.add.sprite(this.barreVie.x, this.barreVie.y, "BarreVie").setScrollFactor(0);
        this.healthMask.visible = false;
        this.barreVie.mask = new Phaser.Display.Masks.BitmapMask(this, this.healthMask);

        //Création Collision
        //Joueur
        this.physics.add.collider(this.player, this.murs);
        this.physics.add.overlap(this.player, this.mob, this.perteVie, null, this);

        //Création Collision Attaque
        this.physics.add.overlap(this.attaque_sword, this.bordure, this.clean_sword, this.if_clean_sword, this);

        //Ennemi

        this.physics.add.collider(this.mob, this.switchDown_Layer, this.mob_switch_down, null, this);
        this.physics.add.collider(this.mob, this.switchUp_Layer, this.mob_switch_up, null, this);
        this.physics.add.collider(this.mob, this.switchLeft_Layer, this.mob_switch_left, null, this);
        this.physics.add.collider(this.mob, this.switchRight_Layer, this.mob_switch_right, null, this);
        this.physics.add.collider(this.mob, this.attaque_sword, this.kill_mob, null, this);    
    }

    update(){

        const speed = 175;

        if (this.player_block == false) {


            //Mouvement
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-speed);
                this.player.setVelocityX(0);
                this.player.anims.play('up');
                this.player_facing = "up";
            }
            else if (this.cursors.down.isDown) {
                this.player.setVelocityY(speed);
                this.player.setVelocityX(0);
                this.player.anims.play('down');
                this.player_facing = "down";
            }
            else if (this.cursors.right.isDown) {
                this.player.setVelocityX(speed);
                this.player.setVelocityY(0);
                this.player.anims.play('right');
                this.player_facing = "right";
            }
            else if (this.cursors.left.isDown) {
                this.player.setVelocityX(-speed);
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
                setTimeout(this.delock_attaque, 500);
            }
        }

            this.player.body.setVelocity(0);

            if (this.cursors.left.isDown) { //si la touche gauche est appuyée
                this.player.setVelocityX(-speed); //alors vitesse négative en X
                //this.player.anims.play('left', true); //et animation => gauche
            }

            else if (this.cursors.right.isDown) { //sinon si la touche droite est appuyée
                this.player.setVelocityX(speed); //alors vitesse positive en X
                //this.player.anims.play('right', true); //et animation => droite
            }


            if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
            }

            else if (this.cursors.up.isDown){
                this.player.setVelocityY(-speed);
            }

            // Normalize and scale the velocity so that player can't move faster along a diagonal
            this.player.body.velocity.normalize().scale(speed);   
    }

    //Gestion Pattern Mob
    mob_switch_right(mob) {
        mob.setVelocityX(100);
        mob.setVelocityY(0);
        mob.anims.play('right_mob')
    }

    mob_switch_left(mob) {
        mob.setVelocityX(-100);
        mob.setVelocityY(0);
        mob.anims.play('left_mob')
    }

    mob_switch_up(mob) {
        mob.setVelocityX(0);
        mob.setVelocityY(-100);
        mob.anims.play('up_mob')
    }

    mob_switch_down(mob) {
        mob.setVelocityX(0);
        mob.setVelocityY(100);
        mob.anims.play('down_mob')
    }

    //Kill Mob
    kill_mob(mob){
        mob.disableBody(true, true)
    }

    //Clean Attaque
    clean_sword(attaque_sword) {
        attaque_sword.disableBody(true, true);
    }

    if_clean_sword() {
        if (trigger_cleanSword == true) {
            trigger_cleanSword = false;
            return true
        }
        else {
            return false
        }
    }

    //Delock Joueur
    delock_attaque() {
        player_block = false;
        trigger_cleanSword = true;
    }

    //Gestion Vie
    perteVie(player, mob) {
        this.healthMask.x -= 33;
    }
    

}
