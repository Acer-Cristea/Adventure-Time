class Play extends Phaser.Scene {
    constructor() {
        super("scenePlay")
    }

    preload() {

    }

    create() {

        this.KEYS = this.scene.get("sceneKeys").KEYS

        this.music = this.sound.add("background_music", {loop: true, volume: 0.1})
        this.attack_sound = this.sound.add("attack-sfx", { volume: 0.1 })
        this.coin_sound1 = this.sound.add("coin-sfx1", { volume: 0.05 })
        this.coin_sound2 = this.sound.add("coin-sfx2", { volume: 0.05 })
        this.point_sound = this.sound.add("point", { volume: 0.15})
        this.hit_sound = this.sound.add("hit", { volume: 0.4})



        this.music.play()

        this.frogDistanceThreshold = 400 
        this.commandSequence = [] 
        this.expectedSequence = [            
            Phaser.Input.Keyboard.KeyCodes.UP,
            Phaser.Input.Keyboard.KeyCodes.DOWN,
            Phaser.Input.Keyboard.KeyCodes.LEFT,
            Phaser.Input.Keyboard.KeyCodes.LEFT,
            Phaser.Input.Keyboard.KeyCodes.RIGHT,
            Phaser.Input.Keyboard.KeyCodes.RIGHT,
            Phaser.Input.Keyboard.KeyCodes.DOWN,
            Phaser.Input.Keyboard.KeyCodes.D,
            Phaser.Input.Keyboard.KeyCodes.DOWN,
            Phaser.Input.Keyboard.KeyCodes.UP
        ] 
        this.commandIndex = 0 
 
        this.map = this.add.tilemap("Map")
        this.tileset = this.map.addTilesetImage("Base", "tilesetImage")
        this.bkgLayer = this.map.createLayer("bkg", this.tileset, 0 ,0)
        this.colLayer = this.map.createLayer("col", this.tileset,0,0)
        this.colLayer.setCollisionByProperty({collides: true})
        
        this.mcSpawn = this.map.findObject("spawn", (obj) => obj.name === "mcSpawn")
        this.mc = new MC(this, this.mcSpawn.x, this.mcSpawn.y, "mc-sheet", 0)
        this.mc.anims.play("mc-idle")

        this.checkpointSpawn = this.map.findObject("spawn", (obj) => obj.name === "checkpoint")
        this.checkpoint = this.physics.add.sprite(this.checkpointSpawn.x, this.checkpointSpawn.y, null)
        this.checkpoint.body.setAllowGravity(false)
        this.checkpoint.body.setImmovable(true)
        this.checkpoint.setVisible(false)

        this.lastCheckpoint = { x: 0, y: 0 }

        this.lastCheckpoint.x = this.mcSpawn.x
        this.lastCheckpoint.y = this.mcSpawn.y

        this.physics.add.overlap(this.mc, this.checkpoint, this.handleCheckpointCollision, null, this)

        this.beeSpawn = this.map.findObject("bee_spawn", (obj) => obj.name === "beeSpawn")
        this.bee = this.physics.add.sprite(this.beeSpawn.x,this.beeSpawn.y , "bee", 0)
        this.bee.setSize(200,200)
        this.bee.body.setImmovable(true)

        this.bunnySpawn = this.map.findObject("bunny_spawn", (obj) => obj.name === "bunnySpawn")
        this.bunny = this.physics.add.sprite(this.bunnySpawn.x,this.bunnySpawn.y , "bunny", 0)
        this.bunny.setSize(200,250)
        this.bunny.body.setImmovable(true)

        this.frogSpawn = this.map.findObject("frog_spawn", (obj) => obj.name === "frogSpawn")
        this.frog = this.physics.add.sprite(this.frogSpawn.x,this.frogSpawn.y , "frog", 0)
        this.frog.setSize(300,78)
        this.frog.body.setImmovable(true)        

        this.fireSpawn1 = this.map.findObject("fire_spawn", (obj) => obj.name === "fireSpawn1")
        this.fire1 = this.physics.add.sprite(this.fireSpawn1.x,this.fireSpawn1.y ,"fire")
        this.fire1.setImmovable(true)
        this.fire1.body.setCollideWorldBounds(true)
        this.fire1.anims.play("fire-idle")

        this.fireSpawn2 = this.map.findObject("fire_spawn", (obj) => obj.name === "fireSpawn2")
        this.fire2 = this.physics.add.sprite(this.fireSpawn2.x,this.fireSpawn2.y ,"smallFire")
        this.fire2.setImmovable(true)
        this.fire2.body.setCollideWorldBounds(true)
        this.fire2.anims.play("small-fire-idle")

        this.fireSpawn3 = this.map.findObject("fire_spawn", (obj) => obj.name === "fireSpawn3")
        this.fire3 = this.physics.add.sprite(this.fireSpawn3.x,this.fireSpawn3.y ,"smallFire")
        this.fire3.setImmovable(true)
        this.fire3.body.setCollideWorldBounds(true)
        this.fire3.anims.play("small-fire-idle")

        this.fireSpawn4 = this.map.findObject("fire_spawn", (obj) => obj.name === "fireSpawn4")
        this.fire4 = this.physics.add.sprite(this.fireSpawn4.x,this.fireSpawn4.y ,"fire")
        this.fire4.setImmovable(true)
        this.fire4.body.setCollideWorldBounds(true)
        this.fire4.anims.play("fire-idle")

        this.fireSpawn5 = this.map.findObject("fire_spawn", (obj) => obj.name === "fireSpawn5")
        this.fire5 = this.physics.add.sprite(this.fireSpawn5.x,this.fireSpawn5.y ,"fire")
        this.fire5.setImmovable(true)
        this.fire5.body.setCollideWorldBounds(true)
        this.fire5.anims.play("fire-idle")

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
        this.physics.add.collider(this.frog, this.colLayer)
        this.physics.add.collider(this.mc.bombHitbox, this.colLayer, this.handleLayerBomb, null, this)
        this.physics.add.collider(this.fire1, this.colLayer)
        this.physics.add.collider(this.fire2, this.colLayer)
        this.physics.add.collider(this.fire3, this.colLayer)
        this.physics.add.collider(this.fire4, this.colLayer)
        this.physics.add.collider(this.fire5, this.colLayer)

        this.physics.add.collider(this.mc, this.bee, this.handleCollision, null, this)
        this.physics.add.collider(this.mc, this.bunny, this.handleCollisionBunny, null, this)
        this.physics.add.collider(this.mc, this.frog)

        this.physics.add.collider(this.mc, this.fire1, this.handleCollisionF, null, this)
        this.physics.add.collider(this.mc, this.fire2, this.handleCollisionF, null, this)
        this.physics.add.collider(this.mc, this.fire3, this.handleCollisionF, null, this)
        this.physics.add.collider(this.mc, this.fire4, this.handleCollisionF, null, this)
        this.physics.add.collider(this.mc, this.fire5, this.handleCollisionF, null, this)

        this.physics.add.collider(this.mc, this.coin1, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin2, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin3, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin4, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin5, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin6, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin7, this.handleCollisionC, null, this)
        this.physics.add.collider(this.mc, this.coin8, this.handleCollisionC, null, this)

        this.physics.add.collider(this.mc.attackHitbox, this.bee, this.handleAttack, null, this)
        this.physics.add.overlap(this.mc.attackHitbox, this.bunny, this.handleAttackBunny, null, this)

        this.physics.add.collider(this.mc.bombHitbox, this.bee, this.handleBombBee, null, this)
        this.physics.add.collider(this.mc.bombHitbox, this.bunny, this.handleBombBunny, null, this)

        this.uiCamera = this.cameras.add(0, 0, 1600, 100)
        this.uiCamera.setScroll(0, 0) 
        
        this.uiCamera.ignore(this.bkgLayer)
        this.uiCamera.ignore(this.colLayer) 
        this.add.image(0, 0, "TB").setOrigin(0).setScrollFactor(0) 

        this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)
        this.cameras.main.startFollow(this.mc, true)
        this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels)
        this.score = 0

        this.life1 = this.add.image(375, 30, "life").setOrigin(0)
        this.life2 = this.add.image(275, 30, "life").setOrigin(0)
        this.life3 = this.add.image(175, 30, "life").setOrigin(0)
        this.bomb = this.add.image(1250, 20, "bomb").setOrigin(0)
        this.scoreText = this.add.bitmapText(650, 15, "PixelScore", ("SCORE: " + this.score), 60)
        this.scoreText.setScrollFactor(0)

        this.bunnyLife = true
        this.frogLife = true

        //WHY CAN"T YOU ROTATE A PHYSICS BODY IN PHASER EASILY. THAT MAKES NO SENSE

        this.laserPreview = this.add.graphics()

        this.previewlaserTimer = this.time.addEvent({
            delay: 500,
            loop: true, 
            callback: this.updateLaserPreview,
            callbackScope: this
        })

        this.laserTimer = this.time.addEvent({
            delay: 2000, 
            loop: true, 
            callback: this.shootLaser,
            callbackScope: this
        })

        this.input.keyboard.on("keydown", this.handleKeyDown, this)

    }

    update() {

        if (this.mc.x >= this.map.widthInPixels-70){
            this.music.stop()
            this.scene.start("sceneWinner")           
        }

        // get local KEYS reference
        const { KEYS } = this

        this.playerHeight = this.mc.y
        if (this.playerHeight < 1250) {
            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels-610)
        } else {
            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels-120)
        }

        this.distanceThreshold = 900
        this.distanceThreshold2 = 1000
        this.distanceBunny =  Phaser.Math.Distance.Between(this.mc.x,this.mc.y, this.bunny.x, this.bunny.y)
        const distanceBee = Phaser.Math.Distance.Between(this.mc.x,this.mc.y, this.bee.x, this.bee.y)

        
        if (this.bunnyLife) {
                this.previewlaserTimer
        } else {
            this.clearLaserPreview()
        }

        if (distanceBee <= this.distanceThreshold){
            if (this.bee.anims && !this.bee.anims.isPlaying) {
                this.bee.anims.play("bee-walk")

                if (this.mc.x <= this.bee.x) {
                    this.bee.resetFlip()
                    this.bee.setVelocityX(-50)
                }
                else if (this.mc.x > this.bee.x) {
                    this.bee.setFlip(true)
                    this.bee.setVelocityX(50)
                }
            }
        }
        this.mcFSM.step()
    }

    handleAttack(attackHitbox, bee){
        this.attack_sound.play()
        bee.destroy()
        this.score += 500
        this.scoreText.setText("SCORE: " + this.score)
        this.point_sound.play()
        const points = this.add.sprite(bee.x, bee.y, "points", 0)
        points.anims.play("points")
        points.once("animationcomplete", () => {
            points.destroy() 
        })
    }

    handleAttackBunny(attackHitbox, bunny){    
        this.attack_sound.play()
        bunny.destroy()
        this.bunnyLife = false
        this.score += 800
        this.scoreText.setText("SCORE: " + this.score)
        this.point_sound.play()
        const points = this.add.sprite(bunny.x, bunny.y, "points800", 0)
        points.anims.play("points800")
        points.once("animationcomplete", () => {
            points.destroy() 
        })
    }

    handleCollision(mc, bee){
        if (this.life1.visible){
            this.life1.setVisible(false)
            this.hit_sound.play()
        }else if (this.life2.visible){
            this.life2.setVisible(false)
            this.hit_sound.play()
        }else if (this.life3.visible){
            this.music.stop()
            this.scene.start("sceneDeath")        
        }
        mc.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y)    
        bee.setPosition(this.beeSpawn.x, this.beeSpawn.y)
        bee.setVelocityX(0)
    }

    handleCollisionBunny(mc, bunny){
        if (this.life1.visible){
            this.life1.setVisible(false)
            this.hit_sound.play()
        }else if (this.life2.visible){
            this.life2.setVisible(false)
            this.hit_sound.play()
        }else if (this.life3.visible){
            this.music.stop()
            this.scene.start("sceneDeath")        
        }
        mc.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y)    
        bunny.setPosition(this.bunnySpawn.x, this.bunnySpawn.y)
    }

    handleCollisionF(mc, fire){
        if (this.life1.visible){
            this.life1.setVisible(false)
            this.hit_sound.play()
        }else if (this.life2.visible){
            this.life2.setVisible(false)
            this.hit_sound.play()
        }else if (this.life3.visible){
            this.music.stop()
            this.scene.start("sceneDeath")        
        }
        mc.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y)    
    }

    handleCollisionC(mc, coin){
        this.coin_sound1.play()
        this.coin_sound2.play()
        coin.destroy()
        this.score += 31.25
        this.scoreText.setText("SCORE: " + this.score)

        const coinShine = this.add.sprite(coin.x, coin.y, "coin-shine", 0)
        coinShine.anims.play("coin")
        coinShine.once("animationcomplete", () => {
            coinShine.destroy() 
        })
    }

    handleBombBee(bomb, bee){
        bee.destroy()
        bomb.setVisible(false)
        bomb.setVelocityY(500)
        this.score += 500
        this.scoreText.setText("SCORE: " + this.score)
        this.point_sound.play()
        const points = this.add.sprite(bee.x, bee.y, "points", 0)
        points.anims.play("points")
        points.once("animationcomplete", () => {
            points.destroy() 
        })

    }

    handleBombBunny(bomb, bunny){
        bunny.destroy()
        this.bunnyLife = false
        bomb.setVisible(false)
        bomb.setVelocityY(500)
        this.score += 800
        this.scoreText.setText("SCORE: " + this.score)
        this.point_sound.play()
        const points = this.add.sprite(bunny.x, bunny.y, "points800", 0)
        points.anims.play("points800")
        points.once("animationcomplete", () => {
            points.destroy() 
        })
    }

    handleLayerBomb(bombT, colLayer){
        bombT.setVisible(false)
        this.bomb.setVisible(false)
    }

    shootLaser() {
        if (this.bunnyLife){
            if ((this.distanceBunny <= this.distanceThreshold) && (this.distanceBunny > 300)){

                const angle = Phaser.Math.Angle.Between(this.bunny.x, this.bunny.y, this.mc.x, this.mc.y+80)
                const laser = this.physics.add.sprite(this.bunny.x-80, this.bunny.y-80, "laser")

                laser.setSize(50,1)
                laser.body.setAllowGravity(false)
                laser.body.setImmovable(true)
                const speed = 800 // Adjust the speed as needed
                laser.setVelocityX(speed * Math.cos(angle))
                laser.setVelocityY(speed * Math.sin(angle))
                //laser.rotation = angle            

                this.physics.add.collider(this.mc, laser, this.handleLaserCollision, null, this)
            }
        }
        else{
            return
        }
    }
    

    handleLaserCollision(mc, laser) {
        mc.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y)   
        laser.destroy() 
        if (this.life1.visible){
            this.life1.setVisible(false)
            this.hit_sound.play()
        }else if (this.life2.visible){
            this.life2.setVisible(false)

        
        this.hit_sound.play()}else if (this.life3.visible){
            this.music.stop()
            this.scene.start("sceneDeath")        
        }
    }


    
    updateLaserPreview() {
        this.laserPreview.clear()
        if ((this.distanceBunny <= this.distanceThreshold2) && (this.distanceBunny > 300)){
            const angle = Phaser.Math.Angle.Between(this.bunny.x, this.bunny.y, this.mc.x, this.mc.y)
            const distance = Phaser.Math.Distance.Between(this.bunny.x, this.bunny.y, this.mc.x, this.mc.y)

            this.laserPreview.lineStyle(3, 0xffffff)

            const endPointX = this.bunny.x + distance * Math.cos(angle)
            const endPointY = this.bunny.y + distance * Math.sin(angle)

            this.laserPreview.lineBetween(this.bunny.x-80, this.bunny.y-80, endPointX, endPointY)
        }
    }

    clearLaserPreview() {
        this.laserPreview.clear()
    }

    handleCheckpointCollision(mc, checkpoint) {
        this.lastCheckpoint.x = checkpoint.x
        this.lastCheckpoint.y = checkpoint.y
    }
        
    handleKeyDown(event) {
        const keyCode = event.keyCode
        this.handleKeyPress(keyCode)
    }


    handleKeyDown(key) {
        if (this.frogLife) {

            const distanceToFrog = Phaser.Math.Distance.Between(this.mc.x, this.mc.y, this.frog.x, this.frog.y)
                
            if (distanceToFrog <= this.frogDistanceThreshold) {

                const nextExpectedCommand = this.expectedSequence[this.commandIndex]

                if (key.keyCode === nextExpectedCommand) {

                    this.commandIndex++

                    if (this.commandIndex === this.expectedSequence.length) {
                        this.frog.destroy()
                        this.frogLife = false
                        this.resetCommandSequence()
                    }
                } else {

                    this.mc.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y)   

                    this.resetCommandSequence()

                    if (this.life1.visible){
                        this.life1.setVisible(false)
                        this.hit_sound.play()
                    }else if (this.life2.visible){
                        this.life2.setVisible(false)
            
        
        this.hit_sound.play()            }else if (this.life3.visible){
                        this.music.stop()
                        this.scene.start("sceneDeath")        
                    }
                    
                }
            }
        }
    }

    resetCommandSequence() {
        this.commandSequence = []
        this.commandIndex = 0
    }
}



 


