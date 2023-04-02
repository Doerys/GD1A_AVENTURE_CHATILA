class mainScreen extends Phaser.Scene {
    constructor() {
        super("mainScreen");
    }

    preload() {
        // SPRITE SHEETS

        // player (32 x 32)
        this.load.spritesheet('player', 'assets/perso.png',
            { frameWidth: 32, frameHeight: 32 });

        // Mob A (32 x 32)
        this.load.spritesheet('mobA', 'assets/mobA.png',
            { frameWidth: 32, frameHeight: 32 });

        // Mob B (32 x 32)
        this.load.image('mobB', 'assets/mobB.png');
        this.load.image("projmobB", "assets/projMobB.png");

        // Mob C (32 x 32)

        this.load.spritesheet('mobC', 'assets/mobC.png',
            { frameWidth: 32, frameHeight: 32});

        // Echelle haricot (32 x 96)
        this.load.spritesheet('echelle', 'assets/haricot.png',
            { frameWidth: 32, frameHeight: 64 });

        this.load.spritesheet('bridge', 'assets/pont.png',
            { frameWidth: 96, frameHeight: 32 });

        // TILED 

        this.load.image('tiles', 'assets/Tiled/tileset.png'); //Tileset 
        this.load.tilemapTiledJSON('map_tuto', 'assets/Tiled/map_tuto.json'); //fichier JSON
        this.load.tilemapTiledJSON('map_hub', 'assets/Tiled/map_hub.json')
        this.load.tilemapTiledJSON('map_zone2', 'assets/Tiled/map_part2.json')

        // IMAGES
        this.load.image('box', 'assets/box.png');
        this.load.image('trou', 'assets/trouGraine.png');

        // LOOT
        this.load.image("Monnaie", "assets/Monnaie.png");
        this.load.image("Soin", "assets/Soin.png");

        //Attaque serpe
        this.load.image("sword_y", "assets/attaque_joueur_y.png");
        this.load.image("sword_x", "assets/attaque_joueur_x.png");
        this.load.image("proj", "assets/projBow.png");

        //UI
        this.load.image("CadreVie", "assets/CadreVie.png");
        this.load.image("BarreVie", "assets/BarreVie.png");

        //////
        
        //Bouton de lancement
        this.load.image("Button_Game", "assets/launchGame.png");

        this.load.image('passage3x1', "assets/3x1_cases.png");
        this.load.image('passage1x3', "assets/1x3_cases.png");
        this.load.image('passage1x4', 'assets/1x4_cases.png');
    }

    create() {
        this.gameButton = this.add.image(350, 200, "Button_Game").setInteractive();
        this.gameButton.on("pointerdown", this.launchGame, this);

        // ANIMATIONS 

        // Animation joueur

        this.anims.create({
            key: 'left',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'down',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'up',
            frames: [{ key: 'player', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: [{ key: 'player', frame: 1 }],
            frameRate: 20
        });

        // animation pont

        this.anims.create({
            key: 'trueBridge',
            frames: [{ key: 'bridge', frame: 0 }],
        });
        this.anims.create({
            key: 'falseBridge',
            frames: [{ key: 'bridge', frame: 1 }],
        });

        this.anims.create({
            key: 'trueEchelle',
            frames: [{ key: 'echelle', frame: 0 }],
        });
        this.anims.create({
            key: 'falseEchelle',
            frames: [{ key: 'echelle', frame: 1 }],
        });

        // animation mob A

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

        //animation mob C

        this.anims.create({
            key: 'mobC_anims',
            frames: this.anims.generateFrameNumbers('mobC', {start:1,end:0}),
            frameRate: .5,
            repeat: -1
        });

    }

    update() {
    }

    launchGame(){
        this.scene.start('sceneHub', {
            argent : 0,

            // Variables pour débloquer les mécaniques
            attackCaCLoot : true,
            attackDistanceLoot : true,
            volerLoot : true,

            //speed : 175,
            speed : 800,
            health : 100,
            
            //spawnX : 400,
            //spawnY : 1808

            spawnX : 528,
            spawnY : 816
        });
    }
}