class mainScreen extends Phaser.Scene {
    constructor() {
        super("mainScreen");
    }

    preload() {
        // SPRITE SHEETS

        // player (32 x 32)
        this.load.spritesheet('player', 'assets/perso.png',
            { frameWidth: 64, frameHeight: 64 });

        // PNJ
        this.load.image('npc', 'assets/pnj.png');

        // Mob A (32 x 32)
        this.load.spritesheet('mobA', 'assets/mobA.png',
            { frameWidth: 32, frameHeight: 44 });
        // Mob B (32 x 32)
        this.load.spritesheet('mobB', 'assets/mobB.png',
            { frameWidth: 32, frameHeight: 32 });

        this.load.image("projmobB", "assets/projMobB.png");

        // Mob C (32 x 32)

        this.load.spritesheet('mobC', 'assets/mobC.png',
            { frameWidth: 32, frameHeight: 32});

        // Echelle haricot (32 x 96)
        this.load.spritesheet('echelle', 'assets/haricot.png',
            { frameWidth: 32, frameHeight: 64 });

        this.load.spritesheet('bridge', 'assets/pont.png',
            { frameWidth: 32, frameHeight: 128 });

        // TILED 

        this.load.image('tiles', 'assets/Tiled/tileset.png'); //Tileset 
        this.load.image('grande_laitue', 'assets/grande_laitue.png'); //Tileset 
        this.load.tilemapTiledJSON('map_tuto', 'assets/Tiled/map_tuto.json'); //fichier JSON
        this.load.tilemapTiledJSON('map_hub', 'assets/Tiled/map_hub.json')
        this.load.tilemapTiledJSON('map_zone1', 'assets/Tiled/map_part1.json')
        this.load.tilemapTiledJSON('map_zone2', 'assets/Tiled/map_part2.json')

        // IMAGES
        this.load.image('mainScreen', 'assets/Ecran_accueil.png');

        this.load.image('box', 'assets/graine_haricot.png');

        this.load.image('ronces', 'assets/ronces.png');

        this.load.image('panneauG', 'assets/panel_left.png');
        this.load.image('panneauD', 'assets/panel_right.png');

        this.load.image('buff', 'assets/buff.png');

        // LOOT
        this.load.image("grainesScore", "assets/loot.png");
        this.load.image("heal", "assets/heal.png");

        //Attaque serpe
        this.load.image("sword_y", "assets/attaque_joueur_y.png");
        this.load.image("sword_x", "assets/attaque_joueur_x.png");
        this.load.image("proj", "assets/projBow.png");

        //UI
        this.load.image("CadreVie", "assets/CadreVie.png");
        this.load.image("BarreVie", "assets/BarreVie.png");

        this.load.image("salade_ui", "assets/feuille_salade_ui.png");
        this.load.image("graineCourge_ui", "assets/graine_courge_ui.png");
        this.load.image("serpe_ui", "assets/serpe_ui.png");

        this.load.image("life1", "assets/life_step1.png");
        this.load.image("life2", "assets/life_step2.png");
        this.load.image("life3", "assets/life_step3.png");
        this.load.image("life4", "assets/life_step4.png");
        this.load.image("life5", "assets/life_step5.png");
        this.load.image("lifeEmpty", "assets/life_stepEmpty.png");
        
        this.load.image("interface", "assets/interface.png");

        //////
        
        //Bouton de lancement
        this.load.spritesheet("Button_Game", "assets/Bouton_play.png",
            { frameWidth: 180, frameHeight: 73 });

        this.load.image('passage3x1', "assets/3x1_cases.png");
        this.load.image('passage1x3', "assets/1x3_cases.png");
        this.load.image('passage1x4', 'assets/1x4_cases.png');
    }

