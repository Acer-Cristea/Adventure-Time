class Instructions extends Phaser.Scene {
    constructor(){
        super("sceneInstructions")
    }

    create() {

        this.load.path = './assets/'
        this.load.bitmapFont('Pixel', 'font/Pixel.png', 'font/Pixel.xml')


        this.KEYS = this.scene.get('sceneKeys').KEYS
    
        //this.add.image(0,0,"title").setOrigin(0)
        //add bmo instructions here

        this.instructionText = this.add.bitmapText(centerX, centerY, 'gem_font', '', 24).setOrigin(0.5)



    }

    update() {


        const { KEYS } = this

        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.scene.start('scenePlay')
        }

    }
}
//scene.object.setScrollFactor(0)

//any object that's in a scene, will not scroll with the screen, like a UI
//can use numbers as well to create parrallex
