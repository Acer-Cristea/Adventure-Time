class Winner extends Phaser.Scene {
    constructor(){
        super("sceneWinner")
    }

    create() {

        this.KEYS = this.scene.get('sceneKeys').KEYS


        this.instructionText1 = this.add.bitmapText(
            width/2, height/2, 'PixelScore', 'YOU DEFENDED THE SUN!', 60
        ).setOrigin(0.5)

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

