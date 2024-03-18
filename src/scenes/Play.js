class Play extends Phaser.Scene {
    constructor() {
        super('scenePlay')
    }

    preload() {

    }

    create() {
        this.music = this.sound.add("background_music", {loop: true, volume: 0.1})
        this.attack_sound = this.sound.add('attack-sfx', { volume: 0.1 })
        this.coin_sound1 = this.sound.add('coin-sfx1', { volume: 0.05 })
        this.coin_sound2 = this.sound.add('coin-sfx2', { volume: 0.05 })
        this.coin_sound3 = this.sound.add('coin-sfx3', { volume: 0.05 })


        this.music.play()
        //console.log('Play: create')

        // grab keyboard binding from Keys scene
        this.KEYS = this.scene.get('sceneKeys').KEYS

        this.map = this.add.tilemap('Map') //create tilemap
        this.tileset = this.map.addTilesetImage("Base", "tilesetImage")
        this.bkgLayer = this.map.createLayer("bkg", this.tileset, 0 ,0)
        this.colLayer = this.map.createLayer("col", this.tileset,0,0)
        this.colLayer.setCollisionByProperty({collides: true})
        
        // create mc        
        this.mcSpawn = this.map.findObject("spawn", (obj) => obj.name === "mcSpawn")
        this.mc = new MC(this, this.mcSpawn.x, this.mcSpawn.y, "mc-sheet", 0)
        this.mc.anims.play("mc-idle")

        // add lives by creating three assets, then saying if life one visible when the it occurs set false, else if live 2 visible set to false, else if life 3...
        //create bee
        this.beeSpawn = this.map.findObject("bee_spawn", (obj) => obj.name === "beeSpawn")
        this.bee = this.physics.add.sprite(this.beeSpawn.x,this.beeSpawn.y , "bee", 0)
        this.bee.setSize(200,200)
        this.bee.body.setImmovable(true)

        this.bunnySpawn = this.map.findObject("bunny_spawn", (obj) => obj.name === "bunnySpawn")
        this.bunny = this.physics.add.sprite(this.bunnySpawn.x,this.bunnySpawn.y , "bunny", 0)
        this.bunny.setSize(250,250)
        this.bunny.body.setImmovable(true)

        this.fireSpawn1 = this.map.findObject("fire_spawn", (obj) => obj.name === "fireSpawn1")
        this.fire = this.physics.add.sprite(this.fireSpawn1.x,this.fireSpawn1.y ,"fire")
        this.fire.setImmovable(true)
        this.fire.body.setCollideWorldBounds(true)
        this.fire.anims.play("fire-idle")

        this.fireSpawn2 = this.map.findObject("fire_spawn", (obj) => obj.name === "fireSpawn2")
        this.fire = this.physics.add.sprite(this.fireSpawn2.x,this.fireSpawn2.y ,"smallFire")
        this.fire.setImmovable(true)
        this.fire.body.setCollideWorldBounds(true)
        this.fire.anims.play("small-fire-idle")

        this.fireSpawn3 = this.map.findObject("fire_spawn", (obj) => obj.name === "fireSpawn3")
        this.fire = this.physics.add.sprite(this.fireSpawn3.x,this.fireSpawn3.y ,"smallFire")
        this.fire.setImmovable(true)
        this.fire.body.setCollideWorldBounds(true)
        this.fire.anims.play("small-fire-idle")

        this.coinSpawn1 = this.map.findObject("coin_spawn", (obj) => obj.name === "coinSpawn1")
        this.coin1 = this.physics.add.sprite(this.coinSpawn1.x,this.coinSpawn1.y ,"coin")
        this.coin1.setImmovable(true)
        this.coin1.body.setAllowGravity(false)   

        this.coinSpawn2 = this.map.findObject("coin_spawn", (obj) => obj.name === "coinSpawn2")
        this.coin2 = this.physics.add.sprite(this.coinSpawn2.x,this.coinSpawn2.y ,"coin")
        this.coin2.setImmovable(true)
        this.coin2.body.setAllowGravity(false)  

        this.coinSpawn3 = this.map.findObject("coin_spawn", (obj) => obj.name === "coinSpawn3")
        this.coin3 = this.physics.add.sprite(this.coinSpawn3.x,this.coinSpawn3.y ,"coin")
        this.coin3.setImmovable(true)
        this.coin3.body.setAllowGravity(false)  

        this.coinSpawn4 = this.map.findObject("coin_spawn", (obj) => obj.name === "coinSpawn4")
        this.coin4 = this.physics.add.sprite(this.coinSpawn4.x,this.coinSpawn4.y ,"coin")
        this.coin4.setImmovable(true)
        this.coin4.body.setAllowGravity(false)  

        this.coinSpawn5 = this.map.findObject("coin_spawn", (obj) => obj.name === "coinSpawn5")
        this.coin5 = this.physics.add.sprite(this.coinSpawn5.x,this.coinSpawn5.y ,"coin")
        this.coin5.setImmovable(true)
        this.coin5.body.setAllowGravity(false)  

        this.coinSpawn6 = this.map.findObject("coin_spawn", (obj) => obj.name === "coinSpawn6")
        this.coin6 = this.physics.add.sprite(this.coinSpawn6.x,this.coinSpawn6.y ,"coin")
        this.coin6.setImmovable(true)
        this.coin6.body.setAllowGravity(false)  

        this.coinSpawn7 = this.map.findObject("coin_spawn", (obj) => obj.name === "coinSpawn7")
        this.coin7 = this.physics.add.sprite(this.coinSpawn7.x,this.coinSpawn7.y ,"coin")
        this.coin7.setImmovable(true)
        this.coin7.body.setAllowGravity(false)  

        this.coinSpawn8 = this.map.findObject("coin_spawn", (obj) => obj.name === "coinSpawn8")
        this.coin8 = this.physics.add.sprite(this.coinSpawn8.x,this.coinSpawn8.y ,"coin")
        this.coin8.setImmovable(true)
        this.coin8.body.setAllowGravity(false)  


        this.physics.add.collider(this.mc, this.colLayer)
        this.physics.add.collider(this.bee, this.colLayer)
        this.physics.add.collider(this.bunny, this.colLayer)
        this.physics.add.collider(this.mc, this.bee, this.handleCollision, null, this)
        this.physics.add.collider(this.mc, this.bunny, this.handleCollisionBunny, null, this)
        this.physics.add.collider(this.mc, this.fire, this.handleCollisionF, null, this)
        this.physics.add.collider(this.mc, this.coin1, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin2, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin3, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin4, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin5, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin6, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin7, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin8, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc.attackHitbox, this.bee, this.handleAttack, null, this)
        this.physics.add.collider(this.mc.attackHitbox, this.bunny, this.handleAttackBunny, null, this)
        this.physics.add.collider(this.mc.bombHitbox, this.colLayer, this.handleLayerBomb, null, this)
        this.physics.add.collider(this.mc.bombHitbox, this.bee, this.handleBombBee, null, this)
        this.physics.add.collider(this.mc.bombHitbox, this.bunny, this.handleBombBunny, null, this)


        this.uiCamera = this.cameras.add(0, 0, 1600, 100)
        this.uiCamera.setScroll(0, 0) // Position the UI camera at the top-left corner of the game window
        
        this.uiCamera.ignore(this.bkgLayer)
        this.uiCamera.ignore(this.colLayer) // Ignore collision layer so UI elements are not obscured
        this.add.image(0, 0, "TB").setOrigin(0).setScrollFactor(0) // Render TP image at the top-left corner of the UI camera viewport

        //camera stuff
        //console.log("mapwidth in pixels: ",this.map.widthInPixels)
        //console.log("mapheight in pixels: ",this.map.heightInPixels)  
        this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.mc, true)
        this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)
        this.score = 0

        this.life1 = this.add.image(375, 30, "life").setOrigin(0)
        this.life2 = this.add.image(275, 30, "life").setOrigin(0)
        this.life3 = this.add.image(175, 30, "life").setOrigin(0)


        this.bomb = this.add.image(1250, 20, "bomb").setOrigin(0)


        this.scoreText = this.add.bitmapText(650, 15, "PixelScore", ('SCORE: ' + this.score), 60)
        

        this.scoreText.setScrollFactor(0)
        this.count = 0



    }

    update() {

        // get local KEYS reference
        const { KEYS } = this


        const distanceThreshold = 800
        const distance = Phaser.Math.Distance.Between(this.mc.x,this.mc.y, this.bee.x, this.bee.y)

        //console.log("distance: ", distance)
            if (distance <= distanceThreshold){
                //check  to see if bee.anims exists
                if (this.bee.anims && !this.bee.anims.isPlaying) {
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
        

        this.mcFSM.step()



    }

    handleAttack(attackHitbox, bee){
        //console.log("Bee destroyed")
        //this.physics.world.removeCollider(this.bee.body.collider, this.colLayer)
        this.attack_sound.play()
        bee.destroy()

        this.score += 500

        this.scoreText.setText('SCORE: ' + this.score)
    }

    handleAttackBunny(attackHitbox, bunny){
        this.count += 0.2
        

        console.log(this.count)
        if (this.count > 0 && this.count == 0.2) {
            this.attack_sound.play()

        }
        
        if (this.count >= 2) {
            this.attack_sound.play()
            bunny.destroy()

            
        this.score += 800

        this.scoreText.setText('SCORE: ' + this.score)

        this.count = 0
        }

    }

    handleCollision(mc, bee){

        if (this.life1.visible){
            this.life1.setVisible(false)
        }else if (this.life2.visible){
            this.life2.setVisible(false)

        }else if (this.life3.visible){
            this.music.stop()
            this.scene.start('sceneDeath')        
        }



        mc.setPosition(this.mcSpawn.x, this.mcSpawn.y)    
        bee.setPosition(this.beeSpawn.x, this.beeSpawn.y)
        bee.setVelocityX(0)
    }

    handleCollisionBunny(mc, bunny){

        if (this.life1.visible){
            this.life1.setVisible(false)
        }else if (this.life2.visible){
            this.life2.setVisible(false)

        }else if (this.life3.visible){
            this.music.stop()
            this.scene.start('sceneDeath')        
        }



        mc.setPosition(this.mcSpawn.x, this.mcSpawn.y)    
        bunny.setPosition(this.bunnySpawn.x, this.bunnySpawn.y)
    }

    handleCollisionF(mc, fire){

        if (this.life1.visible){
            this.life1.setVisible(false)
        }else if (this.life2.visible){
            this.life2.setVisible(false)

        }else if (this.life3.visible){
            this.music.stop()
            this.scene.start('sceneDeath')        
        }

        mc.setPosition(this.mcSpawn.x, this.mcSpawn.y)    
    }

    handleCollisionC(mc, coin){
        this.coin_sound1.play()
        this.coin_sound2.play()
        //this.coin_sound3.play()
        


        coin.destroy()
        this.score += 31.25

        this.scoreText.setText('SCORE: ' + this.score)
    }

    handleBombBee(bomb, bee){
        bee.destroy()
        bomb.setVisible(false)
        bomb.setVelocityY(500)


        this.score += 500

        this.scoreText.setText('SCORE: ' + this.score)
    }

    handleBombBunny(bomb, bunny){
        bunny.destroy()
        bomb.setVisible(false)
        bomb.setVelocityY(500)


        this.score += 800

        this.scoreText.setText('SCORE: ' + this.score)
    }

    handleLayerBomb(bombT, colLayer){
        bombT.setVisible(false)
        this.bomb.setVisible(false)
    }



}