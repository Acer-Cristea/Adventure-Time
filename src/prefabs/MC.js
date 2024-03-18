class MC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, texture, frame = 0) {
        // invoke parent class and add to display list/physics world
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // define custom properties
        this.WALK_VELOCITY = 250
        this.JUMP_VELOCITY = -450
        //maybe you get a boost in the x direction too?
        //add acceleration for jumping maybe
        this.DRAG = 350
        //console.log("this.width", this.width)
        //console.log("this.height", this.height)
        //adjust the body size so if fits the character, have to adjust the spritesheet, needs to be perfect
        this.body.setCollideWorldBounds(true)
        
        this.body.setDragX(this.DRAG)

        // Create the attack hitbox sprite
        this.attackHitbox = scene.physics.add.sprite(10, 10, null)
        this.attackHitbox.setSize(10, 10);
        this.attackHitbox.body.setAllowGravity(false)
        this.attackHitbox.setVisible(false)

        this.bombHitbox = scene.physics.add.sprite(1250, 35, "bomb")
        this.bombHitbox.setSize(40, 40)
        this.bombHitbox.setOffset(0, 20)
        this.bombHitbox.body.setAllowGravity(false)
        this.bombHitbox.body.setCollideWorldBounds(true)


        this.walkSound = scene.sound.add('walk-sfx', { volume: 0.05 })

        
        // initialize state machine
        scene.mcFSM = new StateMachine('idle', {
            idle: new IdleState(),
            walk: new WalkState(),
            jump: new JumpState(),
            attack: new AttackState(),
            bomb: new BombState(),
        }, [scene, this])
    }
}

// mc-specific state classes
class IdleState extends State {

    enter(scene, mc) {

        mc.attackHitbox.setPosition(10, 10)


        if (mc.flipX){
            mc.body.setSize(45, mc.height, true)
            mc.body.setOffset(15,0)         
        }
        if (!mc.flipX){
            mc.body.setSize(45, mc.height, true)
            mc.body.setOffset(20,0)         
        }      

        //console.log('IdleState: enter')
    }


    execute(scene, mc) {




        const { KEYS } = scene
        const grounded = mc.body.velocity.y == 0

        
        if(mc.body.velocity.x == 0 && !mc.anims.isPlaying) {
            mc.anims.play('mc-idle');
        }

        // jump
        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP) && grounded) {
            this.stateMachine.transition('jump')
        }

        // attack
        if(Phaser.Input.Keyboard.JustDown(KEYS.ATTACK) && grounded) {
            this.stateMachine.transition('attack')
        }

        // bomb_attack
        if(Phaser.Input.Keyboard.JustDown(KEYS.BOMB) && grounded) {
            this.stateMachine.transition('bomb')
        }

        // left/right to move
        if(KEYS.LEFT.isDown || KEYS.RIGHT.isDown) {
            this.stateMachine.transition('walk')
            return
        }
    }
}
//add a walking sound effect
class WalkState extends State {
    enter(scene, mc) {
        //console.log('WalkState: enter')
        mc.attackHitbox.setPosition(10, 10)

        mc.anims.play('mc-walk')

        
    }

    execute(scene, mc) {


        const { KEYS } = scene
        const grounded = mc.body.velocity.y == 0

        if (!this.hasPlayedSound && scene.time.now % 500 < 250) {
            mc.walkSound.play()
            this.hasPlayedSound = true
        } else if (this.hasPlayedSound && scene.time.now % 500 >= 250) {
            // Stop the sound if it has been played and the interval has passed
            mc.walkSound.stop()
            this.hasPlayedSound = false
        }

        // jump
        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP) && grounded) {
            mc.anims.stop("mc-walk")
            //mc.walkSound.stop()
            this.stateMachine.transition('jump')
        }

        // attack
        if(Phaser.Input.Keyboard.JustDown(KEYS.ATTACK) && grounded) {
           // mc.walkSound.stop()
            this.stateMachine.transition('attack')
        }

        // bomb_attack
        if(Phaser.Input.Keyboard.JustDown(KEYS.BOMB) && grounded) {
            this.stateMachine.transition('bomb')
        }

        // back to idle
        if( (!( KEYS.LEFT.isDown || KEYS.RIGHT.isDown ) && mc.body.velocity.x == 0) ) {
            mc.anims.stop("mc-walk")

            //mc.walkSound.stop()
            this.stateMachine.transition('idle')
        }

        

        // handle left/right movement
        if(KEYS.LEFT.isDown) {
            //console.log("testing left")
            mc.setFlip(true)
            mc.body.setSize(40, mc.height, false)
            mc.body.setOffset(15,0)
            mc.body.setVelocityX(-mc.WALK_VELOCITY)
        }
        if(KEYS.RIGHT.isDown) {
            mc.resetFlip()
            mc.body.setSize(40, mc.height, false)
            mc.body.setOffset(60,0)
            //console.log("testing right")
            mc.body.setVelocityX(mc.WALK_VELOCITY)
        }
    }
}
//buuuoh sound effect when jumping
class JumpState extends State {
    enter(scene, mc) {

        //mc.walkSound.stop()
        mc.anims.play('mc-jump')
        mc.body.setVelocityY(mc.JUMP_VELOCITY)
        mc.body.setSize(mc.width-60, mc.height/2+40, false)
        mc.body.setOffset(30,10)

        // play sfx
        const sound1 = scene.sound.add('jump-sfx1', { volume: 0.1 })
        sound1.on('complete', () => {
            // Add a delay before playing the second sound effect
            setTimeout(() => {
                // Play the second sound effect after the delay
                const sound2 = scene.sound.add('jump-sfx2', { volume: 0.1 })
                sound2.on('complete', () => {
                    // Transition to the next state when the second sound finishes
                    this.stateMachine.transition('idle');
                });
                sound2.play()
            }, 600) // Adjust the delay time (in milliseconds) as needed
        })
        sound1.play()
    }

