// Acer Cristea
// Adventure Time Adaptation

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 256,
    height: 144,
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
    zoom: 4,
    scene: [ Load, Keys, Play ]
}

let game = new Phaser.Game(config)