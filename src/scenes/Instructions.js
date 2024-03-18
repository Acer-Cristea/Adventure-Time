class Instructions extends Phaser.Scene {
    constructor(){
        super("sceneInstructions")
    }

    create() {

        this.add.image(0,0,"bmo").setOrigin(0)


        this.KEYS = this.scene.get('sceneKeys').KEYS
    
        //this.add.image(0,0,"title").setOrigin(0)
        //add bmo instructions here

        this.instructionText1 = this.add.bitmapText(
            width/2, height/2-350, 'Pixel', 'INSTRUCTIONS', 60
        ).setOrigin(0.5)

        this.instructionText2 = this.add.bitmapText(
            width/2-650, height/2-300, 'Pixel', 'USE THE ARROW KEYS TO MOVE AND JUMP', 24
        ).setOrigin(0)

        this.instructionText3 = this.add.bitmapText(
            width/2-650, height/2-150, 'Pixel', 'USE "D" FOR A MELEE ATTACK.', 24
        ).setOrigin(0)

        this.instructionText4 = this.add.bitmapText(
            width/2-650, height/2, 'Pixel', 'USE "F" FOR A BOMB ATTACK. (YOU ONLY HAVE 1)', 24
        ).setOrigin(0)

        this.instructionText5 = this.add.bitmapText(
            width/2+375, height/2+280, 'Pixel', 'PRESS UP TO CONTINUE', 24
        ).setOrigin(0)

        // Add your sprite and play its animations
        this.mc1 = this.add.sprite(width/2-650, height/2-220, 'mc-sheet', 0)
        //this.mc.setScale(2); // Adjust scale as needed
        this.mc1.anims.play('mc-walk') // Play the idle animation

        this.mc2 = this.add.sprite(width / 2-650, height/2-70, 'mc-sheet', 0)
        //this.mc.setScale(2); // Adjust scale as needed
        this.mc2.anims.play('mc-attack-instructions'); // Play the idle animation

        this.mc3 = this.add.sprite(width / 2-625, height / 2+80, 'mc-sheet', 0)
        //this.mc.setScale(2); // Adjust scale as needed
        this.mc3.anims.play('mc-bomb-instructions'); // Play the idle animation

    }

    update() {


        const { KEYS } = this

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
//scene.object.setScrollFactor(0)

//any object that's in a scene, will not scroll with the screen, like a UI
//can use numbers as well to create parrallex
