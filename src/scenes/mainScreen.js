class mainScreen extends Phaser.Scene {
    constructor() {
        super("MainScreen");
    }

    create() {

        this.add.image(341, 192, 'mainScreen');
        this.gameButton = this.add.sprite(225, 270, "Button_Game").setInteractive({ cursor: 'pointer' });
        this.gameButton.setFrame(1)

        this.gameButton.on("pointerdown", this.launchGame, this);
    }

    update() {

        this.gameButton.on('pointerover', this.changeOver, this);

        this.gameButton.on('pointerout', this.changeOut, this);

    }

    changeOver() {
        this.gameButton.setFrame(0);
    }

    changeOut() {
        this.gameButton.setFrame(1);
    }

    launchGame() {
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

            bossDefeated: false,

            speed: 175,
            //speed : 800,
            health: 5,

            // SPAWN TUTO
            spawnX : 48,
            spawnY : 1808

            //SPAWN HUB
            //spawnX: 528,
            //spawnY: 1445

            //SPAWN ZONE 1

            //spawnX: 2608,
            //spawnY: 1392

            //SPAWN ZONE 2
            //spawnX: 1840,
            //spawnY: 1888,

            // SPAWN DONJON
            //spawnX : 1184,
            //spawnY : 608
        });
    }
}

export default mainScreen