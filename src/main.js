// Acer Cristea
// Guardians of Sunshine
// Approximately 40-50 hours
// I have physic systems, camera systems, timers, tilemaps, a state machine, custom font, custom animations, input handling...
// The game has a really cool combo move to beat the frog. Make sure after jumping over the platform you walk until the frog's invisible barrier blocks you
// Only then can you start your combo. Otherwise I have a cool state machine with a bomb attack and create seperate physic hitboxes for them
// I used the examples given in class to help for the FSM and used the Keys which I credited in that scene's file
// Hope you enjoy!
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
        default: "arcade",
        arcade: {
            //debug: true,
            gravity: {
                y: 1000
            }
        },
    },
    scene: [ Load, Keys, Menu, Credits, Instructions, Play, Death, Winner]
}

let game = new Phaser.Game(config)

let { width, height } = game.config