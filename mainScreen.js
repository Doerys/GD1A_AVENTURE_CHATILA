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

        // Echelle haricot (32 x 96)
        this.load.spritesheet('echelle', 'assets/haricot.png',
            { frameWidth: 32, frameHeight: 96 });

        this.load.spritesheet('bridge', 'assets/pont.png',
            { frameWidth: 96, frameHeight: 32 });

        // TILED 

        this.load.image('tiles', 'assets/Tiled/tileset.png'); //Tileset 
        this.load.tilemapTiledJSON('map_tuto', 'assets/Tiled/map_tuto.json'); //fichier JSON
        this.load.tilemapTiledJSON('map_hub', 'assets/Tiled/map_hub.json')

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
    }

    create() {
        this.gameButton = this.add.image(350, 200, "Button_Game").setInteractive();
        this.gameButton.on("pointerdown", this.launchGame, this);
    }

    update() {
    }

    launchGame(){
        this.scene.start('sceneTuto', {
            argent : 0,

            // Variables pour débloquer les mécaniques
            attackCaCLoot : true,
            attackDistanceLoot : true,
            volerLoot : true,

            // speed : 175
            speed : 800,
            health : 100,
            
            spawnX : 400,
            spawnY : 1808

            //spawnX : 496,
            //spawnY : 816
        });
    }
}