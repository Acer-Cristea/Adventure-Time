class Load extends Phaser.Scene {
    constructor() {
        super('sceneLoad')
    }

    preload() {

        this.load.path = "./assets/"

        this.load.image("title", "title.png")

        this.load.image("death", "death.png")
        

        this.load.image("TB", "Top_Border.png")

        this.load.spritesheet('mc-sheet', 'mc-sheet.png', {
            frameWidth: 115,
            frameHeight: 116
        })

        this.load.spritesheet('mc-dance-sheet', 'mc-dance-sheet.png', {
            frameWidth: 80,
            frameHeight: 116
        })

        this.load.spritesheet("bee", "bee_moves.png", {
            frameWidth: 290,
            frameHeight: 245
        })

        this.load.path = './assets/tilemaps/'

        this.load.image("tilesetImage", "tileset.png")
        
        this.load.tilemapTiledJSON('Map', 'Map.json')

        this.load.path = './assets/sounds/'

        this.load.audio("jump-sfx1", "sj.wav")
        this.load.audio("jump-sfx2", "ej.wav")

    }

    create() {

        this.anims.create({
            key: 'mc-idle',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mc-dance-sheet', { frames: [ 0, 1, 2 ]} )
        })

        this.anims.create({
            key: 'mc-walk',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mc-sheet', { frames: [ 3, 4 ]} )
        })

        this.anims.create({
            key: "mc-jump",
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers("mc-sheet", {frames: [0, 1]})
        })

        this.anims.create({
            key: "mc-attack",
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers("mc-sheet", {frames: [5, 6, 7]})
        })

        this.anims.create({
            key: "bee-walk",
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers("bee", {frames: [0, 1]})
        })    

        this.scene.start('sceneKeys')
    }
}