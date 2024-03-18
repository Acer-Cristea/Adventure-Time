class Menu extends Phaser.Scene {
    constructor(){
        super("sceneMenu")
    }

    create() {


        this.instructionText1 = this.add.bitmapText(
            width/2, height/2-350, 'Pixel', 'CREDITS', 60
        ).setOrigin(0.5)

        this.instructionText2 = this.add.bitmapText(
            width/2-650, height/2-300, 'Pixel', 'ASSETS DONE BY ACER CRISTEA AND ANDREA CASTILLO', 24
        ).setOrigin(0)

        this.instructionText2 = this.add.bitmapText(
            width/2-650, height/2-300, 'Pixel', 'OBI-WAN, MASTER SHIFU, DUMBLEDORE: NATHAN ATLICE', 24
        ).setOrigin(0)

        this.instructionText2 = this.add.bitmapText(
            width/2+300, height/2+300, 'Pixel', 'PRESS UP TO GO BACK TO MENU', 24
        ).setOrigin(0)       


    }

    update() {


        const { KEYS } = this

        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.scene.start('sceneInstructions')
        }

    }
}

