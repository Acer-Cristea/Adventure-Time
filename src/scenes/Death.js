class Death extends Phaser.Scene {
    constructor(){
        super("sceneDeath")
    }

    create() {

        this.select_sound = this.sound.add("select", {volume: 0.5})

        this.KEYS = this.scene.get("sceneKeys").KEYS
    
        this.add.image(0,0,"death").setOrigin(0)

        this.instructionText2 = this.add.bitmapText(
            width/2, height/2+300, "PixelScore", "PRESS UP TO GO BACK TO MENU", 24
        ).setOrigin(0.5) 

        this.death_sound = this.sound.add("death",  { volume: 0.5})
        this.death_sound.play()


    }

    update() {


        const { KEYS } = this

        if(Phaser.Input.Keyboard.JustDown(KEYS.JUMP)) {
            this.select_sound.play()
            this.scene.start("sceneMenu")
        }

    }
}
