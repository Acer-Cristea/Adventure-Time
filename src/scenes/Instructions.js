class Instructions extends Phaser.Scene {
    constructor(){
        super("sceneInstructions")
    }

    create() {

        this.add.image(0,0,"bmo").setOrigin(0)


        this.KEYS = this.scene.get('sceneKeys').KEYS

        this.instructionText1 = this.add.bitmapText(
            width/2, height/2-350, 'Pixel', 'INSTRUCTIONS', 60
        ).setOrigin(0.5)

        this.instructionText2 = this.add.bitmapText(
            width/2-650, height/2-300, 'Pixel', 'USE THE ARROW KEYS TO MOVE AND JUMP', 24
        ).setOrigin(0)

        this.instructionText3 = this.add.bitmapText(
            width/2-650, height/2-100, 'Pixel', 'USE "D" FOR A MELEE ATTACK.', 24
        ).setOrigin(0)

        this.instructionText4 = this.add.bitmapText(
            width/2-650, height/2+50, 'Pixel', 'USE "B" FOR A BOMB ATTACK. (YOU ONLY HAVE 1)', 24
        ).setOrigin(0)

        this.instructionText5 = this.add.bitmapText(
            width/2+375, height/2+280, 'Pixel', 'PRESS UP TO CONTINUE', 24
        ).setOrigin(0)

        this.instructionText6 = this.add.bitmapText(
            width/2+200, height/2-300, 'Pixel', 'WATCH OUT FOR BOUNCY BEE', 24
        ).setOrigin(0)

        this.instructionText7 = this.add.bitmapText(
            width/2+185, height/2-100, 'Pixel', 'AVOID HONEY BUNNY\'S LASERS', 24
        ).setOrigin(0)

        this.instructionText7 = this.add.bitmapText(
            width/2+125, height/2+50, 'Pixel', 'FIND THE COMBO TO BEAT SLEEPY SAM', 24
        ).setOrigin(0)

        this.instructionText8 = this.add.bitmapText(
            width/2+50, height/2+200, 'Pixel', 'WALK AS FAR AS YOU CAN BEFORE YOU START YOUR COMBO', 24
        ).setOrigin(0)

        // Add your sprite and play its animations
        this.mc1 = this.add.sprite(width/2-650, height/2-200, 'mc-sheet', 0)
        //this.mc.setScale(2); // Adjust scale as needed
        this.mc1.anims.play('mc-walk') // Play the idle animation

        this.mc2 = this.add.sprite(width / 2-650, height/2-20, 'mc-sheet', 0)
        //this.mc.setScale(2); // Adjust scale as needed
        this.mc2.anims.play('mc-attack-instructions'); // Play the idle animation

        this.mc3 = this.add.sprite(width / 2-625, height / 2+140, 'mc-sheet', 0)
        //this.mc.setScale(2); // Adjust scale as needed
        this.mc3.anims.play('mc-bomb-instructions'); // Play the idle animation

        this.bee = this.add.sprite(width / 2+350, height / 2-200, 'bee', 0)
        this.bee.anims.play('bee-walk-instructions') 
        this.bee.setScale(0.75)


        this.bunny = this.add.sprite(width / 2+375, height / 2-10, 'bunny', 0)
        this.bunny.setScale(0.5)
        this.laser = this.physics.add.sprite(this.bunny.x-150, this.bunny.y-40, "laser")
        this.laser.body.setAllowGravity(false)
        this.laser.setVelocityX(-400)
        this.frog = this.add.sprite(width / 2+375, height / 2+130, 'frog', 0)

    }

    update() {


        const { KEYS } = this

        if(this.laser.x < 300){
            this.laser.x = this.bunny.x-150
        }

        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.scene.start('scenePlay')
        }

        if (this.time.now % 2000 < 1000) {
            this.instructionText5.setVisible(true)
        } else {
            this.instructionText5.setVisible(false)
        }

    }
}

