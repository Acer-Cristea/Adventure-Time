class Load extends Phaser.Scene {
    constructor() {
        super('sceneLoad')
    }

    preload() {

        this.load.path = "./assets/"

        this.load.image("TP", "Top_Border.png")

        this.load.spritesheet('mc-sheet', 'mc-sheet.png', {
            frameWidth: 100,
        })


        this.load.path = './assets/tilemaps/'

        this.load.image("tilesetImage", "tileset.png")
        
        this.load.tilemapTiledJSON('Map', 'Map.json')

    }

    create() {

        this.anims.create({
            key: 'mc-idle',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('mc-sheet', { frames: [ 0 ]} )
        })

        this.anims.create({
            key: 'mc-walk',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('mc-sheet', { frames: [ 0 ]} )
        })

        this.scene.start('sceneKeys')
    }
}