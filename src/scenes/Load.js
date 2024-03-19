class Load extends Phaser.Scene {
    constructor() {
        super('sceneLoad')
    }

    preload() {

        this.load.path = "./assets/"

        this.load.image("title", "title.png")
        this.load.image("death", "death.png")
        this.load.image("TB", "Top_Border.png")
        this.load.image("coin", "coin.png")
        this.load.image("life", "life.png")
        this.load.image("bunny", "bunny.png")
        this.load.image("bomb", "bomb.png")
        this.load.image("bmo", "BMO.png")
        this.load.image("laser", "laser.png")
        this.load.image("frog", "frog.png")


        this.load.spritesheet('mc-sheet', 'mc-sheet.png', {
            frameWidth: 115,
            frameHeight: 116
        })

        this.load.spritesheet('mc-dance-sheet', 'mc-dance-sheet.png', {
            frameWidth: 80,
            frameHeight: 116
        })

        this.load.spritesheet('mc-bomb-sheet1', 'mc-bomb-sheet1.png', {
            frameWidth: 80,
            frameHeight: 116
        })
        this.load.spritesheet("bee", "bee_moves.png", {
            frameWidth: 290,
            frameHeight: 245
        })

        this.load.spritesheet('fire', 'fire.png', {
            frameWidth: 160,
            frameHeight: 103
        })

        this.load.spritesheet('smallFire', 'smallFire.png', {
            frameWidth: 120,
            frameHeight: 103
        })

        this.load.spritesheet('coin-shine', 'coin_shine.png', {
            frameWidth: 32,
            frameHeight: 50
        })

        
        this.load.spritesheet('points', 'points.png', {
            frameWidth: 177,
            frameHeight: 192
        })

        this.load.spritesheet('points800', 'points800.png', {
            frameWidth: 177,
            frameHeight: 192
        })

        this.load.spritesheet('mc-sheet', 'mc-sheet.png', {
            frameWidth: 115,
            frameHeight: 116
        })

        this.load.path = './assets/tilemaps/'

        this.load.image("tilesetImage", "tileset.png")
        
        this.load.tilemapTiledJSON('Map', 'Map.json')

        this.load.path = './assets/sounds/'
        this.load.audio("walk-sfx", "walk.wav")
        this.load.audio("jump-sfx1", "sj.wav")
        this.load.audio("jump-sfx2", "ej.wav")
        this.load.audio("background_music", "background_music.mp3")
        this.load.audio("attack-sfx", "attack.wav")
        this.load.audio("attack-sfx1", "attack1.wav")
        this.load.audio("coin-sfx1", "coin_pickup1.wav")
        this.load.audio("coin-sfx2", "coin_pickup2.wav")
        this.load.audio("coin-sfx3", "coin_pickup3.wav")
        this.load.audio("point", "points.wav")
        this.load.audio("death", "death.wav")
        this.load.audio("hit", "hit.wav")
        this.load.audio("select", "select.wav")




        this.load.path = './assets/fonts/'
        this.load.bitmapFont('Pixel', 'Pixel.png', 'Pixel.xml')
        this.load.bitmapFont('PixelScore', 'PixelScore.png', 'PixelScore.xml')


       


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
            key: "mc-attack-instructions",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("mc-sheet", {frames: [5, 6, 7]})
        })

        this.anims.create({
            key: "bee-walk",
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers("bee", {frames: [0, 1]})
        })   

        this.anims.create({
            key: "bee-walk-instructions",
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bee", {frames: [0, 1]})
        })   

        this.anims.create({
            key: "mc-bomb",
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers("mc-bomb-sheet1",{frames: [1, 2, 4, 3]})
        })

        this.anims.create({
            key: "mc-bomb-instructions",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("mc-bomb-sheet1",{frames: [1, 2, 4, 3]})
        })

        this.anims.create({
            key: 'fire-idle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('fire', { frames: [ 0, 1 ]} )
        })

        this.anims.create({
            key: 'small-fire-idle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('smallFire', { frames: [ 0, 1 ]} )
        })

        this.anims.create({
            key: 'coin',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('coin-shine', { frames: [ 0, 1]} )
        })

        this.anims.create({
            key: 'points',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('points', { frames: [ 0, 1, 0, 1, 0, 1, 0, 1]} )
        })

        this.anims.create({
            key: 'points800',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('points800', { frames: [ 0, 1, 0, 1, 0, 1, 0, 1]} )
        })

        this.scene.start('sceneKeys')
    }
}