    create() {

        // Animation boutons

        this.anims.create({
            frames: [{ key: 'Button_Game', frame: 0 }],
        });
        this.anims.create({
            frames: [{ key: 'Button_Game', frame: 1 }],
        });



        this.add.image(341, 192, 'mainScreen');
        this.gameButton = this.add.sprite(225, 270, "Button_Game").setInteractive({ cursor: 'pointer' });
        this.gameButton.setFrame(1)

        this.gameButton.on("pointerdown", this.launchGame, this);

        // ANIMATIONS 

        // Animation joueur

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', {start:0,end:3}),
            frameRate: 4,
            repeat : -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', {start:4,end:7}),
            frameRate: 4,
            repeat : -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {start:8,end:11}),
            frameRate: 4,
            repeat : -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {start:12,end:15}),
            frameRate: 4,
            repeat : -1
        });

        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('player', {start:16,end:19}),
            frameRate: 5,
            repeat : -1
        });
        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('player', {start:20,end:23}),
            frameRate: 5,
            repeat : -1
        });
        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('player', {start:24,end:27}),
            frameRate: 5,
            repeat : -1
        });
        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('player', {start:28,end:31}),
            frameRate: 5,
            repeat : -1
        });

        this.anims.create({
            key: 'attack_down',
            frames: this.anims.generateFrameNumbers('player', {start:32,end:35}),
            frameRate: 10,
        });
        this.anims.create({
            key: 'attack_up',
            frames: this.anims.generateFrameNumbers('player', {start:36,end:39}),
            frameRate: 10,
        });
        this.anims.create({
            key: 'attack_right',
            frames: this.anims.generateFrameNumbers('player', {start:40,end:43}),
            frameRate: 10,
        });
        this.anims.create({
            key: 'attack_left',
            frames: this.anims.generateFrameNumbers('player', {start:44,end:47}),
            frameRate: 10,
        });

        this.anims.create({
            key: 'shoot_down',
            frames: this.anims.generateFrameNumbers('player', {start:48,end:51}),
            frameRate: 10,
        });
        this.anims.create({
            key: 'shoot_up',
            frames: this.anims.generateFrameNumbers('player', {start:52,end:55}),
            frameRate: 10,
        });
        this.anims.create({
            key: 'shoot_right',
            frames: this.anims.generateFrameNumbers('player', {start:56,end:59}),
            frameRate: 10,
        });
        this.anims.create({
            key: 'shoot_left',
            frames: this.anims.generateFrameNumbers('player', {start:60,end:63}),
            frameRate: 10,
        });

        this.anims.create({
            key: 'down_carry',
            frames: this.anims.generateFrameNumbers('player', {start:64,end:67}),
            frameRate: 4,
            repeat : -1
        });
        this.anims.create({
            key: 'up_carry',
            frames: this.anims.generateFrameNumbers('player', {start:68,end:71}),
            frameRate: 4,
            repeat : -1
        });
        this.anims.create({
            key: 'right_carry',
            frames: this.anims.generateFrameNumbers('player', {start:72,end:75}),
            frameRate: 4,
            repeat : -1
        });
        this.anims.create({
            key: 'left_carry',
            frames: this.anims.generateFrameNumbers('player', {start:76,end:79}),
            frameRate: 4,
            repeat : -1
        });

        this.anims.create({
            key: 'walk_down_carry',
            frames: this.anims.generateFrameNumbers('player', {start:80,end:83}),
            frameRate: 4,
            repeat : -1
        });
        this.anims.create({
            key: 'walk_up_carry',
            frames: this.anims.generateFrameNumbers('player', {start:84,end:87}),
            frameRate: 4,
            repeat : -1
        });
        this.anims.create({
            key: 'walk_right_carry',
            frames: this.anims.generateFrameNumbers('player', {start:88,end:91}),
            frameRate: 4,
            repeat : -1
        });
        this.anims.create({
            key: 'walk_left_carry',
            frames: this.anims.generateFrameNumbers('player', {start:92,end:95}),
            frameRate: 4,
            repeat : -1
        });

        // animation pont

        this.anims.create({
            key: 'trueBridge',
            frames: this.anims.generateFrameNumbers('bridge', {start:1,end:5}),
            frameRate: 5,
        });
        this.anims.create({
            key: 'falseBridge',
            //frames: [{ key: 'bridge', frame: 0 }],
            frames: this.anims.generateFrameNumbers('bridge', {start:5,end:10}),
            frameRate: 5,
        });

        this.anims.create({
            key: 'trueEchelle',
            frames: this.anims.generateFrameNumbers('echelle', {start:1,end:3}),
            frameRate: 2,
        });
        this.anims.create({
            key: 'falseEchelle',
            frames: [{ key: 'echelle', frame: 0 }],
        });

        // animation mob A

        this.anims.create({
            key: 'mobAanim',
            frames: this.anims.generateFrameNumbers('mobA', {start:0,end:3}),
            frameRate: 5,
            repeat : -1
        });

        this.anims.create({
            key: 'mobBLeftanim',
            frames: this.anims.generateFrameNumbers('mobB', {start:0,end:3}),
            frameRate: 4,
            repeat : -1
        });

        this.anims.create({
            key: 'mobBRightanim',
            frames: this.anims.generateFrameNumbers('mobB', {start:4,end:7}),
            frameRate: 4,
            repeat : -1
        });
        /*this.anims.create({
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
        });*/

        //animation mob C

        this.anims.create({
            key: 'mobC_anims',
            frames: this.anims.generateFrameNumbers('mobC', {start:0,end:19}),
            frameRate: 5,
            repeat: -1
        });

    }

    update() {

        this.gameButton.on('pointerover', this.changeOver, this); 

        this.gameButton.on('pointerout', this.changeOut, this);

    }

    changeOver(){
        this.gameButton.setFrame(0);
    }

    changeOut(){
        this.gameButton.setFrame(1);
    }

    launchGame(){
        this.scene.start('sceneTuto', {
            graineScore : 5,

            // Variables pour débloquer les mécaniques
            attackCaCLoot : true,
            attackDistanceLoot : true,
            volerLoot : true,

            speed : 175,
            //speed : 800,
            health : 5,
            
            spawnX : 400,
            spawnY : 1808

            //spawnX : 528,
            //spawnY : 1445
        });
    }
}