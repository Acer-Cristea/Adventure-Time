class Death extends Phaser.Scene {
    constructor(){
        super("sceneDeath")
    }

    create() {


        this.KEYS = this.scene.get('sceneKeys').KEYS
    
        this.add.image(0,0,"death").setOrigin(0)

        this.instructionText2 = this.add.bitmapText(
            width/2, height/2+300, 'PixelScore', 'PRESS UP TO GO BACK TO MENU', 24
        ).setOrigin(0.5) 




    }

    update() {


        const { KEYS } = this

        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.scene.start('sceneMenu')
        }

    }
}
