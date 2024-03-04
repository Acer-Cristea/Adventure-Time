class Play extends Phaser.Scene {
    constructor() {
        super('scenePlay')
    }

    preload() {

    }

    create() {
        console.log('Play: create')

        // grab keyboard binding from Keys scene
        this.KEYS = this.scene.get('sceneKeys').KEYS

        // create tilemap
        const map = this.add.tilemap('Map')

        const tileset = map.addTilesetImage("Base", "tilesetImage")
        const layer = map.createLayer("Collision", tileset, 0,0)

    }

    update() {
        // get local KEYS reference
        const { KEYS } = this

    }
}