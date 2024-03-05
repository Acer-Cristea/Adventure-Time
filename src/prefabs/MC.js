class MC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, texture, frame = 0) {
        // invoke parent class and add to display list/physics world
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // define custom properties
        this.WALK_VELOCITY = 175
        this.JUMP_VELOCITY = -350
        this.DRAG = 350

        this.body.setSize(this.width/2, this.height/2, false)
        this.body.setOffset(this.width/10, this.height/2)
        this.body.setCollideWorldBounds(true)

        
        this.body.setDragX(this.DRAG)
        
        // initialize state machine
        scene.mcFSM = new StateMachine('idle', {
            idle: new IdleState(),
            walk: new WalkState(),
            //jump: new JumpState(),
            //attack: new AttackState()
        }, [scene, this])
    }
}

// mc-specific state classes
class IdleState extends State {

    //enter(scene, mc) {
        //console.log('IdleState: enter')
        
        //mc.body.setAcceleration(0)    // allow drag to engage
    //}

    execute(scene, mc) {
        const { KEYS } = scene

        if(mc.body.velocity.x == 0) {
            //console.log("velocity0")
            mc.anims.play('mc-idle')
        }

        // jump
        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.stateMachine.transition('jump')
        }

        // left/right to move
        if(KEYS.LEFT.isDown || KEYS.RIGHT.isDown) {
            this.stateMachine.transition('walk')
            return
        }
    }
}

class WalkState extends State {
    enter(scene, mc) {
        //console.log('WalkState: enter')
        mc.anims.play('mc-walk')
    }

    execute(scene, mc) {
        const { KEYS } = scene

        // jump
        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.stateMachine.transition('jump')
        }

        // back to idle
        if( !( KEYS.LEFT.isDown || KEYS.RIGHT.isDown ) ) {
            this.stateMachine.transition('idle')
        }

        // handle left/right movement
        if(KEYS.LEFT.isDown) {
            //console.log("testing left")
            mc.body.setVelocityX(-mc.WALK_VELOCITY)
        }
        if(KEYS.RIGHT.isDown) {
            //console.log("testing right")
            mc.body.setVelocityX(mc.WALK_VELOCITY)
        }
    }
}

// class JumpState extends State {
//     enter(scene, mc) {
//         //console.log('JumpState: enter')
//         mc.anims.play('mc-jump')
//         mc.body.setVelocityY(mc.JUMP_VELOCITY)

//         // play sfx
//         scene.sound.play('jump-sfx', {
//             volume: 0.05
//         })
//     }

//     execute(scene, mc) {
//         const { KEYS } = scene

//         let grounded = mc.body.touching.down || mc.body.blocked.down
//         // end jump
//         if(grounded) {
//             this.stateMachine.transition('idle')
//         }

//         // handle movement
//         if(KEYS.LEFT.isDown) {
//             //mc.setFlip(true)
//             //mc.body.setOffset(mc.width/2, mc.height/2)
//             mc.body.setAccelerationX(-mc.ACCELERATION / 2)  // slower acceleration in air
//         }

//         if(KEYS.RIGHT.isDown) {
//             //mc.resetFlip()
//             //mc.body.setOffset(mc.width/10, mc.height/2)
//             mc.body.setAccelerationX(mc.ACCELERATION / 2)
//         }
//     }
// }

// class AttackState extends State {
//     enter(scene, mc) {
        
//     }
// }