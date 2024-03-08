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
        this.bkgLayer = this.map.createLayer("bkg", this.tileset, 400 ,200)
        this.colLayer = this.map.createLayer("col", this.tileset,0,0)

        this.colLayer.setCollisionByProperty({collides: true})

        const mcSpawn = this.map.findObject("spawn", (obj) => obj.name === "mcSpawn")


        // create mc
        this.mc = new MC(this, mcSpawn.x, mcSpawn.y, "mc-sheet", 0)
        this.mc.anims.play("mc-idle")
        
        this.attackHitbox = this.physics.add.sprite(this.mc.x, this.mc.y, null)
        this.attackHitbox.setSize(10,10)
        this.attackHitbox.body.setAllowGravity(false)
        this.attackHitbox.setVisible(false)


        //create bee

        const beeSpawn = this.map.findObject("bee_spawn", (obj) => obj.name === "beeSpawn")

        this.bee = this.physics.add.sprite(beeSpawn.x,beeSpawn.y , "bee", 0)
        this.bee.setSize(200,200)
        //this.bee.anims.play("bee-walk")

        // colliders
        this.physics.add.collider(this.mc, this.colLayer)

        this.physics.add.collider(this.bee, this.colLayer)

        this.physics.add.collider(this.attackHitbox, this.colLayer)


        //this.physics.add.overlap(this.mc, this.bee, this.attackBee, null, this)

        this.uiCamera = this.cameras.add(0, 0, 1600, 100)
        this.uiCamera.setScroll(0, 0) // Position the UI camera at the top-left corner of the game window
        
        this.uiCamera.ignore(this.bkgLayer)
        this.uiCamera.ignore(this.colLayer) // Ignore collision layer so UI elements are not obscured
        this.add.image(0, 0, "TB").setOrigin(0).setScrollFactor(0) // Render TP image at the top-left corner of the UI camera viewport

        //camera stuff
        console.log("mapwidth in pixels: ",this.map.widthInPixels)
        console.log("mapheight in pixels: ",this.map.heightInPixels)  
        this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.mc, true)
        this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)
        this.scoreText = this.add.text(650, 25, 'Score: 0', { fontSize: '50px', fill: '#ffffff' })
        this.scoreText.setScrollFactor(0)

        //add in lives, swing animation, create a hitbox on swing
        //

    }

    update() {



        const distanceThreshold = 400
        const distance = Phaser.Math.Distance.Between(this.mc.x,this.mc.y, this.bee.x, this.bee.y)

        //console.log("distance: ", distance)
        if (distance <= distanceThreshold){


            if (!this.bee.anims.isPlaying) {
                // Start playing the bee animation
                this.bee.anims.play("bee-walk")

                if (this.mc.x <= this.bee.x) {
                    this.bee.resetFlip()
                    this.bee.setVelocityX(-50)
                }
                else if (this.mc.x > this.bee.x) {

                    //this.bee.anims.play("bee-walk")
                    this.bee.setFlip(true)
                    this.bee.setVelocityX(50)
                }
            }
        }
        this.attackHitbox.setPosition(this.mc.x, this.mc.y)
        // get local KEYS reference
        const { KEYS } = this

        this.mcFSM.step()


        //console.log('Player position:', this.mc.x, this.mc.y);
        //console.log('Camera position:', this.cameras.main.scrollX, this.cameras.main.scrollY);
    

    }
}