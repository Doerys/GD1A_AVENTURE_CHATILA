class EndGame extends Phaser.Scene {
    constructor() {
        super("EndGame");
    }

    init(data) {
        this.music = data.music
    }

    create() {

        console.log("check")

        this.music = this.sound.add("musicMainScreen");

        this.music.setVolume(.5).setLoop(true);

        this.music.play();

        this.endText = this.add.text(341, 100, 'Thank you', { font: '30px Mabook', fill: '#ffffff', justify: 'middle' })
            .setOrigin(0.5, 0.5).setAlpha(0);

        this.endText2 = this.add.text(341, 150, "for playing", { font: '30px Mabook', fill: '#ffffff', justify: 'middle' })
            .setOrigin(0.5, 0.5).setAlpha(0);

        this.endText3 = this.add.text(341, 240, "Garden's Keeper", { font: '70px Mabook', fill: '#ffffff', justify: 'middle' })
            .setOrigin(0.5, 0.5).setAlpha(0);

        this.time.delayedCall(1500, () => {

            this.tweens.add({
                targets: this.endText,
                alpha: 1,
                duration: 500
            })

        }, null, this);

        this.time.delayedCall(3000, () => {

            this.tweens.add({
                targets: this.endText2,
                alpha: 1,
                duration: 500
            })

        }, null, this);

        this.time.delayedCall(5250, () => {

            this.tweens.add({
                targets: this.endText3,
                alpha: 1,
                duration: 500
            })

        }, null, this);

    }

    update() {


    }

}

export default EndGame