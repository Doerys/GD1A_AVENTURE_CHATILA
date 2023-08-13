class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        // SPRITE SHEETS

        // player (32 x 32)
        this.load.spritesheet('player', 'assets/perso.png',
            { frameWidth: 64, frameHeight: 64 });

        // PNJ
        this.load.image('npc', 'assets/pnj.png');
        this.load.image('npc2', 'assets/pnj2.png');
        this.load.image('npc3', 'assets/pnj3.png');
        this.load.image('npc4', 'assets/pnj4.png');
        this.load.image('npc5', 'assets/pnj5.png');
        this.load.image('npc6', 'assets/pnj6.png');

        // Mob A (32 x 32)
        this.load.spritesheet('mobA', 'assets/mobA.png',
            { frameWidth: 32, frameHeight: 44 });
        // Mob B (32 x 32)
        this.load.spritesheet('mobB', 'assets/mobB.png',
            { frameWidth: 32, frameHeight: 32 });

        this.load.image("projmobB", "assets/projMobB.png");

        this.load.spritesheet('projBoss', 'assets/projBoss.png',
            { frameWidth: 16, frameHeight: 16 });

        // Mob C (32 x 32)

        this.load.spritesheet('mobC', 'assets/mobC.png',
            { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('mobC2', 'assets/mobC2.png',
            { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('mobD', 'assets/mobD.png',
            { frameWidth: 32, frameHeight: 40 });

        this.load.spritesheet('boss', 'assets/boss.png',
            { frameWidth: 80, frameHeight: 80 });

        this.load.spritesheet('tileAttack', 'assets/tileBoss.png',
            { frameWidth: 32, frameHeight: 32 });

        // Echelle haricot (32 x 96)
        this.load.spritesheet('echelle', 'assets/haricot.png',
            { frameWidth: 32, frameHeight: 64 });

        // Ponts courges

        this.load.spritesheet('bridge', 'assets/pont.png',
            { frameWidth: 32, frameHeight: 128 });

        this.load.spritesheet('bridgeDown', 'assets/pont_down.png',
            { frameWidth: 32, frameHeight: 128 });

        this.load.spritesheet('bridgeLeft', 'assets/pont_left.png',
            { frameWidth: 128, frameHeight: 32 });

        this.load.spritesheet('bridgeRight', 'assets/pont_right.png',
            { frameWidth: 128, frameHeight: 32 });

        // TILED 

        this.load.image('tileset_image', 'assets/Tiled/tileset.png'); //Tileset 
        this.load.image('grande_laitue', 'assets/grande_laitue.png'); //Tileset 
        this.load.tilemapTiledJSON('map_tuto', 'assets/Tiled/map_tuto.json'); //fichier JSON
        this.load.tilemapTiledJSON('map_hub', 'assets/Tiled/map_hub.json')
        this.load.tilemapTiledJSON('map_zone1', 'assets/Tiled/map_part1.json')
        this.load.tilemapTiledJSON('map_zone2', 'assets/Tiled/map_part2.json')
        this.load.tilemapTiledJSON('map_secrete', 'assets/Tiled/map_secret.json')
        this.load.tilemapTiledJSON('map_donjon', 'assets/Tiled/map_donjon.json')

        // IMAGES
        this.load.image('mainScreen', 'assets/Ecran_accueil.png');

        this.load.image('box', 'assets/graine_haricot.png');

        this.load.image('ronces', 'assets/ronces.png');

        this.load.image('panneauG', 'assets/panel_left.png');
        this.load.image('panneauD', 'assets/panel_right.png');
        this.load.image('statue', 'assets/statue.png');
        // LOOT
        this.load.image("grainesScore", "assets/loot.png");
        this.load.image("heal", "assets/heal.png");

        this.load.image("courge_loot", "assets/graine_courge_loot.png");
        this.load.image("serpe_loot", "assets/serpe_loot.png");
        this.load.image("salade_loot", "assets/salade_loot.png");
        this.load.image('final_loot', 'assets/final_loot.png');

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
        this.load.image("dialogue", "assets/dialog_box.png")
        this.load.image("dialogueButton", "assets/dialogButton.png")
        this.load.image("dialogPassButton", "assets/passDialogButton.png")

        this.load.image("carryGraineButton", "assets/carryButton.png")

        // ATTAQUE BOSS
        this.load.spritesheet('bossAttack1', 'assets/attackBossPhase1.png',
            { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet('bossAttack2', 'assets/attackBossPhase2.png',
            { frameWidth: 192, frameHeight: 192 });

        this.load.spritesheet('bossAttack3', 'assets/attackBossPhase3.png',
            { frameWidth: 256, frameHeight: 256 });

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

        // ANIMATIONS 

        // Animation joueur

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 19 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('player', { start: 20, end: 23 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 27 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('player', { start: 28, end: 31 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'attack_down',
            frames: this.anims.generateFrameNumbers('player', { start: 32, end: 35 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'attack_up',
            frames: this.anims.generateFrameNumbers('player', { start: 36, end: 39 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'attack_right',
            frames: this.anims.generateFrameNumbers('player', { start: 40, end: 43 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'attack_left',
            frames: this.anims.generateFrameNumbers('player', { start: 44, end: 47 }),
            frameRate: 10,
        });

        this.anims.create({
            key: 'shoot_down',
            frames: this.anims.generateFrameNumbers('player', { start: 48, end: 51 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'shoot_up',
            frames: this.anims.generateFrameNumbers('player', { start: 52, end: 55 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'shoot_right',
            frames: this.anims.generateFrameNumbers('player', { start: 56, end: 59 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'shoot_left',
            frames: this.anims.generateFrameNumbers('player', { start: 60, end: 63 }),
            frameRate: 10,
        });

        this.anims.create({
            key: 'down_carry',
            frames: this.anims.generateFrameNumbers('player', { start: 64, end: 67 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'up_carry',
            frames: this.anims.generateFrameNumbers('player', { start: 68, end: 71 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'right_carry',
            frames: this.anims.generateFrameNumbers('player', { start: 72, end: 75 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'left_carry',
            frames: this.anims.generateFrameNumbers('player', { start: 76, end: 79 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_down_carry',
            frames: this.anims.generateFrameNumbers('player', { start: 80, end: 83 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_up_carry',
            frames: this.anims.generateFrameNumbers('player', { start: 84, end: 87 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_right_carry',
            frames: this.anims.generateFrameNumbers('player', { start: 88, end: 91 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_left_carry',
            frames: this.anims.generateFrameNumbers('player', { start: 92, end: 95 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'fly_down',
            frames: this.anims.generateFrameNumbers('player', { start: 96, end: 99 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'fly_up',
            frames: this.anims.generateFrameNumbers('player', { start: 100, end: 103 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'fly_right',
            frames: this.anims.generateFrameNumbers('player', { start: 104, end: 107 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'fly_left',
            frames: this.anims.generateFrameNumbers('player', { start: 108, end: 111 }),
            frameRate: 10,
        });
        this.anims.create({
            key: 'loot',
            frames: this.anims.generateFrameNumbers('player', { start: 112, end: 115 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'lootOut',
            frames: this.anims.generateFrameNumbers('player', { start: 115, end: 112 }),
            frameRate: 10
        });

        // animation pont

        this.anims.create({
            key: 'trueBridge',
            frames: this.anims.generateFrameNumbers('bridge', { start: 1, end: 5 }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'falseBridge',
            //frames: [{ key: 'bridge', frame: 0 }],
            frames: this.anims.generateFrameNumbers('bridge', { start: 5, end: 10 }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'trueBridgeDown',
            frames: this.anims.generateFrameNumbers('bridgeDown', { start: 1, end: 5 }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'falseBridgeDown',
            //frames: [{ key: 'bridge', frame: 0 }],
            frames: this.anims.generateFrameNumbers('bridgeDown', { start: 5, end: 10 }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'trueBridgeRight',
            frames: this.anims.generateFrameNumbers('bridgeRight', { start: 1, end: 5 }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'falseBridgeRight',
            //frames: [{ key: 'bridge', frame: 0 }],
            frames: this.anims.generateFrameNumbers('bridgeRight', { start: 5, end: 10 }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'trueBridgeLeft',
            frames: this.anims.generateFrameNumbers('bridgeLeft', { start: 1, end: 5 }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'falseBridgeLeft',
            //frames: [{ key: 'bridge', frame: 0 }],
            frames: this.anims.generateFrameNumbers('bridgeLeft', { start: 5, end: 10 }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'trueEchelle',
            frames: this.anims.generateFrameNumbers('echelle', { start: 1, end: 3 }),
            frameRate: 2,
        });
        this.anims.create({
            key: 'falseEchelle',
            frames: [{ key: 'echelle', frame: 0 }],
        });

        // animation mob A

        this.anims.create({
            key: 'mobAanim',
            frames: this.anims.generateFrameNumbers('mobA', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'mobBLeftanim',
            frames: this.anims.generateFrameNumbers('mobB', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'mobBRightanim',
            frames: this.anims.generateFrameNumbers('mobB', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'mobBDownanim',
            frames: this.anims.generateFrameNumbers('mobB', { start: 8, end: 11 }),
            frameRate: 4,
            repeat: -1
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
            frames: this.anims.generateFrameNumbers('mobC', { start: 0, end: 19 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'mobC2_anims',
            frames: this.anims.generateFrameNumbers('mobC2', { start: 0, end: 19 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'mobD_animOut',
            frames: this.anims.generateFrameNumbers('mobD', { start: 0, end: 3 }),
            frameRate: 8
        });

        this.anims.create({
            key: 'mobD_animIn',
            frames: this.anims.generateFrameNumbers('mobD', { start: 3, end: 0 }),
            frameRate: 8
        });

        this.anims.create({
            key: 'mobD_anims',
            frames: this.anims.generateFrameNumbers('mobD', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'bossWalk_anims',
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'bossHit_anims',
            frames: this.anims.generateFrameNumbers('boss', { start: 4, end: 12 }),
            frameRate: 5
        });

        this.anims.create({
            key: 'bossBigHit_anims',
            frames: this.anims.generateFrameNumbers('boss', { start: 16, end: 23 }),
            frameRate: 8
        });

        this.anims.create({
            key: 'bossHitDist_anims',
            frames: this.anims.generateFrameNumbers('boss', { start: 24, end: 25 }),
            frameRate: 4
        });

        this.anims.create({
            key: 'bossCastIn_anims',
            frames: this.anims.generateFrameNumbers('boss', { start: 28, end: 31 }),
            frameRate: 4
        });

        this.anims.create({
            key: 'bossCastOut_anims',
            frames: this.anims.generateFrameNumbers('boss', { start: 31, end: 28 }),
            frameRate: 4
        });

        this.anims.create({
            key: 'projBoss',
            frames: this.anims.generateFrameNumbers('projBoss', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'attackBoss1_anims',
            frames: this.anims.generateFrameNumbers('bossAttack1', { start: 0, end: 6 }),
            frameRate: 4
        });

        this.anims.create({
            key: 'attackBoss2_anims',
            frames: this.anims.generateFrameNumbers('bossAttack2', { start: 0, end: 6 }),
            frameRate: 4
        });

        this.anims.create({
            key: 'attackBoss3_anims',
            frames: this.anims.generateFrameNumbers('bossAttack3', { start: 0, end: 6 }),
            frameRate: 4
        });

        this.anims.create({
            key: 'tileAttack_anims',
            frames: this.anims.generateFrameNumbers('tileAttack', { start: 0, end: 19 }),
            frameRate: 5    
        });

        this.anims.create({
            key: 'tileAttackIn_anims',
            frames: this.anims.generateFrameNumbers('tileAttack', { start: 19, end: 14 }),
            frameRate: 8 
        });

        this.scene.start("MainScreen");
    }

}

export default Preload