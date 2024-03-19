// Acer Cristea
// Adventure Time Adaptation
// Approximately 40-50 hours

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
            debug: true,
            gravity: {
                y: 1000
            }
        },
    },
    scene: [ Load, Keys, Menu, Credits, Instructions, Play, Death]
}

let game = new Phaser.Game(config)

let { width, height } = game.config