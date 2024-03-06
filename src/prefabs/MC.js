class MC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, texture, frame = 0) {
        // invoke parent class and add to display list/physics world
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // define custom properties
        this.WALK_VELOCITY = 175
        this.JUMP_VELOCITY = -450
        //maybe you get a boost in the x direction too?
        //add acceleration for jumping maybe
        this.DRAG = 350

        this.body.setSize(this.width, this.height, false)
        this.body.setCollideWorldBounds(true)
        
        this.body.setDragX(this.DRAG)
        
        // initialize state machine
        scene.mcFSM = new StateMachine('idle', {
            idle: new IdleState(),
            walk: new WalkState(),
            jump: new JumpState(),
            //attack: new AttackState()
        }, [scene, this])
    }
}

// mc-specific state classes
class IdleState extends State {

    enter(scene, mc) {
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

        // back to idle
        if( !( KEYS.LEFT.isDown || KEYS.RIGHT.isDown ) ) {
            this.stateMachine.transition('idle')
        }

        // handle left/right movement
        if(KEYS.LEFT.isDown) {
            //console.log("testing left")
            mc.setFlip(true)
            mc.body.setVelocityX(-mc.WALK_VELOCITY)
        }
        if(KEYS.RIGHT.isDown) {
            mc.resetFlip()
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

// class AttackState extends State {
//     enter(scene, mc) {
        
//     }
// }