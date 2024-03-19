class Credits extends Phaser.Scene {
    constructor(){
        super("sceneCredits")
    }

    create() {

        this.KEYS = this.scene.get('sceneKeys').KEYS


        this.instructionText1 = this.add.bitmapText(
            width/2, height/2-350, 'PixelScore', 'CREDITS', 60
        ).setOrigin(0.5)

        this.instructionText2 = this.add.bitmapText(
            width/2, height/2-250, 'PixelScore', 'ASSETS DONE BY ACER CRISTEA AND ANDREA CASTILLO', 24
        ).setOrigin(0.5)

        this.instructionText2 = this.add.bitmapText(
            width/2, height/2-150, 'PixelScore', 'OBI-WAN, MASTER SHIFU, DUMBLEDORE: NATHAN ATLICE', 24
        ).setOrigin(0.5)

        this.instructionText2 = this.add.bitmapText(
            width/2, height/2-50, 'PixelScore', 'BACKGROUND MUSIC: FESLIYANSTUDIOS', 24
        ).setOrigin(0.5)

        this.instructionText2 = this.add.bitmapText(
            width/2+300, height/2+300, 'PixelScore', 'PRESS UP TO GO BACK TO MENU', 24
        ).setOrigin(0.5)       


    }

    update() {


        const { KEYS } = this

        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.scene.start('sceneMenu')
        }

    }
}

