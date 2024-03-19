class Play extends Phaser.Scene {
    constructor() {
        super('scenePlay')

        this.frogDistanceThreshold = 400; // Set the distance threshold to trigger the command sequence
        this.commandSequence = []; // Array to store the expected command sequence
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
        ] // Expected command sequence
        this.commandIndex = 0; // Index to track the current position in the command sequence
    }

    preload() {

    }

    create() {

        this.KEYS = this.scene.get('sceneKeys').KEYS

        this.music = this.sound.add("background_music", {loop: true, volume: 0.1})
        this.attack_sound = this.sound.add('attack-sfx', { volume: 0.1 })
        this.coin_sound1 = this.sound.add('coin-sfx1', { volume: 0.05 })
        this.coin_sound2 = this.sound.add('coin-sfx2', { volume: 0.05 })
        this.coin_sound3 = this.sound.add('coin-sfx3', { volume: 0.05 })


        //this.music.play()
        //console.log('Play: create')


        this.map = this.add.tilemap('Map') //create tilemap
        this.tileset = this.map.addTilesetImage("Base", "tilesetImage")
        this.bkgLayer = this.map.createLayer("bkg", this.tileset, 0 ,0)
        this.colLayer = this.map.createLayer("col", this.tileset,0,0)
        this.colLayer.setCollisionByProperty({collides: true})
        
        // create mc        
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


        // add lives by creating three assets, then saying if life one visible when the it occurs set false, else if live 2 visible set to false, else if life 3...
        //create bee
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

        this.bunnyLife = true

        this.frogLife = true


        this.bomb = this.add.image(1250, 20, "bomb").setOrigin(0)


        this.scoreText = this.add.bitmapText(650, 15, "PixelScore", ('SCORE: ' + this.score), 60)
        

        this.scoreText.setScrollFactor(0)

        //WHY CAN"T YOU ROTATE A PHYSICS BODY IN PHASER EASILY. THAT MAKES NO SENSE

        // Create a timer event to shoot a laser every second
        this.previewlaserTimer = this.time.addEvent({
            delay: 500, // 1000 milliseconds = 1 second
            loop: true, // Repeat indefinitely
            callback: this.updateLaserPreview,
            callbackScope: this
        })

        this.laserPreview = this.add.graphics()


        // Create a timer event to shoot a laser every second
        this.laserTimer = this.time.addEvent({
            delay: 2000, // 1000 milliseconds = 1 second
            loop: true, // Repeat indefinitely
            callback: this.shootLaser,
            callbackScope: this
        })

        this.input.keyboard.on('keydown', this.handleKeyDown, this);



    }

    update() {

        console.log(this.map.widthInPixels)
        console.log(this.mc.x)
        if (this.mc.x >= this.map.widthInPixels-70){
            this.scene.start('sceneWinner')           
        }

        // get local KEYS reference
        const { KEYS } = this

            // Calculate the current height of the player
        this.playerHeight = this.mc.y
        //console.log(this.playerHeight)
        // Check if the player has reached the point where you want to change the camera height
        if (this.playerHeight < 1050) { // Replace HEIGHT_THRESHOLD with the desired height
            // Update the camera bounds to cover the entire map vertically
            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels-610)
        } else {
            // Update the camera bounds to only cover a certain height

            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels-120)
        }

        this.distanceThreshold = 900
        this.distanceThreshold2 = 1000
        this.distanceBunny =  Phaser.Math.Distance.Between(this.mc.x,this.mc.y, this.bunny.x, this.bunny.y)
        
        // Update the laser preview
        if (this.bunnyLife) {
                this.previewlaserTimer

        } else {
            // Clear or hide the laser preview when the bunny dies
            this.clearLaserPreview()
        }



        const distanceBee = Phaser.Math.Distance.Between(this.mc.x,this.mc.y, this.bee.x, this.bee.y)

        //console.log("distance: ", distance)
            if (distanceBee <= this.distanceThreshold){
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
        this.attack_sound.play()
        bee.destroy()

        this.score += 500

        this.scoreText.setText('SCORE: ' + this.score)
    }

    handleAttackBunny(attackHitbox, bunny){

        //console.log("BUNNY ATTACKED")
    
        this.attack_sound.play()
        bunny.destroy()
        this.bunnyLife = false

        this.score += 800

        this.scoreText.setText('SCORE: ' + this.score)
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



        mc.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y)    
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



        mc.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y)    
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

        mc.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y)    
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
        this.bunnyLife = false
        bomb.setVisible(false)
        bomb.setVelocityY(500)


        this.score += 800

        this.scoreText.setText('SCORE: ' + this.score)
    }

    handleLayerBomb(bombT, colLayer){
        bombT.setVisible(false)
        this.bomb.setVisible(false)
    }

    shootLaser() {
        // Create a laser sprite at the bunny's position

        if (this.bunnyLife){

            //console.log(this.distanceBunny)

            if ((this.distanceBunny <= this.distanceThreshold) && (this.distanceBunny > 300)){

                const angle = Phaser.Math.Angle.Between(this.bunny.x, this.bunny.y, this.mc.x, this.mc.y+80)

                const laser = this.physics.add.sprite(this.bunny.x-80, this.bunny.y-80, 'laser')
                laser.setSize(50,1)
                // laser.setCircle(6)
                // laser.body.setOffset(6)
                laser.body.setAllowGravity(false)
                laser.body.setImmovable(true)

                // Set velocity based on angle towards the player
                const speed = 800 // Adjust the speed as needed
                laser.setVelocityX(speed * Math.cos(angle))
                laser.setVelocityY(speed * Math.sin(angle))

                //laser.rotation = angle


            
                // Check collision between the laser and the player
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
        }else if (this.life2.visible){
            this.life2.setVisible(false)

        }else if (this.life3.visible){
            this.music.stop()
            this.scene.start('sceneDeath')        
        }


    }


    
    updateLaserPreview() {
        // Clear the previous preview
        this.laserPreview.clear()

        if ((this.distanceBunny <= this.distanceThreshold2) && (this.distanceBunny > 300)){

        

            // Draw a line from the bunny's position to the player's position
            const angle = Phaser.Math.Angle.Between(this.bunny.x, this.bunny.y, this.mc.x, this.mc.y);
            const distance = Phaser.Math.Distance.Between(this.bunny.x, this.bunny.y, this.mc.x, this.mc.y);

            // Set the line style
            this.laserPreview.lineStyle(3, 0xffffff);

            // Calculate the endpoint of the line
            const endPointX = this.bunny.x + distance * Math.cos(angle);
            const endPointY = this.bunny.y + distance * Math.sin(angle);

            // Draw the line
            this.laserPreview.lineBetween(this.bunny.x-80, this.bunny.y-80, endPointX, endPointY)
        }
    }

    clearLaserPreview() {
        // Clear the laser preview
        this.laserPreview.clear()
    }

    handleCheckpointCollision(mc, checkpoint) {
        // Update the lastCheckpoint position to the checkpoint position
        this.lastCheckpoint.x = checkpoint.x
        this.lastCheckpoint.y = checkpoint.y

        // You can add visual/audio feedback here if needed
    }
        
    handleKeyDown(event) {
        // Get the keycode of the pressed key
        const keyCode = event.keyCode;
    
        // Call the method to handle the key press
        this.handleKeyPress(keyCode);
    }


    handleKeyDown(key) {
        // Check if the player is within the distance threshold to the frog

        if (this.frogLife) {
            const distanceToFrog = Phaser.Math.Distance.Between(this.mc.x, this.mc.y, this.frog.x, this.frog.y);
                
            if (distanceToFrog <= this.frogDistanceThreshold) {
                // Player is within the distance threshold, proceed with handling the combo sequence
                const nextExpectedCommand = this.expectedSequence[this.commandIndex]
                //console.log("nextExpectedCommand", nextExpectedCommand)

                //console.log("key: ", key.keyCode)
                    
                // Check if the pressed key matches the expected command
                if (key.keyCode === nextExpectedCommand) {
                    // Player pressed the expected command, move to the next command
                    this.commandIndex++;

                    // Check if the combo sequence is complete
                    if (this.commandIndex === this.expectedSequence.length) {
                        // Combo sequence is complete, perform the desired action
                        //console.log('Combo sequence complete!');
                        // Reset the command sequence
                        this.frog.destroy()
                        this.frogLife = false
                        this.resetCommandSequence()
                    }
                } else {
                    // Player pressed the wrong command, reset the sequence

                    this.mc.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y)   

                    this.resetCommandSequence()

                    if (this.life1.visible){
                        this.life1.setVisible(false)
                    }else if (this.life2.visible){
                        this.life2.setVisible(false)
            
                    }else if (this.life3.visible){
                        this.music.stop()
                        this.scene.start('sceneDeath')        
                    }
                    
                }
            }
        }
    }

    resetCommandSequence() {
        // Reset the command sequence
        this.commandSequence = [];
        this.commandIndex = 0;
    }
}



 


