// Pixeled font by OmegaPC777: https://www.dafont.com/pixeled.font 

class Load extends Phaser.Scene {
    constructor() {
        super('sceneLoad')
    }

    preload() {

        this.load.path = "./assets/"

        this.load.image("TP", "Top_Border.png")


        this.load.path = './assets/tilemaps/'

        this.load.image("tilesetImage", "tileset.png")
        
        this.load.tilemapTiledJSON('Map', 'Map.json')

    }

    create() {


        this.scene.start('sceneKeys')
    }
}