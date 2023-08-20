class mainScreen extends Phaser.Scene {
    constructor() {
        super("MainScreen");
    }

    init(data) {
        this.music = data.music;
    }

    create() {

        this.cameras.main.fadeIn(1500, 0, 0, 0)

        this.gameLaunched = false;

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

        if (!this.gameLaunched) {

            this.tweens.add({
                targets: this.music,
                volume: 0,
                duration: 500
            });

            this.music = this.sound.add('musicTuto');
            this.music.setLoop(true)
                .setVolume(0.4);

            this.gameLaunched = true;

            this.cameras.main.fadeOut(1500, 0, 0, 0);

            this.time.delayedCall(1500, function () {

                this.music.play();

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

                    music: this.music,

                    speed: 175,
                    //speed : 800,
                    health: 5,

                    // SPAWN TUTO
                    spawnX : 48,
                    spawnY : 1808

                    //SPAWN HUB
                    //spawnX: 528,
                    //spawnY: 1445

                    //SPAWN HUB FIN DU JEU
                    //spawnX: 448,
                    //spawnY: 1257

                    //SPAWN ZONE 1

                    //spawnX: 2608,
                    //spawnY: 1392

                    //SPAWN ZONE 2
                    //spawnX: 1840,
                    //spawnY: 1888,

                    //SPAWN ZONE SECRETE
                    //spawnX: 608,
                    //spawnY: 256

                    // SPAWN DONJON
                    //spawnX: 1200,
                    //spawnY: 752
                });

            }, null, this);
        }
    }
}

export default mainScreen