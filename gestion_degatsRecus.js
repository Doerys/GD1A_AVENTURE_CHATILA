
//Gestion Frame Imu
function able_hit(player_beHit) {
    player_beHit = false;
}

function getHit(player_beHit) {
    if (player_beHit == false) {
        return true
    }
    else {
        return false
    }
}

function pinvisible(player, pvisible) {
    player.setVisible(false);
    this.time.delayedCall(50, pvisible, [], this);
}

function pvisible(clignotement, pinvisible, player) {
    if (clignotement < 3) {
        this.time.delayedCall(50, pinvisible, [], this);
        player.visible = true;
        clignotement += 1;
    }
    else {
        player.visible = true;
        clignotement = 0;
        able_hit();
    }
}

//Gestion Vie
function perteVie(player, mobA, player_block, player_beHit, health, healthMask, delock_joueur) {
    player_block = true;
    player_beHit = true;
    if (mobA.body.touching.left) {
        player.setVelocityX(-400);
    }
    else if (mobA.body.touching.right) {
        player.setVelocityX(400);
    }
    else if (mobA.body.touching.up) {
        player.setVelocityY(-400);
    }
    else if (mobA.body.touching.down) {
        player.setVelocityY(400);
    }
    pinvisible();
    healthMask.x -= 10;
    health -= 10;
    if (health < 0) {
        player_block = true;
        player.setTint(0xff0000);
        this.physics.pause();
    }
    else {
        this.time.delayedCall(200, delock_joueur, [], this);
        this.time.delayedCall(200, able_hit, [], this);
    }
}