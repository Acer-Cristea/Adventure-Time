// Acer Cristea
// Adventure Time Adaptation

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 870,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                y: 1000
            }
        },
    },
    scene: [ Load, Keys, Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config