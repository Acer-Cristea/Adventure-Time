class MC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, texture, frame = 0) {
        // invoke parent class and add to display list/physics world
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // define custom properties
        this.WALK_VELOCITY = 400
        this.JUMP_VELOCITY = -450
        //maybe you get a boost in the x direction too?
        //add acceleration for jumping maybe
        this.DRAG = 350
        //console.log("this.width", this.width)
        //console.log("this.height", this.height)
        //adjust the body size so if fits the character, have to adjust the spritesheet, needs to be perfect
        this.body.setSize(65, this.height, true)
        //this.body.setOffset(60,0)
        this.body.setCollideWorldBounds(true)
        
        this.body.setDragX(this.DRAG)
        
        // initialize state machine
        scene.mcFSM = new StateMachine('idle', {
            idle: new IdleState(),
            walk: new WalkState(),
            jump: new JumpState(),
            attack: new AttackState()
        }, [scene, this])
    }
}

// mc-specific state classes
class IdleState extends State {

    enter(scene, mc) {

        if (mc.flipX){
            mc.body.setSize(65, mc.height, true)
            mc.body.setOffset(15,0)         
        }
        if (!mc.flipX){
            mc.body.setSize(65, mc.height, true)
            mc.body.setOffset(40,0)         
        }      

        //console.log('IdleState: enter')
    }


    execute(scene, mc) {


        const { KEYS } = scene
        const grounded = mc.body.touching.down || mc.body.blocked.down

        if(mc.body.velocity.x == 0) {
            mc.anims.play('mc-idle')
        }

        // jump
        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP) && grounded) {
            this.stateMachine.transition('jump')
        }

        // attack
        if(Phaser.Input.Keyboard.JustDown(KEYS.ATTACK) && grounded) {
            this.stateMachine.transition('attack')
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
        mc.anims.play('mc-walk')
    }

    execute(scene, mc) {
        const { KEYS } = scene
        const grounded = mc.body.touching.down || mc.body.blocked.down


        // jump
        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP) && grounded) {
            this.stateMachine.transition('jump')
        }

        // jump
        if(Phaser.Input.Keyboard.JustDown(KEYS.ATTACK) && grounded) {
            this.stateMachine.transition('attack')
        }

        // back to idle
        if( !( KEYS.LEFT.isDown || KEYS.RIGHT.isDown ) ) {
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
        mc.anims.play('mc-jump')
        mc.body.setVelocityY(mc.JUMP_VELOCITY)

        // play sfx
        const sound1 = scene.sound.add('jump-sfx1', { volume: 0.05 });
        sound1.on('complete', () => {
            // Add a delay before playing the second sound effect
            setTimeout(() => {
                // Play the second sound effect after the delay
                const sound2 = scene.sound.add('jump-sfx2', { volume: 0.05 });
                sound2.on('complete', () => {
                    // Transition to the next state when the second sound finishes
                    this.stateMachine.transition('idle');
                });
                sound2.play();
            }, 600); // Adjust the delay time (in milliseconds) as needed
        });
        sound1.play();
    }

    execute(scene, mc) {
        const { KEYS } = scene

        let grounded = mc.body.touching.down || mc.body.blocked.down
        // end jump
        if(grounded) {
            this.stateMachine.transition('idle')
        }

        // handle movement
        if(KEYS.LEFT.isDown) {
            mc.setFlip(true)
            mc.body.setVelocityX(-mc.WALK_VELOCITY)  // slower speed in air, maybe don't we'll see
        }

        if(KEYS.RIGHT.isDown) {
            mc.resetFlip()
            mc.body.setVelocityX(mc.WALK_VELOCITY)
        }
    }
}

class AttackState extends State {
    enter(scene, mc) {
        console.log("In AttackState")
        mc.anims.play('mc-attack')
        mc.body.setVelocityY(mc.JUMP_VELOCITY)
        mc.body.setVelocityX(100)


        
    }

    execute(scene, mc) {
        const { KEYS } = scene

        let grounded = mc.body.touching.down || mc.body.blocked.down
        // end jump
        if(grounded) {
            this.stateMachine.transition('idle')
        }

        // handle movement
        if(KEYS.LEFT.isDown) {
            mc.setFlip(true)
            mc.body.setVelocityX(-mc.WALK_VELOCITY)  // slower speed in air, maybe don't we'll see
        }

        if(KEYS.RIGHT.isDown) {
            mc.resetFlip()
            mc.body.setVelocityX(mc.WALK_VELOCITY)
        }
    }



}