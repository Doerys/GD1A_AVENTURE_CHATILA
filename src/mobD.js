class MobD extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
        this.initEvents();
    }

    init() {

        this.isTrigger = false;

        this.spawnX = this.x;
        this.spawnY = this.y;

        this.speed = 100;

        this.isAlive = false;

        this.scene.time.delayedCall(500, () => {

            this.isAlive = true;

        }, null, this);

        this.isOuting = false;
        this.outHole = false;

        this.setSize(32, 32);

        this.scene.physics.add.collider(this, this.scene.mobD);
    }

    initEvents() { // fonction qui permet de déclencher la fonction update
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.isAlive) {

            this.detectZone = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
            
            // pour le retour
            const tolerance = 10;
            const distance = Phaser.Math.Distance.Between(this.spawnX, this.spawnY, this.x, this.y);

            if (this.detectZone < 150) {
                this.isTrigger = true;
                
                if(!this.isOuting && !this.outHole) {
                    this.anims.play("mobD_animOut", true);
                    this.isOuting = true;

                    this.scene.time.delayedCall(500, () => {

                        this.isOuting = false;
                        this.outHole = true;
    
                    }, null, this);
                }

                if (this.outHole) {
                    this.anims.play("mobD_anims", true);
                    this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y + 8, this.speed);
                }
                
            }
            else {
                this.isTrigger = false;

                // pour éviter que ça shake à la fin
                if (distance < tolerance && this.outHole)
                {
                    this.outHole = false;
                    this.body.reset(this.spawnX, this.spawnY);
                    this.anims.play("mobD_animIn", true);
                }

                else if (this.x != this.spawnX && this.y != this.spawnY) {
                    this.scene.physics.moveTo(this, this.spawnX, this.spawnY + 8, this.speed)
                }

            }

        }
    }

}

export default MobD