    execute(scene, mc) {
        const { KEYS } = scene


        //let grounded = mc.body.touching.down || mc.body.blocked.down
        let grounded = mc.body.velocity.y == 0
        // end jump


        // handle movement
        if(KEYS.LEFT.isDown) {
            mc.body.setSize(mc.width-60, mc.height/2+40, false)
            mc.body.setOffset(30,10)
            mc.setFlip(true)
            mc.body.setVelocityX(-mc.WALK_VELOCITY)  // slower speed in air, maybe don't we'll see
        }

        else if(KEYS.RIGHT.isDown) {
            mc.body.setSize(mc.width-60, mc.height/2+40, false)
            mc.body.setOffset(30,10)
            mc.resetFlip()
            mc.body.setVelocityX(mc.WALK_VELOCITY)
        }

        if(grounded) {
            this.stateMachine.transition('idle')
        }
    }
}

class AttackState extends State {
    enter(scene, mc) {
        //fix flipping issue
        //console.log("In AttackState")
        const sound = scene.sound.add('attack-sfx1', { volume: 0.05 })
        sound.play()


        mc.anims.play('mc-attack')
        mc.body.setVelocityY(mc.JUMP_VELOCITY)

        mc.body.setSize(mc.width-60, mc.height/2+40, false)
        mc.body.setOffset(30,10)

        // mc.testHitbox = scene.physics.add.sprite(mc.x, mc.y, null)
        // mc.testHitbox.setSize(100, 100);
        // mc.testHitbox.body.setAllowGravity(false)
        // mc.testHitbox.setVisible(false)
         
    }

    execute(scene, mc) {
        const { KEYS } = scene

        if (mc.flipX){
            mc.attackHitbox.setPosition(mc.x-60, mc.y)  
        }
        if (!mc.flipX){
            mc.attackHitbox.setPosition(mc.x+60, mc.y)

        }


        let grounded = mc.body.velocity.y == 0
        // end jump
        if(grounded) {
            this.stateMachine.transition('idle')
        }

        // handle movement
        if(KEYS.LEFT.isDown) {
            
            mc.attackHitbox.setPosition(mc.x-60, mc.y)
            mc.body.setSize(mc.width-60, mc.height/2+40, false)
            mc.body.setOffset(30,10) //adjust later
            mc.setFlip(true)
            mc.body.setVelocityX(-mc.WALK_VELOCITY)  
        }

        if(KEYS.RIGHT.isDown) {
            mc.attackHitbox.setPosition(mc.x+60, mc.y)
            mc.body.setSize(mc.width-60, mc.height/2+40, false)
            mc.body.setOffset(30,10)
            mc.resetFlip()
            mc.body.setVelocityX(mc.WALK_VELOCITY)
        }
    }
}

class BombState extends State {
    enter(scene, mc) {
        //fix flipping issue
        //console.log("In AttackState")

        mc.anims.play('mc-bomb')

        if (mc.bombHitbox.body.enable){

            mc.bombHitbox.body.setAllowGravity(true)

            mc.bombHitbox.setPosition(mc.x, mc.y-80)

            if (mc.flipX){       
                mc.bombHitbox.setVelocityX(-500)
                mc.bombHitbox.setVelocityY(-300)

            }

            if (!mc.flipX){    
                mc.bombHitbox.setVelocityX(500)
                mc.bombHitbox.setVelocityY(-300)

            }
        }

        else{
            this.stateMachine.transition("idle")
        }



         
    }

    execute(scene, mc) {
        const { KEYS } = scene
        mc.body.setSize(45, mc.height, true)
        mc.body.setOffset(15,0)  

        mc.setVelocityX(0)
        mc.setVelocityY(0)

        let transition = mc.bombHitbox.body.velocity.y == 0

        if (transition){
            mc.bombHitbox.setPosition(40, 40)
            mc.bombHitbox.setVelocityX(0)
            mc.bombHitbox.body.setAllowGravity(false)
            mc.bombHitbox.disableBody(true, true)
            this.stateMachine.transition("idle")
        }


    }
}