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

            speed: 175,
            //speed : 800,
            health: 5,

            // SPAWN TUTO
            spawnX : 400,
            spawnY : 1808

            //SPAWN HUB
            //spawnX: 528,
            //spawnY: 1445

            // SPAWN DONJON
            //spawnX : 1776,
            //spawnY : 768
        });
    }
}

export default mainScreen