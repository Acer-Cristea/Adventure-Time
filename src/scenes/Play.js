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

        this.map = this.add.tilemap('Map') //create tilemap
        this.tileset = this.map.addTilesetImage("Base", "tilesetImage")
        this.bkgLayer = this.map.createLayer("bkg", this.tileset, 0,0)
        this.colLayer = this.map.createLayer("col", this.tileset,0,0)

        this.colLayer.setCollisionByProperty({collides: true})

        const mcSpawn = this.map.findObject("spawn", (obj) => obj.name === "mcSpawn")


        // create boss
        this.mc = new MC(this, mcSpawn.x, mcSpawn.y, 'mc-sheet', 0)
        this.mc.anims.play('mc-idle')

        
        // colliders
        this.physics.add.collider(this.mc, this.colLayer)

        this.add.image(0,0,"TP").setOrigin(0)        // create ui for 

        //camera stuff
        console.log("mapwidth in pixels: ",this.map.widthInPixels)
        console.log("mapheight in pixels: ",this.map.heightInPixels)  
        this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.mc, true, 0.25, 0.25)
        this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)
    }

    update() {
        // get local KEYS reference
        const { KEYS } = this

        this.mcFSM.step()

    }
}